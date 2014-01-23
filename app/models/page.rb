class Page < ActiveRecord::Base
  resourcify
  sanitizes :content
  include Authority::Abilities
  
  validates :title, :content, :permalink, presence: true
end
