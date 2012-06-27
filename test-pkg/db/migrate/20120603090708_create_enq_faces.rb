class CreateEnqFaces < ActiveRecord::Migration
  def change
    create_table :enq_faces, :id => false do |t|
      t.string :uuid, :limit => 36, :primary => true
      t.string :enq_id, :null => false
      t.string :face, :null => false
      t.string :first_page_id
      t.integer :wait_until
      t.string :css
      t.string :title
      t.text :description

      t.string :updated_by
      t.timestamp :updated_at
    end
    add_index :enq_faces, [:enq_id, :face], :unique => true
  end
end
