class CocktailsController < ApplicationController 

  def list
    @page = params[:page]
    @cocktails = Cocktail.all
  end


  def show
    id = params[:cocktail_id]
    _app_id = "2a72c2b5"
    _app_key = "947cb587b52aadbed580550671ef8605"

    uri_path = "http://api.yummly.com/v1/api/recipe/" 
    query_string = uri_path + id + "?_app_id=" + _app_id + '&_app_key=' + _app_key

    @cocktail = HTTParty.get(query_string)
  end

end