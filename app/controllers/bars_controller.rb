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
    @bars = Bar.all
    @page = params[:page]
  end


  def show
    @bar = Bar.find(params[:id])
  end

  def search
    @name = params[:name]
    #@bar = Bar.where(“NAME :LIKE #{@name}")
    @bar = Bar.where("NAME LIKE ?", "%#{@name}%")
    #where("bar LIKE ?", "%#{query}%")
  end

end