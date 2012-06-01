class EnqQuestion < ActiveRecord::Base
  attr_accessible :enq_id, :num, :question_id, :update_date, :update_name
  belongs_to :enq
  belongs_to :question
  has_many :branches
  has_many :answers
end
