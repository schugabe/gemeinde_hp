class CreateRecurrings < ActiveRecord::Migration
  def change
    create_table :recurrings do |t|
      t.date :starts_at
      t.date :ends_at
      t.integer :frequency
      t.integer :unit, default: 0, null: false

      t.timestamps
    end
  end
end
