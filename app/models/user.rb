class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  belongs_to :preferred_organization, class_name: 'Organization', optional: true
  has_many :owned_organizations, class_name: 'Organization', foreign_key: 'owner_id'
  validates_presence_of :timezone
  validates :timezone, inclusion: { in: ActiveSupport::TimeZone.all.map(&:name), message: '%{value} is not valid' }, allow_blank: true
end
