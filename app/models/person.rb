class Person < ActiveRecord::Base
  has_attached_file :avatar, :styles => { :large => "600x600>", :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/
  
  belongs_to :team
  
  include RankedModel
  ranks :row_order
end
