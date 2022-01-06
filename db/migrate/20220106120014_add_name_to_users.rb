class AddNameToUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :admin, :boolean
    remove_column :users, :guest, :boolean
    remove_column :users, :timezone, :string
  end
end
