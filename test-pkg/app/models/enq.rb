class Enq < ActiveRecord::Base
  include Extensions::UUID

  attr_accessible :status, :updated_by

  has_many :campaigns
  has_many :enq_faces
end
