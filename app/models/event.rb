class Event < ActiveRecord::Base
  scope :before, ->(end_time) { where("ends_at < ?", Event.format_date(end_time)) }
  scope :after, ->(start_time) { where("starts_at > ?", Event.format_date(start_time)) }
  validate :check_dates
  
  validates :title, :description, :starts_at, :ends_at, presence: true
  
  include Authority::Abilities
  resourcify
  sanitizes :description
  
  def self.format_date(date_time)
    Time.at(date_time.to_i).to_formatted_s(:db)
  end
  
  def starts_at_date
    starts_at.strftime('%d.%m.%Y')
  end
  
  def starts_at_date=(date)
    self.starts_at = Event.get_date(starts_at,date)
  end
  
  def starts_at_time
    starts_at.strftime('%H:%M')
  end
  
  def starts_at_time=(time)
    self.starts_at = Event.get_time(starts_at,time)
  end
  
  def ends_at_date
    ends_at.strftime('%d.%m.%Y')
  end
  
  def ends_at_date=(date)
    self.ends_at = Event.get_date(ends_at,date)
  end
  
  def ends_at_time
    ends_at.strftime('%H:%M')
  end
  
  def ends_at_time=(time)
    self.ends_at = Event.get_time(ends_at,time)
  end
  
  def check_dates
    unless self.starts_at.nil? && self.ends_at.nil? 
       if self.starts_at > self.ends_at
         errors.add("ends_at_date", I18n.t('messages.endbeforestart'))
       end
     end
  end
  
  def self.get_date(date,new_date)
    tmp = new_date.split('.')
    if date.nil?
      date = DateTime.now
    end
    if tmp.length == 3
      DateTime.new(tmp[2].to_i,tmp[1].to_i,tmp[0].to_i,date.hour,date.min,0,date.zone)
    else
      date
    end
  end
  
  def self.get_time(date,new_time)
    tmp = new_time.split(':')
    if tmp.length == 2
      DateTime.new(date.year,date.month,date.day,tmp[0].to_i,tmp[1].to_i,0,date.zone)
    else
      date
    end
  end
end
