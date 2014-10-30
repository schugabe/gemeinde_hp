class CalendarController < ApplicationController
  add_breadcrumb I18n.t('breadcrumbs.calendar.index'), :calendar_index_path
  layout :resolve_layout
  def index
    @events = Event.all
    @events = @events.after(params['start']) if (params['start'])
    @events = @events.before(params['end']) if (params['end'])
  end
  
  def upcoming
    @events = Event.upcoming.limit(5)
  end
  
  def upcoming_month
    @events = Event.upcoming.where("starts_at < ?", Time.now.utc.end_of_month)
    render :upcoming
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
