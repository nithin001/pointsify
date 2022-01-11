class RenameOrganizationToStore < ActiveRecord::Migration[6.1]
  def change
    rename_table :organizations, :stores
    rename_column :users, :preferred_organization_id, :preferred_store_id
    rename_column :rewards, :organization_id, :store_id
    rename_column :bills, :organization_id, :store_id
    rename_table :known_organizations, :known_stores
    rename_column :known_stores, :organization_id, :store_id
    rename_column :redemptions, :organization_id, :store_id
  end
end
