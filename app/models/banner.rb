class Banner < ActiveRecord::Base
  resourcify
  include Authority::Abilities
  
  has_attached_file :image, :styles => { :large => "1140x400#" }
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/
  
  include RankedModel
  ranks :row_order
end
