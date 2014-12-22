class EventsController < ApplicationController
  before_action :set_event, only: [:show, :edit, :update, :destroy]

  authorize_actions_for Event
  
  add_breadcrumb I18n.t('breadcrumbs.calendar.index'), :calendar_index_path
  
  def index
    @events = Event.order("starts_at desc").paginate(page: params[:page], per_page: 10)
  end

  def show
    if @event.nil?
      redirect_to root_path, notice: "Veranstaltung nicht gefunden" and return
    end
    add_breadcrumb @event.title
    
    @first_image = @event.attachments.where("upload_content_type like 'image%'").first
    @images = @event.attachments.where("upload_content_type like 'image%' and id <> ?", @first_image.id) unless @first_image.nil?
    @audio_files = @event.attachments.where("upload_content_type like 'audio%'")
    @remaining_files = @event.attachments.where("upload_content_type not like 'image%' and upload_content_type not like 'audio%'")
  end

  def new
    @event = Event.new
    @event.starts_at = DateTime.now
    @event.ends_at = DateTime.now+1.hour

    add_breadcrumb t('actions.new')
  end

  def edit
    add_breadcrumb @event.title, @event
    add_breadcrumb t('actions.edit')
  end

  def create
    @event = Event.new(event_params)
    
    if @event.save
      @recurring = Recurring.new(recurring_params)
      @recurring.starts_at = @event.starts_at.to_date
      @recurring.save
      
      @event.recurring = @recurring
      @event.save
      
      if @recurring.frequency > 0
        day_difference = @event.ends_at - @event.starts_at
        first = false
        @recurring.get_event_dates.each { |date| 
          if first == false
            first = true
            next
          end
          rec_event = @event.dup
          rec_event.starts_at = Time.zone.local(date.year, date.month, date.day, @event.starts_at.hour, @event.starts_at.min, @event.starts_at.sec)
          rec_event.ends_at = rec_event.starts_at + day_difference
          rec_event.recurring = @recurring
          rec_event.save
        }
      end
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
    redirect_to events_path
  end

  private
    def set_event
      @event = Event.find(params[:id])
    end

    def event_params
      params.require(:event).permit(:title, :description, :starts_at_date, :starts_at_time, :ends_at_date, :ends_at_time, :room_id)
    end
    
    def recurring_params
      params.require(:recurring).permit(:starts_at, :ends_at, :unit, :frequency)      
    end
end
