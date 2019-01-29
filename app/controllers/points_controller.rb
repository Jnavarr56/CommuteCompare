class PointsController < ApplicationController

  before_action :delete_user_points_params, only: [:remove_user_points]


  def index
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
    
      points['points']["#{point.id}"] = {'name' => point.name, 'address'=> point.address }
      
    end


    puts points.inspect

    render json: points

  end

  def delete_user_points

    puts delete_user_points_params.inspect

    render json: { 'sup' => "Thing"}

  end


  private

  def get_user_points_params

    #params.require(:check_password_login_params).permit(:command, :email, :password)

  end

  def delete_user_points_params

    params.require(:data).permit(:toDelete)

  end


end
