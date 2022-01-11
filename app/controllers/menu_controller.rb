class MenuController < KioskApplicationController
  def index
    unless current_user.owned_store.present?
      redirect_to new_store_path
    end
  end
end
