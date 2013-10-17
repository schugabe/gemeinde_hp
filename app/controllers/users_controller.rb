class UsersController < ApplicationController
  authorize_actions_for User
  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end
end
