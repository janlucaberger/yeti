class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if @user
      @current_team = @user.teams.first
      login(@user)
      render "/api/session/show"
    else
      render json: ["Looks like your email and password might be incorrect"], status: 422
    end
  end

  def destroy
    @user = current_user
    logout
    render json: {}
  end

  def resources
    @users = User.joins(:users_teams).where("team_id = ?", current_team.id)
    @issue_types = IssueType.all
    @status_types = StatusType.all
    @priority_types = PriorityType.all
    render "api/session/resources"
  end

end
