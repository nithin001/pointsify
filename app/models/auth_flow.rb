class AuthFlow < ActiveRecord::Base
  validate :is_verified, :is_valid_otp, :max_otp_attempts

  enum status: [:unverified, :captcha_verification, :otp_verification]

  attr_accessor :current_otp, :verified

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