class KioskHomeController < KioskApplicationController
  def index
    unless current_user.owned_store
      redirect_to new_store_path
    end

    @stats = Stats.new(current_user.owned_store)
  end
end
