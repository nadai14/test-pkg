class Answer < ActiveRecord::Base
  attr_accessible :answer, :enq_id, :num, :update_date, :update_name
  belongs_to :enq
  belongs_to :enq_question
end
