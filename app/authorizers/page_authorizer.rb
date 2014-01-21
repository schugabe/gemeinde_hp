class PageAuthorizer < ApplicationAuthorizer
  def self.creatable_by?(user)
    user.has_role?(:editor)
  end
  def self.updatable_by?(user)
    user.has_role?(:editor)
  end
  
  def self.readable_by?(user)
    true
  end
end