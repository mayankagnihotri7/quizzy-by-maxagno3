class UsersController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    if logged_in?
      render status: :ok, json: { user: current_user }
    end
  end
end
