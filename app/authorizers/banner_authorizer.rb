class BannerAuthorizer < ApplicationAuthorizer
  def self.creatable_by?(user)
    user.has_role?(:admin)
  end
  def self.updatable_by?(user)
    user.has_role?(:admin)
  end
  
  def self.readable_by?(user)
    user.has_role?(:admin)
  end
    
  def self.listable_by?(user)
    user.has_role?(:admin)
  end
end