class ApartmentsController < ApplicationController

    before_action :delete_user_apartment_params, only: [:delete_user_apartment]
  
    before_action :add_user_apartment_params, only: [:add_user_apartment]
  
  
    include PointsHelper
  
  
    def index
      @user = current_user
    end
  
    def create
    end
  
    def update
    end
  
    def delete
    end
  
    def show
    end
  
    def get_user_apartments
  
      puts params.inspect
  
      apartments = { 'apartments' => {}}
  
      current_user.apartments.each do |apartment|
  
        puts apartment.inspect
      
        apartments['apartments']["#{apartment.id}"] = {'address'=> apartment.address, 'price' => apartment.price.to_f, 'lat' => apartment.lat, 'lng' => apartment.lng,  'baths' => apartment.baths, 'beds' => apartment.beds, 'in_unit_laundry' => apartment.in_unit_laundry, 'pets_allowed' => apartment.pets_allowed, 'has_own_parking' => apartment.has_own_parking}
        
      end
  
      render json: apartments
  
    end
  
    def delete_user_apartment
  
      apartment_to_delete = Apartment.find(delete_user_apartment_params['toDelete'])
  
      apartment_to_delete.destroy
  
      if apartment_to_delete.destroyed?
  
        render json: { 'message' => true }
  
      else
  
        render json: { 'message' => false }
  
      end
      
    end
  
    def add_user_apartment
  
      location = is_in_nyc?(add_user_apartment_params['toAdd']['address'])
    
      if !location.nil? && (location[0] == 'invalid_address' || location[0] == 'is_not_in_nyc')
  
        render json: { 'message' => location[0] }
  
      else

        if Apartment.where({address: location[3], user_id: current_user.id}).exists?

          render json: { 'message' => 'already_exists' } and return

        end

        new_apartment = Apartment.new(user_id: current_user.id, address: location[3], price: add_user_apartment_params['toAdd']['price'], beds: add_user_apartment_params['toAdd']['beds'], baths: add_user_apartment_params['toAdd']['baths'], in_unit_laundry: add_user_apartment_params['toAdd']['in_unit_laundry'], pets_allowed: add_user_apartment_params['toAdd']['pets_allowed'], has_own_parking: add_user_apartment_params['toAdd']['has_own_parking'], lat: location[1], lng: location[2])
  
        if new_apartment.save 
          
          render json: { 'message' => 'saved', 'id' => new_apartment.id, 'lat' => location[1], 'lng' => location[2] }
  
        else
  
          render json: { 'message' => 'error' }
  
        end
  
      end
  
      puts location.inspect
  
    end
  
  
    private
  
    def get_user_apartments_params
  
      #params.require(:check_password_login_params).permit(:command, :email, :password)
  
    end
  
    def delete_user_apartment_params
  
      params.require(:data).permit(:toDelete)
  
    end
  
    def add_user_apartment_params
  
      params.require(:data).permit(toAdd: [:name, :price, :address, :beds, :baths, :has_own_parking, :pets_allowed, :in_unit_laundry])
  
    end
  
  
  end
  