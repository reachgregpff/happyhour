function initMap() {

  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };

  var map;
  var geocoder = new google.maps.Geocoder();
  var location = $('.location').text();

  // SHOW BAR INSIDE INITMAP()
  var showBars = function() {
    var $barList = $('.bar-list');
    var options = {
      url: 'http://localhost:3000/api/bars',
      type: 'GET',
      dataType: 'json'
    };

    $.ajax(options).done(function(data) {
      _.each(data, function(bar) {
        // console.log(bar.name);

        var compiled = _.template( $('#bar-box-template').html() );
        var html = compiled( {name: bar.name, image_url: bar.image_url } );
        $barList.append(html);
        
        var marker = new google.maps.Marker ({
          position: {lat: bar.latitude, lng: bar.longitude},
          map: map,
          title: bar.name
        });
      });
    });
  };


  // Check location
  console.log("Input location: " + location);
  map = new google.maps.Map($('.map')[0], {
    center: {lat: -34.397, lng: 150.644},
    zoom: 15
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  if ( location == "Nearby" ) {
  // Try HTML5 geolocation.
    if (navigator.geolocation) {
      console.log("Input location in NEARBY:" + location + "HERE");
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        map.setCenter(pos);
        showBars();
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }

  } else { // IF SOMETHING ELSE BUT NEARBY
    geocoder.geocode( { 'address': location }, function(results, status) {
      console.log("Input location: " + location +"NOT NEARBY!");
      if ( status == google.maps.GeocoderStatus.OK ) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            scrollwheel: false,
            position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
    showBars();
  }
}



function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}