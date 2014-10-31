class Room < ActiveRecord::Base
  resourcify
  include Authority::Abilities
  
  validates :name, :description, presence: true
  validates :name, uniqueness: true
  validates_associated :events
  has_many :events
end
