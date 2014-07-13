class HomeController < ApplicationController
  def index
    @events = Event.upcoming.limit(5)
  end
end
