class User < ActiveRecord::Base
  rolify
  
  include Authority::UserAbilities
  include Authority::Abilities
  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable, :confirmable
  
  validates :name, presence: true
  
  def active_for_authentication?
    super && has_role?(:authorized)
  end
  
  def confirm!
    super
    add_role :authorized
  end
end
