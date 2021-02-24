class AttemptsController < ApplicationController
  before_action :load_quiz

  def create
    @user = User.find_by(email: params[:attempt][:email])
    if @user.nil?
      user = User.new(user_params)
      user.save
      user.attempts.create(quiz_id: @quiz.id)
      render status: :ok, json: { user: user, quiz_title: @quiz.title, quiz_id: @quiz.id, submitted: false }
    else
      @attempt = @user.attempts.find_by(quiz_id: @quiz.id)
      render status: :ok, json: { user: @user, quiz_title: @quiz.title, quiz_id: @quiz.id, submitted: @attempt.submitted }
    end
  end

  def index
    attempt = Attempt.load_report
    render status: :ok, json: { attempt: attempt }
  end

  def update
    attempt = Attempt.find_by(quiz_id: attempt_params[:quiz_id], user_id: attempt_params[:user_id])
    if attempt.submitted?
      render json: { correct_answer: attempt.correct_answer_count, incorrect_answer: attempt.incorrect_answer_count, notice: "You have already attempted this quiz." }
    else
      if attempt.update(attempt_params)
        render json: { correct_answer: attempt.correct_answer_count, incorrect_answer: attempt.incorrect_answer_count, notice: "You have submitted the quiz." }
      else
        render status: :unprocessable_entity, json: { error: attempt.errors.full_messages }
      end
    end
  end

  private

    def user_params
      params.require(:attempt).permit(:first_name, :last_name, :email)
    end

    def attempt_params
      params.require(:attempt).permit(:quiz_id, :user_id, :submitted, attempt_answers_attributes: [:option_id, :question_id])
    end

    def load_quiz
      @quiz = Quiz.find_by(slug: params[:slug])
    end
end
