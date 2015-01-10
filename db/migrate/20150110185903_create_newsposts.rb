class CreateNewsposts < ActiveRecord::Migration
  def change
    create_table :newsposts do |t|
      t.string :title
      t.text :body

      t.timestamps null: false
    end
  end
end
