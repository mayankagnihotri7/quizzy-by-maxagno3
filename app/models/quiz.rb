class Quiz < ApplicationRecord
  belongs_to :user
  has_many :questions
  validates :title, presence: true, length: { minimum: 10, maximum: 255}
  accepts_nested_attributes_for :questions
end
