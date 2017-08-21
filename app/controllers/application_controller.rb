class ApplicationController < ActionController::Base

  if Rails.env.production?
    protect_from_forgery with: :exception
  end

  helper_method :current_user, :current_team, :logged_in?, :ensure_authorized_user

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def current_team
    current_user.teams.first
  end

  def login(user)
    user.reset_session_token!
    session[:session_token] = user.session_token
    @current_user = user
  end

  def logout
    current_user.reset_session_token!
    @current_user = nil
    session[:session_token] = nil
  end

  def logged_in?
    !!current_user
  end

  def ensure_authorized_user

  end

  def ensure_logged_in
  end

end
