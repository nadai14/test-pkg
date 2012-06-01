class Branch < ActiveRecord::Base
  attr_accessible :answer, :enq_id, :next_page_id, :num, :update_date, :update_name
  belongs_to :enq_page
  belongs_to :enq_question
end
