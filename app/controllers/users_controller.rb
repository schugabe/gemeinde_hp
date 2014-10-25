class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy, :activate, :disable]
  authorize_actions_for User, actions: { activate: 'update', disable: 'update' }
  add_breadcrumb "Benutzer", :users_path
  
  def index
    @users = User.order("name asc")
  end

  def show
    
  end
  
  def new
    @user = User.new
    add_breadcrumb t('actions.new')
  end
  
  def show
    add_breadcrumb @user.name
  end
  
  def edit
    add_breadcrumb @user.name, @user
    add_breadcrumb t('actions.edit')
  end

  def create
    @user = User.new(user_params)

    if @user.save
      redirect_to @user, notice: t('actions.created')
    else
      render action: 'new' 
    end
  end
  
  def activate
    @user.confirm!
    @user.add_role :authorized
    redirect_to @user, notice: "Aktiviert"
  end
  
  def disable
    @user.remove_role :authorized
    redirect_to @user, notice: "Deaktivert"
  end

  def update
    tmp_params = user_params
    if tmp_params[:password].blank?
      tmp_params.delete("password")
      tmp_params.delete("password_confirmation")
    end
       
    if @user.update(tmp_params)
      redirect_to @user, notice: t('actions.updated')
    else
      render action: 'edit'
    end
  end

  def destroy
    @user.destroy
    redirect_to users_path, notice: "Benutzer gelöscht"
  end
  
  private
  def set_user
    @user = User.find(params[:id])
  end
  
  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end