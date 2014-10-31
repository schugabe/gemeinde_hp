class CreateRooms < ActiveRecord::Migration
  def change
    create_table :rooms do |t|
      t.string :name
      t.text :description
      t.string :street
      t.integer :plz
      t.string :city

      t.timestamps
    end
  end
end
