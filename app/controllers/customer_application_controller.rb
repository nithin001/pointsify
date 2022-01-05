class CustomerApplicationController < ActionController::Base
  layout 'customer_application'
  before_action :authenticate_customer!

end
