class Enq < ActiveRecord::Base
  attr_accessible :css, :description, :enq_id, :first_page_id, :movie, :status, :thumbnail, :title, :update_date, :update_name
  has_many :enq_pages
  has_many :enq_questions
  has_many :answers
end
