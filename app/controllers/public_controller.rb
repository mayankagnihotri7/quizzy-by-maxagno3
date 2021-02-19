class PublicController < ApplicationController
  before_action :load_quiz

  def show
    question = @quiz.questions
    render status: :ok, json: question.to_json( only: [:id, :title, :answer], include: [:options] )
  end

  private

    def load_quiz
      @quiz = Quiz.find_by(slug: params[:slug])
    end
end
