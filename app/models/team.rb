class Team < ActiveRecord::Base
  resourcify
  include Authority::Abilities
  
  has_many :persons, :dependent => :destroy
  validates :name, :description, presence: true
end
