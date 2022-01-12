class CreateRedemptionFlow < ActiveRecord::Migration[6.1]
  def change
    create_table :redemption_flows do |t|
      t.string :store_id
      t.string :bill_amount
      t.string :redemption_amount

      t.string :phone_number
      t.string :otp
      t.integer :status, default: 0
      t.integer :attempts, default: 0

      t.timestamps
    end
  end
end
