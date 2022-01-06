class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable

  belongs_to :preferred_organization, class_name: 'Organization', optional: true
  has_many :owned_organizations, class_name: 'Organization', foreign_key: 'owner_id'
  validates_presence_of :name

  def set_preferred_organization(organization)
    update(preferred_organization: organization)
  end
end
