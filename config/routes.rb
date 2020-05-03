Rails.application.routes.draw do
  root to: "map#index"
  devise_for :users
  resources :map, only: [:index]
  resources :users, only: %i[show update]
  resources :admin, only: %i[index]

  post '/admin/delete', to: 'admin#destroy'
  post '/admin/make_admin', to: 'admin#make_admin'
  post '/admin/drop_admin', to: 'admin#drop_admin'
end
