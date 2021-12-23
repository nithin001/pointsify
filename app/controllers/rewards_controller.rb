class RewardsController < ApplicationController
  load_and_authorize_resource

  # GET /rewards or /rewards.json
  def index
    @rewards = filtered_by_number
  end

  private

  def filtered_by_number
    return all_rewards unless params[:number].present?

    all_rewards.where(phone_number: params[:number])
  end

  def all_rewards
    current_user.preferred_organization.rewards
  end
end
