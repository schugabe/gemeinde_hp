class Person < ActiveRecord::Base
  resourcify
  include Authority::Abilities
  
  has_attached_file :avatar, :styles => { :large => "600x600>", :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/defaults/person/:style/missing.png"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/
  validates :name, :team, presence: true
  
  belongs_to :team
  
  include RankedModel
  ranks :row_order
end
