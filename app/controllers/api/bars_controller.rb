class Api::BarsController < ApplicationController
  def index
    #FROM THE BACK
    @bars = Bar.all

    json = []

    if logged_in?
      @bars.each do |bar|
        starred = !!bar.barfaves.find_by(user_id: current_user.id)
        json << bar.attributes.merge({ 
          starred: starred 
        })
      end
    else
      json = @bars.to_json
    end

    render json: json
  end
end