class Attempt < ApplicationRecord
  belongs_to :quiz
  belongs_to :user
  has_many :attempt_answers, dependent: :destroy
  accepts_nested_attributes_for :attempt_answers

  def correct_answer_count
    attempt_answers.count do |answer|
      @question = Question.find_by(id: answer.question_id)
      @option = Option.find_by(id: answer.option_id)
      @option.name == @question.correct_answer
    end
  end

  def incorrect_answer_count
    attempt_answers.count do |answer|
      @question = Question.find_by(id: answer.question_id)
      @option = Option.find_by(id: answer.option_id)
      @option.name != @question.correct_answer
    end
  end
end
