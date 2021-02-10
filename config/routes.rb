Rails.application.routes.draw do
  root "home#index"
  resources :users, only: [:index]
  resource :sessions, only: [:create, :destroy]
  get '*path', to: 'home#index', via: :all
end
