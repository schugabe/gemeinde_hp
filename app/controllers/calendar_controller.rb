class CalendarController < ApplicationController
  add_breadcrumb I18n.t('breadcrumbs.calendar.index'), :calendar_index_path
  layout :resolve_layout
  def index
    @events = Event.all
    @events = @events.after(params['start']) if (params['start'])
    @events = @events.before(params['end']) if (params['end'])
  end
  
  def upcoming
    if params[:room]
      @events = Room.find(params[:room]).events
    else
      @events = Event
    end
    @events = @events.upcoming.limit(5)
  end
  
  def upcoming_month
    
  end
  
private
  def resolve_layout
    case action_name
    when "upcoming"
      "upcoming"
    when "upcoming_month"
      "upcoming"
    else
      "application"
    end
  end
end
