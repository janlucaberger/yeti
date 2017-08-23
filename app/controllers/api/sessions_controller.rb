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

end
