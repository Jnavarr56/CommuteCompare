class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

    def all

        user = User.from_omniauth(request.env["omniauth.auth"])

        #If the user can be retrieved, either because it was created with OAuth or because the user simply exists then start a session for this user (sign in).
        if user.persisted? 

          session[:user_id] = user.id

          sign_in_and_redirect user, event: :authentication #this will throw if @user is not activated

          set_flash_message(:notice, :success, kind: user.provider == "facebook" ? user.provider.capitalize : "Google") if is_navigational_format?

        else

          session["devise.user_attributes"] = user.attributes

        end
        
    end

    #We want this method to apply in the event the provider is Facebook OR Google.
    alias_method :facebook, :all
    alias_method :google_oauth2, :all

end