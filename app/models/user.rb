class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze
  enum role: { standard: 0, administrator: 1 }
  has_many :quizzes
  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: VALID_EMAIL_REGEX }
  validates :first_name, presence: true, length: { maximum: 50 }
  validates :last_name, presence: true, length: { maximum: 50 }
  validates :password, length: { minimum: 6 }, presence: true
  validates :password_confirmation, presence: true, on: :create
  before_save :ensure_email_downcase
  has_secure_password

  private

   def ensure_email_downcase
    email.downcase!
   end
end
