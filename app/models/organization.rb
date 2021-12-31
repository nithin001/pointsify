class Organization < ApplicationRecord
  after_commit :set_preferred_organization, on: :create
  belongs_to :owner, class_name: 'User'
  validates_presence_of :name
  validates :name, format: { with: /\A[a-zA-Z\s\d]+\z/, message: "only allows letters, numbers and spaces" }, allow_blank: true
  validates :name, length: { in: 6..20 }, allow_blank: true
  has_many :bills
  has_many :redemptions
  has_many :rewards
  before_save :set_unique_id

  def set_unique_id
    return if unique_id

    self.unique_id = SecureRandom.uuid
  end

  def set_preferred_organization
    ActsAsTenant.without_tenant do
      owner.set_preferred_organization(self)
    end
  end
end
