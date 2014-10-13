class Magazine < ActiveRecord::Base
  has_attached_file :pdf, :styles => { :thumbnail => "1000x1000#"}
  validates_attachment :pdf, content_type: { content_type: "application/pdf" }
end
