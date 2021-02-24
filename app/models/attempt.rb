class Attempt < ApplicationRecord
  belongs_to :quiz
  belongs_to :user
  has_many :attempt_answers, dependent: :destroy
  accepts_nested_attributes_for :attempt_answers
  before_save :add_correct_and_incorrect_answers

  def add_correct_and_incorrect_answers
    self.correct_answers_count = correct_answer_count
    self.incorrect_answers_count = incorrect_answer_count
  end

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

  def self.load_report
    attempts = Attempt.where("submitted = ?", true)
    report = []
    attempts.each do |attempt|
      quiz = attempt.quiz
      user = attempt.user
      report << {
        quiz_name: quiz.title, first_name: user.first_name,
        last_name: user.last_name, email: attempt.user.email,
        correct_answers: attempt[:correct_answers_count], incorrect_answers: attempt[:incorrect_answers_count]
      }
    end
    return report
  end
end
