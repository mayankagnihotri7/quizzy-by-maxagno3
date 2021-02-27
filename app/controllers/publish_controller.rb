class PublishController < ApplicationController
  before_action :authenticate_user

  def publish
    @quiz = Quiz.find_by(id: params[:id])
    @quiz.generate_slug
    @quiz.save
    render status: :ok, json: { notice: "Quiz has been published!" }
  end
end