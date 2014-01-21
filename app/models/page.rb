class Page < ActiveRecord::Base
  resourcify
  include Authority::Abilities
end
