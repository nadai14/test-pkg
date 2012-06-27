module ApplicationHelper

  def extract_nil(object, *attributes)
    attributes.reject{|attr| object.send(attr).nil?}
  end

end
