class CreateKnownOrganizations < ActiveRecord::Migration[6.1]
  def change
    create_table :known_organizations do |t|
      t.belongs_to :user
      t.belongs_to :organization

      t.timestamps
    end
  end
end
