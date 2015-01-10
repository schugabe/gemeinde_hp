require 'rails_helper'

RSpec.describe "Newsposts", :type => :request do
  describe "GET /newsposts" do
    it "works! (now write some real specs)" do
      get newsposts_path
      expect(response).to have_http_status(200)
    end
  end
end
