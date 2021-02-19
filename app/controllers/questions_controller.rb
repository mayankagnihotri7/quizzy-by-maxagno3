class QuestionsController < ApplicationController
  before_action :ensure_user_logged_in
  before_action :load_quiz

  def index
    question = @quiz.questions
    render status: :ok, json: question.to_json( only: [:id, :title, :answer], include: [:options] )
  end

  def create
    question = @quiz.questions.new(question_params)
    if question.save
      render status: :ok, json: { notice: "Question has been created" }
    else
      render status: :unprocessable_entity, json: { error: question.errors.full_messages }
    end
  end

  def update
    question = @quiz.questions.find_by(id: params[:id])
    
    if question.update(question_params)
      render status: :ok, json: { notice: "Question has been updated" }
    else
      render status: :unprocessable_entity, json: { error: @quiz.errors.full_messages }
    end
  end

  def show
    question = @quiz.questions.find_by(id: params[:id])
    if question
      render status: :ok, json: { question: question, options: question.options }
    else
      render status: :unprocessable_entity, json: { error: question.errors.full_messages }
    end
  end

  def destroy
    question = @quiz.questions.find_by(id: params[:id])
    if question.destroy
      render status: :ok, json: { notice: "Question deleted!" }
    else
      render status: :unprocessable_entity, json: { error: question.errors.full_messages }
    end
  end

  private

    def question_params
      params.require(:question).permit(:quiz_id, :id, :title, :answer, options_attributes: [:name, :id, :_destroy])
    end

    def load_quiz
      @quiz = Quiz.find_by!(id: params[:quiz_id])
    end
end
