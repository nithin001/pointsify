class Redemption < ApplicationRecord
  acts_as_tenant :organization
end