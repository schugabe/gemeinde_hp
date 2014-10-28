class Magazine < ActiveRecord::Base
  resourcify
  include Authority::Abilities
  has_attached_file :pdf, styles: {thumbnail: ["1000x1000>", :png]}
  validates_attachment_content_type :pdf, content_type: "application/pdf"
  
  default_scope { order("year desc,issue desc") }
end
