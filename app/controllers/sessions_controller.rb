class SessionsController < ApplicationController
  protect_from_forgery with: :null_session
  
  def create
    user = User.find_by(email: params[:session][:email])
    log_in(user)
    if user && user.authenticate(params[:session][:password])
      render status: :ok, json: { notice: "You've successfully signed in.", user: user }
    else
      render status: :unprocessable_entity, json: { error: "Invalid email/password combination" }
    end
  end

  def destroy
    log_out
    render status: :ok, json: { notice: "You've logged out." }
  end
end
