class EnqPage < ActiveRecord::Base
  attr_accessible :description, :enq_id, :face, :next_page_id, :page_id, :update_date, :update_name, :wait_until
  belongs_to :enq
  has_many :branches
end
