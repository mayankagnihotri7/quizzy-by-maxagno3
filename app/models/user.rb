class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze
  validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }
  validates :first_name, presence: true, length: { maximum: 50 }
  validates :last_name, presence: true, length: { maximum: 50 }
  before_save :ensure_email_downcase
  enum status: { standard_user: 0, admin_user: 1 }

  def ensure_user_is_admin
    self.status == "admin_user"
  end

  private

   def ensure_email_downcase
    email.downcase!
   end
end
