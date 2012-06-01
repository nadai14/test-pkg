class CreateEnqPages < ActiveRecord::Migration
  def change
    create_table :enq_pages do |t|
      t.integer :enq_id,	null: false
      t.integer :page_id,	null: false
      t.string :face,		null: false,	:default => 'PC'
      t.string :description
      t.time :wait_until
      t.integer :next_page_id
      t.string :update_name
      t.date :update_date

      t.timestamps
    end
	
	add_index	:enq_pages,	[ :enq_id, :page_id, :face ],	unique: true
  end
end
