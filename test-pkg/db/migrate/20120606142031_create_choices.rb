class CreateChoices < ActiveRecord::Migration
  def change
    create_table :choices, :id => false do |t|
      t.string :uuid, :limit => 36, :primary => true
      t.string :question_id, :null => false
      t.integer :order, :null => false
      t.string :content, :null => false

      t.string :updated_by
      t.timestamp :updated_at
    end
    add_index :choices, :question_id
  end
end
