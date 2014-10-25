class EventbatchesController < ApplicationController
  authorize_actions_for Event
  
  def new
    
  end
  
  def create
    require 'csv'    
    @created = 0
    @failed = 0
    @failed_str = Array.new
    csv = CSV.parse("title;starts_at_date;starts_at_time;ends_at_date;ends_at_time;description\r\n"+params[:batch], headers: true, row_sep: :auto, col_sep: ";")
    csv.each do |row|
      data = row.to_hash
      e = Event.new
      e.title = data["title"].strip
      e.starts_at_date = data["starts_at_date"].strip
      e.starts_at_time = data["starts_at_time"].strip
      e.ends_at_date = data["ends_at_date"].strip
      e.ends_at_time = data["ends_at_time"].strip
      e.description = data["description"].strip
      if e.save
        @created += 1
      else
        @failed += 1 
        @failed_str << row
      end
    end
  end
end
