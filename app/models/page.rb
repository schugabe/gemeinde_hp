class Page < ActiveRecord::Base
  resourcify
  include Authority::Abilities
  
  validates :title, :content, :permalink, presence: true
  
  before_save do |page|
      page.permalink.downcase!
  end
end
