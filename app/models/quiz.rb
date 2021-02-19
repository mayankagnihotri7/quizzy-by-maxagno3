class Quiz < ApplicationRecord
  attr_accessor :generate_slug

  belongs_to :user
  has_many :questions
  accepts_nested_attributes_for :questions
  validates :title, presence: true, length: { minimum: 10, maximum: 255}
  validates :slug, uniqueness: true
  before_validation :generate_slug

  def to_param
    slug
  end

  private
    def generate_slug
      Quiz.last ? next_id = (Quiz.last.id + 1).to_s : next_id = "1"
      if slug.blank?
        self.slug = title.downcase.strip.gsub(/\s+/, "-") + "-" + next_id
      end
    end
end
