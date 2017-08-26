class Api::IssuesController < ApplicationController

  def index
  end

  def show
    @issue = Issue.find(params[:id])
    render "/api/issues/show"
  end

  def create
    @issue = Issue.new(issue_params)
    project_key = Project.where(id: params[:issue][:project_id])[0].key
    id = Issue.where(project_id: params[:issue][:project_id]).count + 1
    @issue.key = "#{project_key}-#{id}"

    if @issue.save
      render "/api/issues/show"
    else
      render json: @issue.errors.full_messages
    end
  end

  def update
    issue_id = params[:issue][:id]
    column = params[:issue].keys.select{ |param| param != "id" }[0].to_sym
    previous_value = Issue.where(id: issue_id )[0][column]
    new_value = params[:issue][column]
    @issue = Issue.find(issue_id)
    Issue.transaction do
      @issue.update(issue_params)
      IssueAudit.create(issue_id: params[:issue][:id], column_changed: column, from: previous_value, to: new_value, user_id: current_user.id)
      render "/api/issues/show"
    end
  end


  def add_attachment
    @attachment = Attachment.new(user_id: current_user.id, issue_id: params[:id], attachment: params[:issue][:attachment])
    if @attachment.save
      render "api/attachments/show"
    else
      render json: @attachment.errors.full_messages
    end
  end

  def delete_attachment
    @attachment = Attachment.find(params[:attachment][:attachment_id])
    if @attachment.destroy
      render "api/attachments/show"
    else
      render json: @attachment.errors.full_messages
    end
  end

  def history
    @issue_histories = IssueAudit.includes(:user).where(issue_id: params[:id])
    render "/api/issues/history"
  end

  private

  def issue_params
    params.require(:issue).permit(:project_id, :summary, :description, :issue_type_id, :status_type_id, :priority_type_id, :active, :sprint)
  end

end
