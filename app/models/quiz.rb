class Quiz < ApplicationRecord
  belongs_to :user
  validates :title, presence: true, length: { minimum: 10, maximum: 255}
end
