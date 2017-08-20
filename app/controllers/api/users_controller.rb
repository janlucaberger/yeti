class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params.except(:team_id))
    User.transaction do
      if @user.save
        UsersTeams.create!(user_id: @user.id, team_id: user_params[:team_id] )
        render :show
      else
        debugger
        render json: @user.errors.full_messages
      end
    end

  end


  def destroy
    @user = User.find(params[:id])
    @user.delete
    render "/api/users/show"
  end

  private
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :avatar, :team_id)
  end


end
