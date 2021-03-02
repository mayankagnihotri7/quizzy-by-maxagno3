class AttemptsController < ApplicationController
  before_action :load_quiz
  before_action :load_user, only: [:create, :check_existing_user]
  before_action :load_attempt, only: [:update]

  def create
    if @user.nil?
      user = User.new(user_params)
      user.save
      user.attempts.create(quiz_id: @quiz.id)
      render status: :ok, json: { user: user, quiz_title: @quiz.title, quiz_id: @quiz.id, submitted: false }
    else
      check_existing_user
    end
  end

  def check_existing_user
    @attempt = @user.attempts.find_or_create_by(quiz: @quiz.id)
    if @attempt.is_submitted?
      render status: :unprocessable_entity, json: { notice: "You have already attempted this quiz." }
    else
      render status: :ok, json: { user: @user, quiz_title: @quiz.title, quiz_id: @quiz.id, submitted: @attempt.is_submitted }
    end
  end

  def update
    if @attempt.update(attempt_params)
      render json: {
        correct_answer: @attempt.correct_answer_count, incorrect_answer: @attempt.incorrect_answer_count,
        notice: "You have submitted the quiz."
      }
    else
      render status: :unprocessable_entity, json: { error: @attempt.errors.full_messages }
    end
  end

  private

    def user_params
      params.require(:attempt).permit(:first_name, :last_name, :email)
    end

    def attempt_params
      params.require(:attempt).permit(:quiz_id, :user_id, :is_submitted, attempt_answers_attributes: [:option_id, :question_id])
    end

    def load_quiz
      @quiz = Quiz.find_by(slug: params[:slug])
    end

    def load_user
      @user = User.find_by(email: params[:attempt][:email])
    end

    def load_attempt
      @attempt = Attempt.find_by(quiz_id: attempt_params[:quiz_id], user_id: attempt_params[:user_id])
    end
end
