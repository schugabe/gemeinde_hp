class CreateMagazinepages < ActiveRecord::Migration
  def change
    create_table :magazinepages do |t|
      t.references :magazine, index: true
      t.attachment :upload
      t.timestamps
    end
  end
end
