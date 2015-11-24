
class Api::BarsController < ApplicationController
    def index

    #FROM THE BACK
        @bars = Bar.all
        render json: @bars
    end
end