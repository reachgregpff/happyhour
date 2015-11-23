class CocktailsController < ApplicationController 

  def list
    @cocktails = Cocktail.all

  end

end