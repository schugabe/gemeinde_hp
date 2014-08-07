class Team < ActiveRecord::Base
  resourcify
  include Authority::Abilities
  
  has_many :persons
end
