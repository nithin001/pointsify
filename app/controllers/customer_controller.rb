class CustomerController < CustomerApplicationController
  def index
    p current_or_guest_customer
    @organization = org
  end

  private

  def org
    return unless params[:org_id]
    Organization.where(unique_id: params[:org_id]).first
  end
end
