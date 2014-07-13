class AddEventRefToAttachments < ActiveRecord::Migration
  def change
    add_reference :attachments, :event, index: true
  end
end
