class CreateEnqs < ActiveRecord::Migration
  def change
    create_table :enqs do |t|
      t.integer :enq_id,		null: false
      t.integer :first_page_id,	null: false,	:default => 1
      t.integer :status,		null: false,	:default => 0
      t.string :title
      t.string :description
      t.string :css
      t.string :movie
      t.string :thumbnail
      t.string :update_name
      t.date :update_date

      t.timestamps
    end
	
	add_index	:enqs,	:enq_id,	unique: true
  end
end
