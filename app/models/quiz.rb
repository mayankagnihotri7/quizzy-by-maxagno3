class Quiz < ApplicationRecord
  attr_accessor :generate_slug

  belongs_to :user
  has_many :questions, dependent: :destroy
  has_many :attempts, dependent: :destroy
  accepts_nested_attributes_for :questions
  validates :title, presence: true, length: { minimum: 10, maximum: 255}
  validates :slug, uniqueness: true, allow_nil: true

  def to_param
    slug
  end

  def generate_slug
    self.slug = unique_slug
  end

  def unique_slug
    occurence = 1
    loop do
      if occurence > 1
        slug = "#{title.parameterize}-#{occurence}"
      else
        slug = "#{title.parameterize}"
      end
      break slug unless Quiz.where(slug: slug).exists?
      occurence = occurence + 1
    end
  end
end
