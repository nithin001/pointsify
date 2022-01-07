class Customers::RecoveryFlowController < ApplicationController
  include Wicked::Wizard
  steps :mobile_input, :verify_otp

  layout 'customer_application'

  def show
    session[:recovery_flow_id] ||= SecureRandom.uuid
    if params[:reset].present?
      session[:recovery_flow_id] = SecureRandom.uuid
    end

    @auth_flow = AuthFlow.where(flow_id: session[:recovery_flow_id]).first_or_create!
    if step == :mobile_input && !@auth_flow.unverified?
      skip_step
    end

    if step == :verify_otp
      if @auth_flow.unverified?
        jump_to(:mobile_input)
      end
      if @auth_flow.otp_verification?
        skip_step
      end
    end

    render_wizard
  end

  def update
    @auth_flow = AuthFlow.find_by(flow_id: session[:recovery_flow_id])

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

      unless @auth_flow.valid?
        @auth_flow.increment!(:attempts, 1)
      end
    end

    render_wizard(@auth_flow)
  end

  def finish_wizard_path
    @auth_flow = AuthFlow.find_by(flow_id: session[:recovery_flow_id])
    customer = Customer.find_by_phone(@auth_flow.phone)
    unless customer
      return customers_sign_up_flow_path(:mobile_input)
    end

    token = customer.send(:set_reset_password_token)
    @auth_flow.destroy!
    edit_customer_password_path(reset_password_token: token)
  end

  private

  def customer_params
    params.require(:auth_flow).permit(:phone, :current_otp).merge(flow: 'recover')
  end
end
