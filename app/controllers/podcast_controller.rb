class PodcastController < ApplicationController
  def index
    @podcasts = Attachment.where("upload_content_type like 'audio%'").order("created_at desc").limit(20)
    respond_to do |format|
      format.rss { render :layout => false }
    end
  end
end
