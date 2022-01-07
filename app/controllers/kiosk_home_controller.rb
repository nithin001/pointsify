class KioskHomeController < KioskApplicationController
  def index
    unless current_user.preferred_organization.present?
      redirect_to new_organization_path
    end
  end
end
