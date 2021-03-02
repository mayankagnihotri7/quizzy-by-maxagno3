class PublishesController < ApplicationController
  before_action :authenticate_user
  before_action :load_quiz

  def update
    @quiz.generate_slug
    if @quiz.save
      render status: :ok, json: { notice: "Quiz has been published!" }
    else
      render status: :unprocessable_entity, json: { error: @quiz.errors.full_messages }
    end
  end

  private

    def load_quiz
      @quiz = Quiz.find_by!(id: params[:id])
    end
end