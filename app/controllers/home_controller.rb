class HomeController < ApplicationController
  def index
    @home = Page.find_by_permalink("home")
    if @home.nil?
      @home = Page.new
      @home.title = "Willkommen"
      @home.permalink = "home"
      @home.content = "..."
      @home.save!
    end
  end
end
