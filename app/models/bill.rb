class Bill < ApplicationRecord
  acts_as_tenant :organization
end
