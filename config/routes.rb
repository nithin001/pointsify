require 'sidekiq/web'

Rails.application.routes.draw do
  authenticate :user, lambda { |u| u.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  constraints subdomain: 'kiosk' do
    devise_for :users
    root to: 'home#index', as: 'kiosk_root'
    get '/kiosk', to: 'kiosk#index', as: 'kiosk'
    get '/menu', to: 'menu#index', as: 'menu'

    resources :organizations do
      member do
        get :set_as_preferred
      end
    end
    resources :bills
    resources :rewards, only: [:index]
    resources :redemptions
  end

  constraints subdomain: 'customer' do
    root to: 'customer#index', as: 'customer_root'
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
