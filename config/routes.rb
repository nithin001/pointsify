require 'sidekiq/web'

Rails.application.routes.draw do
  resources :rewards, only: [:index]
  resources :redemptions
  authenticate :user, lambda { |u| u.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  devise_for :users

  root to: 'home#index'
  get '/kiosk', to: 'kiosk#index', as: 'kiosk'

  resources :organizations do
    member do
      get :set_as_preferred
    end
  end
  resources :bills

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
