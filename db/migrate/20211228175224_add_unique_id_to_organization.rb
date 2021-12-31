class AddUniqueIdToOrganization < ActiveRecord::Migration[6.1]
  def change
    add_column :organizations, :unique_id, :string
  end
end
