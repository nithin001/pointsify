class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  ALL_DEVISE_FIELDS = %i[email name phone password password_confirmation remember_me]
  LOCKED_DOWN_DEVISE_FIELDS = %i[password name password_confirmation remember_me]
  SIGN_IN_FIELDS = %i[email phone password remember_me]
  layout :layout_by_resource

  protected

  def layout_by_resource
    return "application" unless devise_controller?

    if resource_name == :customer
      return "customer_application"
    end

    "kiosk_application"
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit :sign_in, keys: SIGN_IN_FIELDS
    devise_parameter_sanitizer.permit :sign_up, keys: ALL_DEVISE_FIELDS
    devise_parameter_sanitizer.permit :account_update, keys: LOCKED_DOWN_DEVISE_FIELDS
  end
end
