class AddInmenuToPages < ActiveRecord::Migration
  def change
    add_column :pages, :in_menu, :boolean
  end
end
