class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers, :id => false do |t|
      t.string :uuid, :limit => 36, :primary => true
      t.string :campaign_id, :null => false
      t.string :enq_question_id, :null => false
      t.string :user_id, :null => false
      t.string :user_agent, :null => false
      t.text :answer, :null => false

      t.string :updated_by
      t.timestamp :updated_at
    end
    add_index :answers, [:campaign_id, :enq_question_id, :user_id], :unique => true
  end
end
