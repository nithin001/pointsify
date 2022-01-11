class AddApprovedToStore < ActiveRecord::Migration[6.1]
  def change
    add_column :stores, :approved, :boolean, default: false
  end
end
