class AuthFlow < ActiveRecord::Base
  validate :mobile_number, :is_verified, :is_valid_otp, :max_otp_attempts, :customer_account

  enum status: [:unverified, :captcha_verification, :otp_verification]

  attr_accessor :current_otp, :verified, :flow

  def customer_account
    return unless captcha_verification?
    return unless phone.present?
    return validates_absence_of_customer if flow == 'sign_up'

    validate_presence_of_customer
  end

  def mobile_number
    return if unverified?
    return if phone.present?

    errors.add(:phone, 'is required.')
  end

  def validate_presence_of_customer
    return if customer

    errors.add(:base, 'Account not present. Please use sign up to create your account.')
  end

  def validates_absence_of_customer
    return unless customer

    errors.add(:base, 'Account already present. Please use forgot password to reset your account.')
  end

  def customer
    Customer.find_by_phone(phone)
  end

  def max_otp_attempts
    return unless otp_verification?

    return if attempts <= 3
    errors.add(:base, 'Max attempts reached.')
  end

  def is_valid_otp
    return unless otp_verification?
    return if otp == current_otp

    errors.add(:base, 'Invalid OTP')
  end

  def is_verified
    return unless phone.present?
    return unless captcha_verification?
    return if verified

    errors.add(:base, 'Invalid Captcha')
  end
end