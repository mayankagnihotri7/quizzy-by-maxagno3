Rails.application.routes.draw do
  root "home#index"
  resources :users, only: [:index, :create]
  resource :sessions, only: [:create, :destroy]
  resources :quizzes, only: [:create, :index, :destroy, :update, :show] do
    resources :questions, only: [:create, :index, :update, :show, :destroy]
  end
  resources :public, param: :slug
  resources :attempts, param: :slug
  resource :reports_downloads, only: [:create, :show]
  patch "/quizzes/:id/publish", to: "publish#publish"
  get "/publics/:slug", to: "public#verified"
  get '*path', to: 'home#index', via: :all
end
