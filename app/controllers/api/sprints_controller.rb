class Api::SprintsController < ApplicationController

  def create
    @sprint = Sprint.new(sprint_params)
    if @sprint.save!
      render "api/sprints/show"
    else
      render json: @sprint.errors.full_messages, status: 422
    end
  end

  def show
    @sprint = Sprint.find_by(params[:project_id])

    render "api/sprints/show"
  end

  def complete
    @issues = Issue.where("project_id = ? AND sprint = true", params[:id])
    Issue.transaction do
      @issues.each do |issue|
        issue.update(sprint: false, active: false, resolution: "resolved")  
      end
      render "api/sprints/completed"
    end
  end


  private
  def sprint_params
    params.require(:sprint).permit(:name, :start_date, :end_date, :active, :project_id)
  end
end
