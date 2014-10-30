class Team < ActiveRecord::Base
  resourcify
  include Authority::Abilities
  
  has_many :persons, :dependent => :destroy
end
