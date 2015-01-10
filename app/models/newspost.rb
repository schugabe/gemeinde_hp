class Newspost < ActiveRecord::Base
  resourcify
  include Authority::Abilities
end
