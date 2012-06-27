class Question < ActiveRecord::Base
  include Extensions::UUID

  attr_accessible :answer_content, :answer_description, :content, :kind, :required, :title, :updated_by, :updated_at

  has_many :choices
  has_many :enq_question

  def needs_choices?
    ['radio', 'select', 'checkbox'].include? kind
  end

end
