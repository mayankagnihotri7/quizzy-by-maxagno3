class QuizzesController < ApplicationController
  before_action :ensure_user_logged_in
  before_action :find_quiz

  def index
    quiz = Quiz.where("user_id = ?", current_user.id)
    render status: :ok, json: { quiz: quiz }
  end

  def create
    quiz = current_user.quizzes.new(quiz_params)

    if quiz.save
      render status: :ok, json: { notice: "Quiz has been created!" }
    else
      render status: :unprocessable_entity, json: { error: quiz.errors.full_messages }
    end
  end

  def show  
    render status: :ok, json: { quiz: @quiz }
  end

  def update
    if @quiz.update(quiz_params)
      render status: :ok, json: { notice: "Quiz has been updated!" }
    else
      render status: :unprocessable_entity, json: { error: @quiz.errors.full_messages }
    end
  end

  def destroy
    if @quiz.destroy
      render status: :ok, json: { notice: "Quiz has been deleted." }
    else
      render status: :unprocessable_entity, json: { error: @quiz.errors.full_messages }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:title, :user_id, :public_url)
    end

    def find_quiz
      @quiz = Quiz.find_by(id: params[:id])
    end
end
