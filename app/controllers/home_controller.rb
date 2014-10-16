class HomeController < ApplicationController
  def index
    @events = Event.upcoming.limit(5)
    @magazine = Magazine.last
    @podcasts = Attachment.where("upload_content_type like 'audio%'").order("created_at desc").limit(3)
  end
end
