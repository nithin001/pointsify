class CreateBills < ActiveRecord::Migration[6.1]
  def change
    create_table :bills do |t|
      t.integer :amount
      t.string :phone_number
      t.references :organization

      t.timestamps
    end
  end
end
