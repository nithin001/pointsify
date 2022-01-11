class Redemption < ApplicationRecord
  belongs_to :store

  validate :limited_functionality

  def limited_functionality
    return if store.approved
    return if store.redemptions.count < 3

    errors.add(:base, "Only 2 redemptions can be made as your store is not approved")
  end
end
