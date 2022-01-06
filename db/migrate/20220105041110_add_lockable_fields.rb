class AddLockableFields < ActiveRecord::Migration[6.1]
  def change
    add_column :customers, :failed_attempts, :integer, default: 0, null: false
    add_column :customers, :locked_at, :datetime
  end
end
