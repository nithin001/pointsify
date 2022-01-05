class CreateAuthFlow < ActiveRecord::Migration[6.1]
  def change
    create_table :auth_flows do |t|
      t.string :flow_id
      t.string :phone
      t.string :otp
      t.integer :status, default: 0

      t.timestamps
    end
  end
end
