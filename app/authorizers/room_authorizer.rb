class RoomAuthorizer < ApplicationAuthorizer
  def self.creatable_by?(user)
    user.has_role?(:admin) || user.has_role?(:room)
  end
  def self.updatable_by?(user)
    user.has_role?(:admin) || user.has_role?(:room)
  end
  
  def self.readable_by?(user)
    true
  end
  
  def self.listable_by?(user)
    user.has_role?(:admin) || user.has_role?(:room)
  end
end