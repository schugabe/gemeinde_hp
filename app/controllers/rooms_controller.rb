class RoomsController < ApplicationController
  before_action :set_room, only: [:show, :edit, :update, :destroy]
  respond_to :html
  authorize_actions_for Room
  
  
  def index
    add_breadcrumb I18n.t('room.rooms')
    @rooms = Room.all
    respond_with(@rooms)
  end

  def show
    add_breadcrumb I18n.t('room.rooms')
    add_breadcrumb @room.name
    respond_with(@room)
  end

  def new
    @room = Room.new
    respond_with(@room)
    add_breadcrumb I18n.t('room.rooms'), :rooms_path
    add_breadcrumb I18n.t('actions.new')
  end

  def edit
    add_breadcrumb I18n.t('room.rooms'), :rooms_path
    add_breadcrumb @room.name, @room
    add_breadcrumb I18n.t('actions.edit')
  end

  def create
    @room = Room.new(room_params)
    @room.save
    respond_with(@room)
  end

  def update
    @room.update(room_params)
    respond_with(@room)
  end

  def destroy
    @room.events.each do |event|
      event.room = nil
      event.save
    end
    @room.destroy
    respond_with(@room)
  end

  private
    def set_room
      @room = Room.find(params[:id])
    end

    def room_params
      params.require(:room).permit(:name, :description, :street, :plz, :city)
    end
end
