class Attachment < ActiveRecord::Base
  has_attached_file :upload, :styles => {:large => "1000x1000>", :medium => "300x300>", :thumb => "100x100>" }
  validates_attachment_content_type :upload, :content_type => /\Aimage\/.*\Z/
  
  belongs_to :event
  sanitizes :description
  include Authority::Abilities
end
