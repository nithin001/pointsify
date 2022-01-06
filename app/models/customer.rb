class Customer < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :lockable, :validatable, :authentication_keys => [:phone]

  validates_uniqueness_of :phone

  def email_required?
    false
  end

  def will_save_change_to_email?
    false
  end

  def remember_me
    true
  end
end
