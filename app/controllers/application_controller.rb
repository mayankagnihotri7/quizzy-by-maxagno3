class ApplicationController < ActionController::Base
  def log_in(user)
    session[:user_id] = user.id
  end

  def current_user
    if session[:user_id]
      @_current_user ||= User.find_by(id: session[:user_id])
    end
  end

  def ensure_user_logged_in
    !current_user.nil?
  end

  def log_out
    session.delete(:user_id)
    @_current_user = nil
  end

  def authenticate
    unless ensure_user_logged_in
      render status: :unprocessable_entity, json: { error: "Please login to continue." }
    else
      current_user
    end
  end
end
