class Api::ProjectsController < ApplicationController

  before_action :ensure_logged_in

  def index
    @projects = Project.all.where(team_id: current_team.id)
  end

  def create
    @project = Project.new(project.params)
    @project.team_id = current_team.id
    @project.user_id = current_user.id

    if @project.save
      render json: "/api/projects/show"
    else
      render json: @project.errors.full_messages
    end
  end

  private

  def project_params
    params.require(:project).permit(:title, :description, :key, :avatar, :type, :category, :url)
  end

end
