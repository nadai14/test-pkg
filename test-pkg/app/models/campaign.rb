class Campaign < ActiveRecord::Base
  self.primary_key = 'mid'

  attr_accessible :mid, :enq_id, :banner_title, :client_url, :closing_at, :conversion_tag, :created_by, :message, :movie, :opening_at, :platform, :point, :second_picture, :second_point, :status, :thumbnail, :updated_by

  belongs_to :enq

  def closed?
    status == 9 || (!closing_at.nil? && closing_at <= Time.now)
  end

end
