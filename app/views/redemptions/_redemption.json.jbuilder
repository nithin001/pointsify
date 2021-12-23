json.extract! redemption, :id, :created_at, :updated_at, :points
json.set! :type, 'Redemption'
json.url redemption_url(redemption, format: :json)
