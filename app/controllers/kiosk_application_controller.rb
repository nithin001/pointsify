class KioskApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :check_for_store

  def check_for_store
    unless current_user.owned_store.present?
      redirect_to new_store_path
    end
  end
end
