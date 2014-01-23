class PagesController < ApplicationController
  before_action :set_page, only: [:show, :edit, :update, :destroy]
  authorize_actions_for Page

  add_breadcrumb :index, :pages_path
  
  def index
    @pages = Page.all
  end

  def show
    if @page.nil?
      redirect_to root_path, notice: "Seite nicht gefunden" and return
    end
    add_breadcrumb @page.title
  end

  def new
    @page = Page.new
    add_breadcrumb t('actions.new')
  end

  def edit
    add_breadcrumb @page.title
    add_breadcrumb t('actions.edit')
  end

  def create
    @page = Page.new(page_params)

    if @page.save
      redirect_to @page, notice: t('actions.created')
    else
      render action: 'new' 
    end
  end

  def update
    if @page.update(page_params)
      redirect_to @page, notice: t('actions.updated')
    else
      render action: 'edit'
    end
  end

  def destroy
    @page.destroy
    redirect_to pages_url
  end

  private
  def set_page
    unless params[:permalink]
      @page = Page.find(params[:id])
    else
      @page = Page.find_by_permalink(params[:permalink].downcase)
    end
  end
  
  def page_params
    params.require(:page).permit(:title, :content, :permalink, :in_menu)
  end
end
