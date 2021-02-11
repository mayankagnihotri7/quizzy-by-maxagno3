Rails.application.routes.draw do
  get 'quizzes/create'
  root "home#index"
  resources :users, only: [:index]
  resource :sessions, only: [:create, :destroy]
  resources :quizzes, only: [:create]
  get '*path', to: 'home#index', via: :all
end
