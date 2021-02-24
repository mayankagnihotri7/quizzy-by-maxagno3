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
    Quiz.last ? next_id = (Quiz.last.id).to_s : next_id = "1"
    if slug.blank?
      self.slug = title.downcase.strip.gsub(/\s+/, "-") + "-" + next_id
    end
  end
end
