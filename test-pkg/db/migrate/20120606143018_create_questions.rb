class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions, :id => false do |t|
      t.string :uuid, :limit => 36, :primary => true
      t.string :kind, :null => false
      t.string :title
      t.text :content
      t.boolean :required, :null => false, :default => 0
      t.text :answer_content
      t.text :answer_description

      t.string :updated_by
      t.timestamp :updated_at
    end
  end
end
