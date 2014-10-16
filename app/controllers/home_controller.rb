class HomeController < ApplicationController
  def index
    @events = Event.upcoming.limit(5)
    @magazine = Magazine.last
  end
end
