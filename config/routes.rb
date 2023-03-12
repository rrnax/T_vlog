Rails.application.routes.draw do

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  namespace :users do
    resource :user, only: [:show, :update]
  end

  namespace :content do
    resource :posts
    resource :comments
    post '/comments/list', to: 'comments#index'
  end

  get '/content/posts/:id', to: 'content/posts#specific'
  get '/users/user/:id', to: 'users/users#specific'

end
