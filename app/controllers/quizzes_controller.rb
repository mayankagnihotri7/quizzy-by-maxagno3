class QuizzesController < ApplicationController
  before_action :authenticate

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
    quiz = Quiz.find(params[:id])
    render status: :ok, json: { quiz: quiz }
  end

  def update
    quiz = Quiz.find(params[:id])
    if quiz.update(quiz_params)
      render status: :ok, json: { notice: "Quiz has been updated!" }
    else
      render status: :unprocessable_entity, json: { error: quiz.errors.full_messages }
    end
  end

  def destroy
    quiz = Quiz.find(params[:id])
    if quiz.destroy
      render status: :ok, json: { notice: "Quiz has been deleted." }
    else
      render status: :unprocessable_entity, json: { error: quiz.errors.full_messages }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:title, :user_id)
    end
end
