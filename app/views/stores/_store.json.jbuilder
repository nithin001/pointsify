json.extract! store, :id, :created_at, :updated_at
json.url store_url(id: store.id, format: :json)
