class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if @user
      @current_team = @user.teams.first
      login(@user)
      render "/api/session/show"
    else
      render json: ["ERROR logging in"], status: 422
    end
  end

  def destroy
    @user = current_user
    logout
    render "/api/session/show"
  end

end
