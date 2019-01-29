class DashboardController < ApplicationController

  include DashboardHelper
  
  before_action :check_password_login_params, only: [:check_password_login]

  
  def landing

    puts is_in_nyc?('2237 Stewart Avenue Westbury NY 11590')

  end

  def dash


    #puts is_in_nyc?('2237 Stewart Avenue Westbury NY 11590')


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

  def test_location

  end

  private

  def check_password_login_params

    # Use strong params to unsure only the inputs from the forms are passed through.
    params.require(:check_password_login_params).permit(:command, :email, :password)

  end



end
