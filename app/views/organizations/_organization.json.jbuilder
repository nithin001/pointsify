json.extract! organization, :id, :created_at, :updated_at
json.url organization_url(id: organization.id, format: :json)
