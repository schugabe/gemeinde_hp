class AddPdfToMazine < ActiveRecord::Migration
  def self.up
    add_attachment :magazines, :pdf
  end

  def self.down
    remove_attachment :magazines, :pdf
  end
end
