class SessionController < ApplicationController

  def new
  end
  def create
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      if user.access_level == 1
        session[:user_id] = user.id
        redirect_to "/" # REDIRECT TO VISITOR LANDING PAGE
      elsif user.access_level == 2
        session[:user_id] = user.id
        redirect_to "/" # REDIRECT TO BAR OWNER LANDING PAGE
      elsif user.access_level == 3
        session[:user_id] = user.id
        redirect_to "/"  # REDIRECT TO WEBSITE ADMIN LANDING PAGE
      end
    else
      redirect_to "/"
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to "/"
  end

end