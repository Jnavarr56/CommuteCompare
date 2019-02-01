class DashboardController < ApplicationController

  include DashboardHelper
  
  before_action :check_password_login_params, only: [:check_password_login]

  before_action :get_table_data, only: [:get_table_data_params]

  
  def landing

    

  end

  def dash

    @user = current_user

  end

  def get_table_data

    
    puts get_table_data_params

    if current_user.points.exists? && current_user.apartments.exists?

      table_data = { 'message' => 'SUCCESS', 'table_data' => {'header' => ['Apartment Address'] , 'header2' => [''], 'rows' => [], 'coords' => [] } }

      points = current_user.points.order(:id)

      apartments = current_user.apartments.order(:id)

      apartment_fields = [['price', 'Price ($)/mo'], ['baths', 'Baths'], ['in_unit_laundry', 'In Unit Laundry'], ['pets_allowed', 'Pets Allowed'], ['has_own_parking', 'Has Own Parking']]

      apartment_fields.each do |field|

        table_data['table_data']['header'].push(field[1])

        table_data['table_data']['header2'].push('')

      end

      points.each do |pt|

        table_data['table_data']['header'].push(pt.name.length > 30 ? "@#{pt.name.slice(0, 27)}..." : "@#{pt.name}")

        table_data['table_data']['header2'].push('Time')
        table_data['table_data']['header2'].push('Dist')

        table_data['table_data']['coords'].push({'lat' => pt.lat, 'lng' => pt.lng, 'name' => pt.name, 'type' => 'point', 'address' => pt.address })


      end

      apartments.each do |apt|

        table_data['table_data']['coords'].push({'lat' => apt.lat, 'lng' => apt.lng, 'name' => apt.address, 'type' => 'apartment', 'price' => apt.price })

        new_row = [apt.address]

        apartment_fields.each do |field|

          if apt[field[0]] == false

            new_row.push('No')

          elsif apt[field[0]] == true
    
            new_row.push('Yes')

          else

            new_row.push(apt[field[0]])

          end

        end

        points.each do |pt|

          result = getCommuteTime({lat: apt.lat, lng: apt.lng}, {lat: pt.lat, lng: pt.lng}, get_table_data_params['departure_time'].to_i, get_table_data_params['mode'], get_table_data_params['traffic_model'] == "null" ? nil : get_table_data_params['traffic_model'])

          new_row.push(result['duration']['text'])

          new_row.push(result['distance']['text'])

        end 

        table_data['table_data']['rows'].push(new_row)

      end

      render json: table_data
    
    else 

      if !current_user.points.exists? && !current_user.apartments.exists?

        render json: { "message" => "MISSING MODELS", "ERROR_CODE" =>  "NO POINTS OR APARTMENTS" }

      elsif current_user.points.exists? && !current_user.apartments.exists?

        render json: { "message" => "MISSING MODELS", "ERROR_CODE" =>  "MISSING APARTMENTS" }

      else 

        render json: { "message" => "MISSING MODELS", "ERROR_CODE" =>  "MISSING POINTS" }

      end

    end

  end

  def check_password_login

    if !User.where({email: check_password_login_params[:email]}).exists?

      render json: { "return_message" =>  "FAIL" }

    elsif User.where({email: check_password_login_params[:email]}).first.signed_up_with_oauth

      render json: { "return_message" =>  "WARN", "provider" => User.where({email: check_password_login_params[:email]}).first.provider }

    elsif User.where({email: check_password_login_params[:email]}).first.valid_password?(check_password_login_params[:password])

      render json: { "return_message" =>  "SUCCESS" }

    else

      render json: { "return_message" =>  "FAIL" }

    end

  end





  private

  def check_password_login_params

    # Use strong params to unsure only the inputs from the forms are passed through.
    params.require(:check_password_login_params).permit(:command, :email, :password)

  end

  def get_table_data_params

    # Use strong params to unsure only the inputs from the forms are passed through.
    params.permit(:departure_time, :traffic_model, :mode, :format, :dashboard)

  end





end
