require 'googlemaps/services/client'
require 'googlemaps/services/geocoding'

module DashboardHelper

    include GoogleMaps::Services

    def is_in_nyc?(address_str)

        client = GoogleClient.new(key: ENV['GOOGLE_API_KEY'], response_format: :json)
    
        geocode =  GoogleMaps::Services::Geocode.new(client)

        geocode.query(address: address_str)[0]['address_components'].each do |component|

            if component['types'].include?('sublocality') || component['types'].include?('locality')

                ['Brooklyn', 'Staten Island', 'Bronx', 'Manhattan', 'Queens'].each do |borough|

                    return true if component['long_name'] == borough

                end

                return false

            end

        end
    
    end

end

    


