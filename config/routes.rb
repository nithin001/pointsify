require 'sidekiq/web'

Rails.application.routes.draw do
  authenticate :user, lambda { |u| u.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  constraints subdomain: 'kiosk' do
    devise_for :users, controllers: {
      passwords: 'users/passwords',
      registrations: 'users/registrations'
    }
    root to: 'kiosk_home#index', as: 'kiosk_root'
    get '/kiosk', to: 'kiosk#index'
    get '/menu', to: 'menu#index', as: 'menu'

    resources :stores, except: [:index, :destroy]
    resources :bills
    resources :transactions, only: [:show, :index]
    resources :rewards, only: [:index]
    resources :redemptions
    resources :redemption_flows
  end

  constraints subdomain: 'customer' do
    devise_for :customers, controllers: {
      registrations: 'customers/registrations',
      passwords: 'customers/passwords'
    }

    namespace :customers do
      resources :sign_up_flow
      resources :recovery_flow
    end

    root to: 'customer#index', as: 'customer_root'
  end

  root to: 'home#index', as: 'marketing_root'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
