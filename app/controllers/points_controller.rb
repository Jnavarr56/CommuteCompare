class PointsController < ApplicationController

  before_action :delete_user_points_params, only: [:delete_user_points]

  before_action :add_user_points_params, only: [:add_user_points]


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

  def get_user_points

    puts params.inspect

    points = { 'points' => {}}

    current_user.points.each do |point|

      puts point
    
      points['points']["#{point.id}"] = {'name' => point.name, 'address'=> point.address, 'lat' => point.lat, 'lng' => point.lng }
      
    end

    render json: points

  end

  def delete_user_points

    point_to_delete = Point.find(delete_user_points_params['toDelete'])

    point_to_delete.destroy

    if point_to_delete.destroyed?

      render json: { 'message' => true }

    else

      render json: { 'message' => false }

    end
    
  end

  def add_user_points

    location = is_in_nyc?(add_user_points_params['toAdd']['address'])
  
    if !location.nil? && (location[0] == 'invalid_address' || location[0] == 'is_not_in_nyc')

      render json: { 'message' => location[0] }

    else

      if Point.where({address: location[3]}).exists?

        render json: { 'message' => 'already_exists' } and return

      end

      new_point = Point.new(user_id: current_user.id, name: add_user_points_params['toAdd']['name'], address: location[3], lat: location[1], lng: location[2])

      if new_point.save 
        
        render json: { 'message' => 'saved', 'id' => new_point.id, 'lat' => location[1], 'lng' => location[2], }

      else

        render json: { 'message' => 'error' }

      end

    end

    puts location.inspect

  end


  private

  def get_user_points_params

    #params.require(:check_password_login_params).permit(:command, :email, :password)

  end

  def delete_user_points_params

    params.require(:data).permit(:toDelete)

  end

  def add_user_points_params

    params.require(:data).permit(toAdd: [:name, :address])

  end


end
