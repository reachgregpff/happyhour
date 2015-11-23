class BarsController < ApplicationController 

  def index
    redirect_to "/list?city=melbourne"
  end

  def list
    @bars = Bar.all
  end

end