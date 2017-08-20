class Api::SessionsController < ApplicationController

  def create
    debugger
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if @user
      login(@user)
      render "/api/users/show"
    else
      render json: ["ERROR logging in"], status: 422
    end
  end

  def destroy
    debugger
  end

end
