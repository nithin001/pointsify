class KioskApplicationController < ActionController::Base
  set_current_tenant_through_filter

  before_action :authenticate_user!
  before_action :set_default_tenant

  private

  def set_default_tenant
    return unless current_user.present?

    set_preferred_organization

    return unless current_user.preferred_organization.present?

    set_current_tenant(current_user.preferred_organization)
  end

  def set_preferred_organization
    preferred_organization = current_user.preferred_organization
    all_organizations = current_user.owned_organizations
    return if preferred_organization.present? && all_organizations.include?(preferred_organization)

    first_organization = all_organizations.first
    return unless first_organization.present?

    current_user.set_preferred_organization(first_organization)
  end
end
