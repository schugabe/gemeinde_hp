class CalendarController < ApplicationController
  add_breadcrumb :index, :calendar_index_path
  
  def index
    @events = Event.all
    @events = @events.after(params['start']) if (params['start'])
    @events = @events.before(params['end']) if (params['end'])
  end
end
