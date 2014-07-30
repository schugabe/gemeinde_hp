class AddRoworderToPeople < ActiveRecord::Migration
  def change
    add_column :people, :row_order, :integer
  end
end
