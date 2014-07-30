class CreatePeople < ActiveRecord::Migration
  def change
    create_table :people do |t|
      t.string :name
      t.string :position
      t.text :about
      t.string :contact
      t.references :team, index: true

      t.timestamps
    end
  end
end
