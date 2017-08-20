class Api::TeamsController < ApplicationController

  def index
  end

  def create
  end

  def destroy
  end

  def update
  end

  def activity
  end

  def users
    @users = User.joins(:users_teams).where( users_teams: {team_id: 1} ).to_a

    render "/api/teams/users"
  end

  private
  def team_params
    params.require(:team).permit(:team_name, :description)
  end

end
