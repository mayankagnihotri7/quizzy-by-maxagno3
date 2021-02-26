class PublicController < ApplicationController
  before_action :load_quiz

  def show
    if @quiz.slug
      redirect_to "/public/#{@quiz.slug}/attempts/new"
    else
      render status: :unprocessable_entity, json: { error: "Please check the url and try again." }
    end
  end

  def verified
    question = @quiz.questions
    render status: :ok, json: question.to_json( only: [:id, :title, :answer], include: [:options] )
  end

  def create
    question = @quiz.questions.find_by(id: params[:question_id])
    question.attempt_answers.create(attempt_id: params[:option_id])
  end

  private

    def load_quiz
      @quiz = Quiz.find_by(slug: params[:slug])
    end
end
