class BannersController < ApplicationController
  before_action :set_banner, only: [:show, :edit, :update, :destroy, :sort]
  respond_to :html
  authorize_actions_for Banner, :actions => {sort: :update}
  
  add_breadcrumb "Banner", :banners_path

  def index
    @banners = Banner.rank(:row_order)
    respond_with(@banners)
  end

  def show
    respond_with(@banner)
  end

  def new
    @banner = Banner.new
    respond_with(@banner)
  end

  def edit
  end

  def create
    @banner = Banner.new(banner_params)
    @banner.save
    respond_with(@banner)
  end

  def update
    @banner.update(banner_params)
    respond_with(@banner)
  end

  def destroy
    @banner.destroy
    respond_with(@banner)
  end
  
  def sort
    @banner.row_order_position = sort_params[:row_order_position]
    @banner.save
    render nothing: true
  end

  private
    def set_banner
      @banner = Banner.find(params[:id])
    end

    def banner_params
      params.require(:banner).permit(:title, :row_order, :image)
    end
    
    def sort_params
      params.require(:sort_data).permit(:row_order_position)
    end
end
