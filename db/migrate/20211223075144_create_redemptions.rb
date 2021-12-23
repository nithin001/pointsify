class CreateRedemptions < ActiveRecord::Migration[6.1]
  def change
    create_table :redemptions do |t|
      t.integer :points
      t.string :phone_number
      t.references :organization

      t.timestamps
    end
  end
end
