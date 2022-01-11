class CreateTransactions < ActiveRecord::Migration[6.1]
  def change
    create_table :transactions do |t|
      t.integer :amount, null: false
      t.integer :store_id, null: false
      t.string :type, default: 'Bill', null: false
      t.string :phone_number, null: false

      t.bigint :parent_id
      t.timestamps
    end
  end
end
