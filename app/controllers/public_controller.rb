class PublicController < ApplicationController
  before_action :load_quiz

  def show
    if @quiz.slug
      redirect_to "/public/#{@quiz.slug}/attempts/new"
    else
      render status: :unprocessable_entity, json: { error: "Please check the url and try again." }
    end
  end

  def update
    question = @quiz.questions
    render status: :ok, json: question.to_json( only: [:id, :title, :answer], include: [:options] )
  end

  private

    def load_quiz
      @quiz = Quiz.find_by(slug: params[:slug])
      unless @quiz
        render status: :unprocessable_entity, json: { error: "Quiz not found!" }
      end
    end
end
