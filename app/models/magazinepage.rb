class Magazinepage < ActiveRecord::Base
  has_attached_file :upload, :styles => { :large => "1000x1000>"}
  validates_attachment_content_type :upload, :content_type => /\Aimage\/.*\Z/
    
  belongs_to :magazine
end
