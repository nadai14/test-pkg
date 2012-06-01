class Choice < ActiveRecord::Base
  attr_accessible :choice_id, :content, :question_id, :update_date, :update_name
  belongs_to :question
end
