class CreateEnqQuestions < ActiveRecord::Migration
  def change
    create_table :enq_questions, :id => false do |t|
      t.string :uuid, :limit => 36, :primary => true
      t.string :enq_page_id, :null => false
      t.integer :num, :null => false
      t.string :seq, :null => false
      t.string :question_id, :null => false

      t.string :updated_by
      t.timestamp :updated_at
    end
    add_index :enq_questions, [:enq_page_id, :num], :unique => true
  end
end
