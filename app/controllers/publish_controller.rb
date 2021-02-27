class PublishController < ApplicationController
  before_action :authenticate_user

  def publish
    @quiz = Quiz.find_by(id: params[:id])
    if @quiz
      @quiz.generate_slug
      @quiz.save
      render status: :ok, json: { notice: "Quiz has been published!" }
    else
      render status: :unprocessable_entity, json: { error: @quiz.errors.full_messages }
    end
  end
end