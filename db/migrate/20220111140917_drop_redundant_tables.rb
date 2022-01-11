class DropRedundantTables < ActiveRecord::Migration[6.1]
  def change
    drop_table :redemptions
    drop_table :bills
    drop_table :rewards
  end
end
