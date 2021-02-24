class CreateAttemptAnswers < ActiveRecord::Migration[6.1]
  def change
    create_table :attempt_answers do |t|
      t.integer :attempt_id
      t.integer :option_id
      t.references :question, null: false, foreign_key: true

      t.timestamps
    end
  end
end
