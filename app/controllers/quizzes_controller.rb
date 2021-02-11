class QuizzesController < ApplicationController
  def create
    if logged_in?
      params[:quiz][:user_id] = current_user.id
      quiz = Quiz.new(quiz_params)

      if quiz.save
        render status: :ok, json: { notice: "Quiz has been created!" }
      else
        render status: :unprocessable_entity, json: { error: quiz.errors.full_messages }
      end
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:title, :user_id)
    end
end
