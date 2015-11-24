class BarsController < ApplicationController 

  def index
    @bars = Bar.all
    address = params[:address]
    postcode = params[:postcode]
    @location = address + " " + postcode
    @day = params[:day]
  end

  def list
  end

end