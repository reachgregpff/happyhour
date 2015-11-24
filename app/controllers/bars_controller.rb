class BarsController < ApplicationController 

  def index
    @bars = Bar.all
    @address = params[:address]
    @postcode = params[:postcode]
    @location = @address
    if @address != "Nearby"
      @location = @location + " " + @postcode
    end
    @day = params[:day]
  end

  def list
  end

  def show
    @bars = Bar.find(params[:id])
  end

end