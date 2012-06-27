class Branch < ActiveRecord::Base
  include Extensions::UUID

  attr_accessible :answer, :enq_question_id, :next_page_id, :wait_until, :updated_by, :updated_at

  belongs_to :enq_question
  has_one :enq_page
end
