class Bill < Transaction
  attr_accessor :total_count
  validate :limited_functionality

  def limited_functionality
    return if store.approved
    return if store.bills.count < 10

    errors.add(:base, "Only 10 bills can be added as your store is not approved")
  end

  def formatted_amount
    Money.new(amount, "INR").format(south_asian_number_formatting: true)
  end
end
