class Bill < Transaction
  after_create :add_points

  validate :limited_functionality

  def add_points
    Reward.create!(amount: ((amount*store.discount_percentage)/100), phone_number: phone_number, store: store, parent: self)
  end

  def limited_functionality
    return if store.approved
    return if store.bills.count < 10

    errors.add(:base, "Only 10 bills can be added as your store is not approved")
  end

  def formatted_amount
    Money.new(amount, "INR").format(south_asian_number_formatting: true)
  end
end
