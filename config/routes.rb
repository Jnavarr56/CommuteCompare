Rails.application.routes.draw do
  
  devise_for :users, controllers: { 
    
    omniauth_callbacks: 'users/omniauth_callbacks',
    passwords: 'users/passwords'
    
  }

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  devise_scope :user do
    
    unauthenticated do
      root :to => "dashboard#landing"
    end

    authenticated do
      root :to => "dashboard#dash"
    end
    
  end

  #=======Points
  get '/points', to: "points#index"

  get '/user-points', to: "points#get_user_points"

  delete '/user-points', to: "points#delete_user_points"

  post '/user-points', to: "points#add_user_points"


  #=======Apartments
  get '/apartments', to: "apartments#index"

  get '/user-apartments', to: "apartments#get_user_apartments"

  delete '/user-apartments', to: "apartments#delete_user_apartment"

  post '/user-apartments', to: "apartments#add_user_apartment"


  #=======Table Dashboard
  get '/get-table-data/:mode/:traffic_model/:departure_time', to: "dashboard#get_table_data"
  
  
end
