class EnqFace < ActiveRecord::Base
  include Extensions::UUID

  attr_accessible :enq_id, :face, :first_page_id, :wait_until, :css, :title, :description, :updated_by, :updated_at

  belongs_to :enq
  has_many :enq_pages
  has_one :enq_page, :foreign_key => 'first_page_id'
end
