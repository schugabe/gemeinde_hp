class RolesController < ApplicationController
  before_action :set_role, only: [ :destroy ]
  authorize_actions_for Role
  add_breadcrumb "Rollen", :roles_path
  
  def index
    @users = User.all
  end

  def new
    @role = Role.new
    add_breadcrumb t('actions.new')
  end

  def create
    user = User.find role_params[:tmpuser]
    if user && role_params[:name] && !role_params[:name].blank?
      user.add_role role_params[:name]
      if role_params[:userprofile] == '1'
        redirect_to user, notice: t('actions.created')
      else
        redirect_to roles_path, notice: t('actions.created')
      end
    else
      if role_params[:userprofile] == '1'
        redirect_to user, notice: "Bitte eine Rolle auswählen"
      else
        @role = Role.new
        render action: 'new'
      end 
    end
  end

  def destroy
    user = User.find params[:user]
    user.remove_role @role.name
    if params[:userprofile] == '1'
      redirect_to user
    else
      redirect_to roles_path
    end
  end
  
private
  def set_role
      @role = Role.find(params[:id])
  end
  
  def role_params
    params.require(:role).permit(:name, :tmpuser, :userprofile)
  end
end
