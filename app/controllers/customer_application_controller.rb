class CustomerApplicationController < ActionController::Base
  layout 'customer_application'

  private

  def guest_phone_authentication_key(key)
    key &&= nil unless key.to_s.match(/^guest/)
    key ||= "guest_447" + 9.times.map { SecureRandom.rand(0..9) }.join
  end
end
