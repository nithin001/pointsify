class Transaction < ApplicationRecord
  belongs_to :store

  scope :between_dates, ->(from_date, to_date) { between(from_date.in_time_zone.beginning_of_day, to_date.in_time_zone.end_of_day) }
  scope :between, ->(from_time, to_time) { where('created_at BETWEEN ? AND ?', from_time, to_time) }


  def descriptive_type
    return 'Bill added' if type=='Bill'
    return 'Points added' if type == 'Reward'

    'Points redeemed' if type == 'Redemption'
  end

  def formatted_amount
    amount
  end
end
