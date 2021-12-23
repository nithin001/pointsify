class Bill < ApplicationRecord
  acts_as_tenant :organization

  belongs_to :organization
  after_create :add_points

  def add_points
    Reward.create!(points: amount/100, phone_number: phone_number, organization: organization)
  end
end
