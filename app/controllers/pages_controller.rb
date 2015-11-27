class PagesController < ApplicationController 

  def home

  

  end


  def about

    


  end

  def listing
  	if current_user.access_level != 3
  		redirect_to '/'
  	end
  end


end