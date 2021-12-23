json.extract! bill, :id, :created_at, :updated_at, :amount
json.set! :type, 'Bill'
json.url bill_url(bill, format: :json)
