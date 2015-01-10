class NewspostsController < ApplicationController
  before_action :set_newspost, only: [:show, :edit, :update, :destroy]
  authorize_actions_for Newspost
  respond_to :html
  add_breadcrumb I18n.t('newspost.newspost'), :newsposts_path
  def index
    @newsposts = Newspost.order("created_at desc")
    respond_to do |format|
      format.rss { 
        @newsposts = @newsposts.limit(10)
        render :layout => false 
      }
      format.html {
        @newsposts = @newsposts.paginate(page: params[:page], per_page: 10)
      }
    end
  end

  def show
    respond_with(@newspost)
  end

  def new
    @newspost = Newspost.new
    respond_with(@newspost)
  end

  def edit
  end

  def create
    @newspost = Newspost.new(newspost_params)
    @newspost.save
    respond_with(@newspost)
  end

  def update
    @newspost.update(newspost_params)
    respond_with(@newspost)
  end

  def destroy
    @newspost.destroy
    respond_with(@newspost)
  end

  private
    def set_newspost
      @newspost = Newspost.find(params[:id])
    end

    def newspost_params
      params.require(:newspost).permit(:title, :body)
    end
end
