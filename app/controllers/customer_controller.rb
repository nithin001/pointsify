class CustomerController < CustomerApplicationController
  def index
  end

  private

  def store
    return unless params[:org_id]
    Store.where(unique_id: params[:org_id]).first
  end
end
