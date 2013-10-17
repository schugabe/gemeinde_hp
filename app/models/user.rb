class User < ActiveRecord::Base
  rolify
  
  include Authority::UserAbilities
  include Authority::Abilities
  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable, :confirmable
  
  def confirm!
    super
    @user.add_role :authorized
  end
end
