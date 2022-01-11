class Redemption < Transaction
  validate :limited_functionality

  def limited_functionality
    return if store.approved
    return if store.redemptions.count < 2

    errors.add(:base, "Only 2 redemptions can be made as your store is not approved")
  end
end
