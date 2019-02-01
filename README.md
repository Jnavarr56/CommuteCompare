# CommuteCompare  :house: :busstop:

CommuteCompare is a mostly responsive full stack web app that uses the Google Maps API to automatically calculate the current NYC public transit commute time to your potential NYC apartments from your favorite places.

[commutecompare.herokuapp.com](commutecompare.herokuapp.com)

###### CommuteCompare is deployed on Heroku and uses:

  - React
  - Ruby on Rails 5.2.2
  - Amazon Web Services (S3)
  - [Google Distance Matrix API] (https://developers.google.com/maps/documentation/distance-matrix/start)
  - [Google Places Autocomplete API] (https://developers.google.com/places/web-service/autocomplete)
  - [Google Maps JavaScript API] (https://developers.google.com/maps/documentation/javascript/tutorial)
  - Facebook OAuth API
  - Google OAuth API
  - PostgreSQL
  - Bootstrap 4

###### Build Tools

   - Webpacker
   - Yarn

###### Other libraries/frameworks/etc include:
- [Devise](https://www.google.com) - Flexible MVC based user authentication solution for Rails.
- [Ruby Client for Google Maps APIs](https://github.com/amrfaissal/googlemaps-services) - Ruby client library allowing you to access Google Maps APIs.
- [List.js] (https://listjs.com/) - "Tiny, invisible and simple, yet powerful and incredibly fast vanilla JavaScript that adds search, sort, filters and flexibility to plain HTML lists, tables, or anything".

## User Features

*Screen shots coming soon!*

  - Add up to 8 NYC apartments easily with an address autocomplete feature and view the locations on a map.
  - Add up to 5 NYC points of interest easily with an address autocomplete feature and view the locations on a map.
  - Have a sortable table generated that contains not only the stats of the places you uploaded, but also the current commute times and distance between all locations.
  - View your points of interest AND your potential apartments on a color coded map.
  - Download your table data in CSV format.
  - Sign up with Google or Facebook, or by making an account
  - Customize account info, including profile picture


###### Important Note:

At the time of my first deploying of this app 02/01/2019, this will have been my first React project. I made it over the course of a weekend for a React releted interview to demonstrate my ability to learn. Please keep this in mind before you laugh at my React code.

## Development

REACT FILES PATH: app/javascript

Combining React and Rails was difficult for me at first because I did not know how to approach it. Many suggestions I recieved where to set up an API only app. However, I wanted to keep the MVC pattern so that I could use **Devise** for my user authentication. Fortunately, using Webpacker to install React on your Rails app gives you a really convenient way to insert mounting points in different parts of your views with a Rails erb tag.

```
<%= javascript_pack_tag 'name_of_jsx_file' %> 
In total, I only had 3 jsx files that imported all of my components.
These three files corresponded to the main dashboard, the apartments section, and the points of interest section.
```

I decided to just set up specific **rails controller actions** that I could do **AJAX** calls to in different lifecycle methods of my React parent components. I built Ruby **hashes** that I could render as **JSON** objects that would be perfectly compatible with the lifecycle method **this.setState()**. 

Writing the code for the commute time calculation was the most fun. I wrote a helper function in ```app/helpers/dashboard_helper.rb``` that allowed me to just pass in an origin latitude/longitude and a destination latitude/longitude and parse the response for the travel time and distance.

This allowed me to do a simple nested for loop with the points of interest and the apartments that would allow me to populate the hash with the needed data (```app/helpers/dashboard_helper.rb```). It kind of looked like this:

```
    table_data = { 'table_data' => { 'rows' => [] } }

    apartments.each do |apt|

        new_row = []

        points.each do |pt|
                                #------apartment origin----------point of interest destination--#
          result = getCommuteTime({lat: apt.lat, lng: apt.lng}, {lat: pt.lat, lng: pt.lng}, get_table_data_params['departure_time'].to_i, get_table_data_params['mode'], get_table_data_params['traffic_model'] == "null" ? nil : get_table_data_params['traffic_model'])

          new_row.push(result['duration']['text']) #<--Push response form API into empty array

          new_row.push(result['distance']['text']) #<--Push response form API into empty array

        end 

        table_data['table_data']['rows'].push(new_row) #<--Push array with data into JSON object

      end

    end

    render json: table_data #<--Send as response to AJAX call from React component
```

I ran into the problem of not having having valid CSRF tokens when using **.fetch()** to do the **AJAX** calls. I ended up using **yarn** to add **jquery-ujs** do I could have these tokens. The **AJAX** calls were performed in ```componentDidMount()``` and then in ```componentDidUpdate()```.


## Building/Development

I used Webpacker and Yarn.

CommuteCompare uses Rails 5.2.2 with a PostgreSQL adapter and an AMS S3 bucket with Active Storage to store images.

My specs at the time of deployment (02/01/2019) are here:

```
Rails version             5.2.2
Ruby version              2.5.1-p57 (x86_64-darwin17)
RubyGems version          2.7.6
Rack version              2.0.6
JavaScript Runtime        Node.js (V8)
Middleware                Webpacker::DevServerProxy, Rack::Sendfile, ActionDispatch::Static, ActionDispatch::Executor, ActiveSupport::Cache::Strategy::LocalCache::Middleware, Rack::Runtime, Rack::MethodOverride, ActionDispatch::RequestId, ActionDispatch::RemoteIp, Sprockets::Rails::QuietAssets, Rails::Rack::Logger, ActionDispatch::ShowExceptions, WebConsole::Middleware, ActionDispatch::DebugExceptions, ActionDispatch::Reloader, ActionDispatch::Callbacks, ActiveRecord::Migration::CheckPending, ActionDispatch::Cookies, ActionDispatch::Session::CookieStore, ActionDispatch::Flash, ActionDispatch::ContentSecurityPolicy::Middleware, Rack::Head, Rack::ConditionalGet, Rack::ETag, Rack::TempfileReaper, Warden::Manager, OmniAuth::Strategies::Facebook, OmniAuth::Strategies::GoogleOauth2
Application root          /Users/jorgenavarro/Desktop/CommuteCompareFolder/CommuteCompare
Environment               development
Database adapter          postgresql
Database schema version   20190129150846
```



