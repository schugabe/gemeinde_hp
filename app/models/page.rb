class Page < ActiveRecord::Base
  resourcify
  sanitizes :content
  include Authority::Abilities
end
