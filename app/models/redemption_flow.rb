class RedemptionFlow < ActiveRecord::Base
  belongs_to :store
  validates_presence_of :phone_number, :store
  has_many :transactions, foreign_key: 'parent_id'
  validate :is_valid_otp, :max_otp_attempts

  enum status: [:unverified, :get_otp, :redeem_points, :only_bill]

  attr_accessor :current_otp, :verified, :flow

  def max_otp_attempts
    return unless redeem_points?
    return unless redemption_amount

    return if attempts <= 3
    errors.add(:base, 'Max attempts reached.')
  end

  def is_valid_otp
    return unless redeem_points?
    return unless redemption_amount
    return if otp == current_otp

    errors.add(:base, 'Invalid OTP')
  end
end