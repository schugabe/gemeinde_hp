class HomeController < ApplicationController
  def index
    @top_event = Event.upcoming.first
    @week = Event.upcoming.this_week.where("id <> (?)",@top_event)
    @magazine = Magazine.first
    @podcasts = Attachment.where("upload_content_type like 'audio%'").order("created_at desc").limit(3)
  end
end
