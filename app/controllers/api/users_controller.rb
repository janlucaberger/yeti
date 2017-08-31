class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params.except(:team_id))
    User.transaction do
      if @user.save
        UsersTeams.create!(user_id: @user.id, team_id: user_params[:team_id] )
        login(@user)
        @current_team = @user.teams.first
        render "/api/session/show"
      else

        render json: @user.errors.full_messages
      end
    end
  end

  def index
    if params[:query].blank?
      @users = User.joins(:users_teams).where("team_id = ?", current_team.id)
    else
      @user = User.find_by(email: params[:query])
      render "/api/users/show"
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.delete
    render "/api/users/show"
  end

  def assigned_issues
    @issues = Issues.where("assigned_user_id = ?", current_user.id)
    render "/api/users/assigned_issues"
  end

  private
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :avatar, :team_id)
  end


end
