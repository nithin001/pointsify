class RemovePreferredStoreIdFromUser < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :preferred_store_id, :integer
  end
end
