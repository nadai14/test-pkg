json.(@campaign, :mid, :point, :platform, :enq_id)
json.extract!(@campaign, *extract_nil(@campaign, :thumbnail, :conversion_tag, :second_picture, :second_point, :client_url))
json.message (@campaign.message.nil? ? defaultMessage : @campaign.message)
json.movies @movies

# face
@campaign.enq.enq_faces.first.tap do |face|
  json.extract!(face, *extract_nil(face, :first_page_id, :wait_until))
  json.title (face.title.nil? ? defaultTitle(face) : face.title)
  json.description (face.description.nil? ? defaultDescription(face) : face.description)
  json.css (face.css.nil? ? defaultCss(face) : face.css)
end
