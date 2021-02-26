class QuestionsController < ApplicationController
  before_action :authenticate_user
  before_action :load_quiz
  before_action :find_quiz, only: [:update, :show, :destroy]

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
    if @question.update(question_params)
      render status: :ok, json: { notice: "Question has been updated" }
    elsif !@question
      render status: :not_found, json: { error: "Question not found." }
    else
      render status: :unprocessable_entity, json: { error: @quiz.errors.full_messages }
    end
  end

  def show
    if @question
      render status: :ok, json: { question: @question, options: @question.options }
    else
      render status: :unprocessable_entity, json: { error: @question.errors.full_messages }
    end
  end

  def destroy
    if @question.destroy
      render status: :ok, json: { notice: "Question deleted!" }
    else
      render status: :unprocessable_entity, json: { error: @question.errors.full_messages }
    end
  end

  private

    def question_params
      params.require(:question).permit(:quiz_id, :id, :title, :answer, options_attributes: [:name, :id, :_destroy])
    end

    def load_quiz
      @quiz = Quiz.find_by!(id: params[:quiz_id])
    end

    def find_quiz
      @question = @quiz.questions.find_by(id: params[:id])
    end
end
