class TransactionsController < KioskApplicationController
  load_and_authorize_resource

  # GET /transactions or /transactions.json
  def index
    @transactions = filtered_by_number
  end

  private

  def filtered_by_number
    return all_transactions unless params[:number].present?

    all_transactions.where(phone_number: params[:number])
  end

  def all_transactions
    current_user.owned_store.transactions
  end
end
