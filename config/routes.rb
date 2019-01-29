Rails.application.routes.draw do
  
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  devise_scope :user do
    
    unauthenticated do
      root :to => "dashboard#landing"
    end

    authenticated do
      root :to => "dashboard#dash"
    end
    
  end

  get '/points', to: "points#index"

  get '/user-points', to: "points#get_user_points"

  post '/user-points', to: "points#delete_user_points"
  
  
end
