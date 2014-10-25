class PersonAuthorizer < ApplicationAuthorizer
  def self.creatable_by?(user)
    user.has_role?(:admin) || user.has_role?(:team)
  end
  def self.updatable_by?(user)
    user.has_role?(:admin) || user.has_role?(:team)
  end
  
  def self.readable_by?(user)
    user.has_role?(:admin) || user.has_role?(:team)
  end
    
  def self.listable_by?(user)
    user.has_role?(:admin) || user.has_role?(:team)
  end
end