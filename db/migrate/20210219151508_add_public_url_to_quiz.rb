class AddPublicUrlToQuiz < ActiveRecord::Migration[6.1]
  def change
    add_column :quizzes, :public_url, :boolean, default: false
  end
end
