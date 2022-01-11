class Transaction < ApplicationRecord
  belongs_to :store

  def descriptive_type
    return 'Bill added' if type=='Bill'
    return 'Points added' if type == 'Reward'

    'Points redeemed' if type == 'Redemption'
  end

  def formatted_amount
    amount
  end
end
