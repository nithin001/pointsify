class AddAttemptsToAuthFlow < ActiveRecord::Migration[6.1]
  def change
    add_column :auth_flows, :attempts, :integer, default: 0
  end
end
