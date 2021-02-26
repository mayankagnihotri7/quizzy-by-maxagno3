class Question < ApplicationRecord
  belongs_to :quiz
  validates :title, presence: true
  validates :answer, presence: true
  has_many :options, dependent: :destroy
  has_many :attempt_answers, dependent: :destroy
  accepts_nested_attributes_for :options, allow_destroy: true
  validates_length_of :options, minimum: 2, maximum: 4

  def correct_answer
    answer = options.select do |option|
      option[:name]
    end.first.name
  end
end
