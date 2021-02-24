class UsersController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    if ensure_user_logged_in
      render status: :ok, json: { user: current_user }
    end
  end

  private

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email)
    end
end
