class CustomerController < CustomerApplicationController
  def index
    @transactions = current_customer
                      .transactions
                      .where(type: 'Reward')
                      .joins(:store)
                      .select(:store_id, 'sum(amount) as total_points')
                      .group(:store_id)
                      .each_with_object([]) do |(k, _), memo|
      store = Store.find(k[:store_id])
      points = k[:total_points]
      visits = Bill.where(phone_number: current_customer.phone, store: store).count
      memo << { store: store, points: points, visits: visits }
    end
    p @transactions
  end

  private

  def store
    return unless params[:org_id]
    Store.where(unique_id: params[:org_id]).first
  end
end
