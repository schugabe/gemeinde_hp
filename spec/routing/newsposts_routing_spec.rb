require "rails_helper"

RSpec.describe NewspostsController, :type => :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/newsposts").to route_to("newsposts#index")
    end

    it "routes to #new" do
      expect(:get => "/newsposts/new").to route_to("newsposts#new")
    end

    it "routes to #show" do
      expect(:get => "/newsposts/1").to route_to("newsposts#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/newsposts/1/edit").to route_to("newsposts#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/newsposts").to route_to("newsposts#create")
    end

    it "routes to #update" do
      expect(:put => "/newsposts/1").to route_to("newsposts#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/newsposts/1").to route_to("newsposts#destroy", :id => "1")
    end

  end
end
