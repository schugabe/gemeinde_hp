class Role < ActiveRecord::Base
  ROLES = [:admin, :staff, :page, :event, :magazine, :team]
  
  has_and_belongs_to_many :users, :join_table => :users_roles
  belongs_to :resource, :polymorphic => true
  include Authority::Abilities
  scopify

  def self.all_roles
    tmp = ROLES.sort
    tmp.unshift("").map { |role| 
      [ role, role] 
    }
  end

  def tmpuser
    
  end
end
