class Choice < ActiveRecord::Base
  include Extensions::UUID
  attr_accessible :content, :question_id, :order, :updated_by, :updated_at

  belongs_to :question
end
