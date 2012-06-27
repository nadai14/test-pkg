class CreateEnqs < ActiveRecord::Migration
  def change
    create_table :enqs, :id => false do |t|
      t.string :uuid, :limit => 36, :primary => true
      t.integer :status, :null => false, :default => 0

      t.string :updated_by
      t.timestamp :updated_at
    end
  end
end
