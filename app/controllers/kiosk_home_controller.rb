class KioskHomeController < KioskApplicationController
  def index
    unless current_user.owned_store
      redirect_to new_store_path
    end
  end
end
