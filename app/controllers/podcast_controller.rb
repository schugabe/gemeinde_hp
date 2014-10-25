class PodcastController < ApplicationController
  def index
    @podcasts = Attachment.where("upload_content_type like 'audio%'").order("created_at desc")
    respond_to do |format|
      format.rss { 
        @podcasts = @podcasts.limit(20)
        render :layout => false 
      }
      format.html {
        @podcasts = @podcasts.paginate(page: params[:page], per_page: 20)
      }
    end
  end
end
