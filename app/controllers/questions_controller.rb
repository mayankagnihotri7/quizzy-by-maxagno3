class QuestionsController < ApplicationController
  def create
    quiz = Quiz.find_by!(id: params[:quiz_id])
    question = quiz.questions.new(question_params)
    if question.save
      render status: :ok, json: { notice: "Question has been created" }
    else
      render status: :unprocessable_entity, json: { error: question.errors.full_messages }
    end
  end

  private

    def question_params
      params.require(:question).permit(:quiz_id, :title, :answer, options_attributes: [:name])
    end
end
