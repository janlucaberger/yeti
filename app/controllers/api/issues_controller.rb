class Api::IssuesController < ApplicationController

  def index
    if params[:resolved]
      @issues = Issue.joins(:project).where("team_id = ? AND issues.active = true", current_team.id)
    elsif params[:all]
      @issues = Issue.joins(:project).where("team_id = ?", current_team.id)
    else
      @issues = Issue.joins(:project).where("team_id = ? AND issues.resolution = 'unresolved' AND issues.active = true ", current_team.id)
    end
    render "/api/issues/index"
  end

  def archive
    @issues = Issue.joins(:project).where("team_id = ? ", current_team.id)
    render "/api/issues/index"
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
    debugger
    @issue.status_type_id = StatusType.where(status_type: "Todo").to_a[0].id

    if @issue.save
      render "/api/issues/show"
    else
      render json: @issue.errors.full_messages, status: 422
    end
  end

  def update
    issue_id = params[:issue][:id]
    column = params[:issue].keys.select{ |param| param != "id" }[0].to_sym

    previous_value = Issue.where(id: issue_id )[0][column]
    new_value = params[:issue][column]

    if column == :sprint
      previous_value = previous_value == "true" ? true : false
      new_value = new_value == "true" ? true : false
    end

    @issue = Issue.find(issue_id)
    doneStatus = StatusType.where(status_type: "Done").to_a[0].id

    if params[:issue][:status_type_id].to_i == doneStatus
      @issue.update(resolution: "resolved")
    else
      @issue.update(resolution: "unresolved")
    end

    Issue.transaction do
      @issue.update(issue_params)
      @issueAudit = IssueAudit.create(issue_id: params[:issue][:id], column_changed: column, from: previous_value, to: new_value, user_id: current_user.id)
      render "/api/issues/update"
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

  def add_vote
    @issue = Issue.find(params[:id])
    @issue_vote = Vote.new(user_id: current_user.id, issue_id: @issue.id)
    if @issue_vote.save
      render "/api/issues/vote.json.jbuilder"
    else
      render json: @issue_vote.errors.full_messages
    end
  end

  def add_watcher
    @issue = Issue.find(params[:id])
    @issue_watcher = Watcher.new(user_id: current_user.id, issue_id: @issue.id)
    if @issue_watcher.save
      render "/api/issues/watcher.json.jbuilder"
    else
      render json: @issue_watcher.errors.full_messages, status: 422
    end
  end

  def delete_watcher
    @issue = Issue.find(params[:id])
    @issue_watcher = Watcher.find_by(user_id: current_user.id, issue_id: @issue.id)
    if @issue_watcher.delete
      render "/api/issues/watcher.json.jbuilder"
    else
      render json: @issue_watcher.errors.full_messages, status: 422
    end
  end

  private

  def issue_params
    params.require(:issue).permit(:project_id, :summary, :description, :issue_type_id, :status_type_id, :assigned_user_id, :priority_type_id, :active, :sprint)
  end

end
