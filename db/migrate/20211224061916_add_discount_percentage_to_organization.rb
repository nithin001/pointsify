class AddDiscountPercentageToOrganization < ActiveRecord::Migration[6.1]
  def change
    add_column :organizations, :discount_percentage, :float, default: 1
  end
end
