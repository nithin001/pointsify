class AddPreferredOrganizationToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :preferred_organization_id, :integer
  end
end
