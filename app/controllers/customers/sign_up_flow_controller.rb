class Customers::SignUpFlowController < ApplicationController
  layout 'customer_application'
  include Wicked::Wizard

  steps :mobile_input, :verify_otp

  def show
    session[:flow_id] ||= SecureRandom.uuid
    if params[:reset].present?
      session[:flow_id] = SecureRandom.uuid
    end

    @auth_flow = AuthFlow.where(flow_id: session[:flow_id]).first_or_create!
    if step == :mobile_input && !@auth_flow.unverified?
      skip_step
    end

    if step == :verify_otp && !@auth_flow.unverified? && !@auth_flow.captcha_verification?
      skip_step
    end

    render_wizard
  end

  def update
    @auth_flow = AuthFlow.find_by(flow_id: session[:flow_id])

    case step
    when :mobile_input
      @auth_flow.assign_attributes(customer_params)
      @auth_flow.assign_attributes(status: AuthFlow.statuses[:captcha_verification])
      if verify_recaptcha
        @auth_flow.assign_attributes(verified: true, otp: '121212')
      end
    when :verify_otp
      @auth_flow.assign_attributes(customer_params)
      @auth_flow.assign_attributes(status: AuthFlow.statuses[:otp_verification])
    end

    render_wizard(@auth_flow)
  end

  def finish_wizard_path
    new_customer_registration_path
  end

  private
  def customer_params
    params.require(:auth_flow).permit(:phone, :current_otp)
  end
end
