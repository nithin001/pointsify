class AddRecoverableFieldsToCustomers < ActiveRecord::Migration[6.1]
  def change
    add_column :customers, :reset_password_token, :string
    add_column :customers, :reset_password_sent_at, :datetime
  end
end
