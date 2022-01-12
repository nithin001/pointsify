json.extract! redemption_flow, :id, :created_at, :updated_at, :redemption_amount, :bill_amount, :phone_number, :status
json.transactions do
  json.array! redemption_flow.transactions, partial: "transactions/transaction", as: :transaction
end
json.url redemption_flow_url(redemption_flow, format: :json)
