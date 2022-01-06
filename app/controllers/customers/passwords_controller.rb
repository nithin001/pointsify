# frozen_string_literal: true

class Customers::PasswordsController < Devise::PasswordsController
  def unlockable?(resource)
    resource.respond_to?(:unlock_access!)
  end
end
