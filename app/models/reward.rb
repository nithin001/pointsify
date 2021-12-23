class Reward < ApplicationRecord
  acts_as_tenant :organization
end
