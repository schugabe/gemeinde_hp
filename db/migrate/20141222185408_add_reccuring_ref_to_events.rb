class AddReccuringRefToEvents < ActiveRecord::Migration
  def change
    add_reference :events, :recurring, index: true
  end
end
