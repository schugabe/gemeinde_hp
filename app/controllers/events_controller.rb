class EventsController < ApplicationController
  before_action :set_event, only: [:show, :edit, :update, :destroy]

  authorize_actions_for Event
  
  add_breadcrumb :index, :calendar_index_path
  
  def index
    @events = Event.order("starts_at desc")
  end

  def show
    if @event.nil?
      redirect_to root_path, notice: "Veranstaltung nicht gefunden" and return
    end
    add_breadcrumb @event.title
    
    @first_image = @event.attachments.where("upload_content_type like 'image%'").first
    @images = @event.attachments.where("upload_content_type like 'image%' and id <> ?", @first_image.id) unless @first_image.nil?
    @remaining_files = @event.attachments.where("upload_content_type not like 'image%'")
  end

  def new
    @event = Event.new
    @event.starts_at = DateTime.now
    @event.ends_at = DateTime.now+1.hour

    add_breadcrumb t('actions.new')
  end

  def edit
    add_breadcrumb @event.title
    add_breadcrumb t('actions.edit')
  end

  def create
    @event = Event.new(event_params)
    if @event.save
        redirect_to @event, notice: t('actions.created')
    else
      render action: 'new'
    end
  end

  def update
    if @event.update(event_params)
        redirect_to @event, notice: t('actions.updated')
    else
      render action: 'edit'
    end
  end

  def destroy
    @event.destroy
    redirect_to events_url
  end

  private
    def set_event
      @event = Event.find(params[:id])
    end

    def event_params
      params.require(:event).permit(:title, :description, :starts_at_date, :starts_at_time, :ends_at_date, :ends_at_time)
    end
end
