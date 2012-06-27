class CreateBranches < ActiveRecord::Migration
  def change
    create_table :branches, :id => false do |t|
      t.string :uuid, :limit => 36, :primary => true
      t.string :enq_question_id, :null => false
      t.string :answer, :null => false
      t.string :next_page_id, :null => false
      t.integer :wait_until

      t.string :updated_by
      t.timestamp :updated_at
    end
    add_index :branches, [:enq_question_id, :answer], :unique => true
  end
end
