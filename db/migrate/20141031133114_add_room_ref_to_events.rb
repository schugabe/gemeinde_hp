class AddRoomRefToEvents < ActiveRecord::Migration
  def change
    add_reference :events, :room, index: true
  end
end
