class HomeController < ApplicationController
  def index
    @top_events = Event.upcoming.first(3)
    @week = Event.upcoming.this_week.where("id not in (?)",@top_events)
    @magazine = Magazine.first
    @podcasts = Attachment.where("upload_content_type like 'audio%'").order("created_at desc").limit(3)
  end
end
