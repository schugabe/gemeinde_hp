class Recurring < ActiveRecord::Base
  enum unit: [:day, :week, :month ]
  
  has_many :events
  
  def get_event_dates
    if unit == "day"
      r = Recurrence.new(every: :day, interval: frequency, starts: starts_at, until: ends_at)
    elsif unit == "week"
      r = Recurrence.new(every: :week, on: starts_at.wday, interval: frequency, starts: starts_at, until: ends_at)
    else
      r = Recurrence.new(every: :month, on: starts_at.mday, interval: frequency, starts: starts_at, until: ends_at)
    end
    r.events
  end
end
