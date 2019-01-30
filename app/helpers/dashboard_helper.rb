
require 'googlemaps/services/client'
require 'googlemaps/services/distancematrix'

module DashboardHelper

    include GoogleMaps::Services

    def getCommuteTime(origin_coords, dest_coords, departure_time_input, mode_input, traffic_model_input = nil)

        client = GoogleClient.new(key: ENV['GOOGLE_API_KEY'], response_format: :json)
        
        distancematrix = GoogleMaps::Services::DistanceMatrix.new(client)

        if !traffic_model_input.nil?
            
            result = distancematrix.query(

                origins: [origin_coords], 
                destinations: [dest_coords],
                mode: 'driving',
                traffic_model:  traffic_model_input,
                departure_time: departure_time_input

            )

        else

            result = distancematrix.query(

                origins: [origin_coords], 
                destinations: [dest_coords],
                mode: 'transit',
                departure_time: departure_time_input

            )


        end

        puts ''
        puts result['rows'][0]['elements'][0].inspect
        puts ''

        result['rows'][0]['elements'][0]

    end

end
