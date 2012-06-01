class CreateBranches < ActiveRecord::Migration
  def change
    create_table :branches do |t|
      t.integer :enq_id,		null: false
      t.integer :num,			null: false
      t.string :answer,			null: false
      t.integer :next_page_id,	null: false
      t.string :update_name
      t.date :update_date

      t.timestamps
    end
	
	add_index	:branches,	[ :enq_id, :num, :answer ],	unique: true
	add_index	:branches,	:next_page_id
  end
end
