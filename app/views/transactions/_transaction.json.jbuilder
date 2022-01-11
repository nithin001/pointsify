json.extract! transaction, :id, :created_at, :updated_at, :amount, :type
json.url transaction_url(transaction, format: :json)
