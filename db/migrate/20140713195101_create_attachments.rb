class CreateAttachments < ActiveRecord::Migration
  def change
    create_table :attachments do |t|
      t.string :title
      t.text :description
      t.datetime :starts_at
      t.datetime :ends_at

      t.timestamps
    end
  end
end
