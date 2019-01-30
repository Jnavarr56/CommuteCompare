require 'googlemaps/services/client'
require 'googlemaps/services/geocoding'

module PointsHelper

    include GoogleMaps::Services

    def is_in_nyc?(address_str)

        client = GoogleClient.new(key: ENV['GOOGLE_API_KEY'], response_format: :json)
    
        geocode =  GoogleMaps::Services::Geocode.new(client)

        loc = geocode.query(address: address_str)


        return ['invalid_address'] if loc[0]['address_components'].nil?

        coords = loc[0]['geometry']['location']

        loc[0]['address_components'].each do |component|

            if component['types'].include?('sublocality') || component['types'].include?('locality')

                ['New York', 'Brooklyn', 'Staten Island', 'Bronx', 'Manhattan', 'Queens'].each do |borough|

                    return ['is_in_nyc', coords["lat"], coords["lng"], loc[0]['formatted_address']] if component['long_name'] == borough

                end
            end

        end

        return ['is_not_in_nyc']
    
    end

end

    


