class CreateRewards < ActiveRecord::Migration[6.1]
  def change
    create_table :rewards do |t|
      t.integer :points
      t.string :phone_number
      t.references :organization

      t.timestamps
    end
  end
end
