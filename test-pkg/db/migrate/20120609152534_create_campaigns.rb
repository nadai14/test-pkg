class CreateCampaigns < ActiveRecord::Migration
  def change
    create_table :campaigns, :id => false do |t|
      t.string :mid, :limit => 36, :primary => true
      t.string :enq_id
      t.integer :status, :null => false, :default => 0
      t.string :platform, :null => false
      t.integer :point, :null => false
      t.timestamp :opening_at
      t.timestamp :closing_at
      t.string :movie
      t.string :thumbnail
      t.text :message
      t.text :conversion_tag
      t.string :second_picture
      t.string :banner_title
      t.integer :second_point
      t.string :client_url
      t.string :created_by
      t.string :updated_by
    end
  end
end
