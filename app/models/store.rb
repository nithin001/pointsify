class Store < ApplicationRecord
  belongs_to :owner, class_name: 'User'
  validates_presence_of :name, :contact_number
  validates :name, length: { in: 6..30 }, allow_blank: true
  has_many :transactions, -> { order(created_at: :desc) }
  before_save :set_unique_id

  validates_uniqueness_of :owner_id, message: "Only one store per user"

  def redemptions
    transactions.where(type: 'Redemption')
  end

  def bills
    transactions.where(type: 'Bill')
  end

  def set_unique_id
    return if unique_id

    self.unique_id = SecureRandom.uuid
  end
end
