class CreateMagazines < ActiveRecord::Migration
  def change
    create_table :magazines do |t|
      t.integer :issue
      t.integer :year
      t.string :title

      t.timestamps
    end
  end
end
