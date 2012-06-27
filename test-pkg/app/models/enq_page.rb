class EnqPage < ActiveRecord::Base
  include Extensions::UUID

  attr_accessible :description, :enq_face_id, :next_page_id, :wait_until, :updated_by, :updated_at

  belongs_to :enq_face
  belongs_to :enq_page
  has_one :enq_page, :foreign_key => 'next_page_id'
  has_many :enq_questions
end
