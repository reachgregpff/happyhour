class	Api::BarsController < ApplicationController
	def index
		#USER INPUT
    address = params[:address]
    postcode = params[:postcode]
    @location = address
    if address != "Nearby"
    	@location = @location + " " + postcode
    end
    @day = params[:day]

    #FROM THE BACK
		@bars = Bar.all
		render json: @bars
	end
end