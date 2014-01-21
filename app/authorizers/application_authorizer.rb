# Other authorizers should subclass this one
class ApplicationAuthorizer < Authority::Authorizer
  def self.default(adjective, user)
    user.has_role?(:admin)
  end
  
  def self.updatable_by?(user)
    user.has_role?(:admin) || user.has_role?(:editor, resource)
  end
  
  def self.readable_by?(user)
    user.has_role?(:admin) || user.has_role?(:authorized)
  end
  
  def updatable_by?(user)
    user.has_role?(:admin) || user.has_role?(:editor, resource)
  end
  
  def readable_by?(user)
    user.has_role?(:admin) || user.has_role?(:reader, resource)
  end
end
