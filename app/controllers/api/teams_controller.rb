class Api::TeamsController < ApplicationController

  def index
    if params[:query].nil?
      @teams = Team.all
      render "/api/teams/index"
    elsif params[:query].include?(:similar)
      @teams = Team.by_name(params[:query][:similar]).to_a
      render "/api/teams/index"
    elsif params[:query].include?(:exact)
      @team = Team.find_by(team_name: params[:query][:exact])
      render "/api/teams/show"
    end
  end

  def create

    @team = Team.new(team_params)
    if @team.save
      render :show
    else
      render json: @team.errors.full_messages, status: 422
    end
  end

  def destroy
    @team = Team.find(params[:id])
    @team.delete
    render :show
  end

  def update
    @team = Team.find(params[:id])
    if @team.update_attributes description: params[:team][:description]
      render :show
    else
      render json: @team.errors.full_messages, status: 422
    end
  end

  def show
    @team = Team.find(params[:id])
  end

  def activity
    # TODO: Once history table exists
  end

  def users
    @users = User.joins(:users_teams).where( users_teams: {team_id: current_team.id} ).to_a
    render "/api/teams/users"
  end

  private
  def team_params
    params.require(:team).permit(:team_name, :description, :avatar)
  end

end
