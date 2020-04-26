Rails.application.routes.draw do
  root to: "map#index"
  devise_for :users
  resources :map, only: [:index]
  resources :users, only: %i[show update]
  resources :admin
end
