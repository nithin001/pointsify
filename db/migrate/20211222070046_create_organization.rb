class CreateOrganization < ActiveRecord::Migration[6.0]
  def change
    create_table :organizations do |t|
      t.string :name
      t.integer :owner_id
    end
    add_foreign_key :organizations, :users, column: :owner_id
  end
end
