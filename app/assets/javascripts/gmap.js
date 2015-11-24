function initMap() {
  var map;
  var geocoder = new google.maps.Geocoder();
  var location = $('.location').text();

  // var drawMarker = function(bar_location) {
  //   geocoder.geocode( { 'address': bar_location }, function(results, status) {
  //     console.log("Input location: " + location +"NOT NEARBY!");
  //     if ( status == google.maps.GeocoderStatus.OK ) {
  //       map.setCenter(results[0].geometry.location);
  //       var marker = new google.maps.Marker({
  //           map: map,
  //           zoom: 16,
  //           scrollwheel: false,
  //           position: results[0].geometry.location
  //       });
  //     } else {
  //       alert('Geocode was not successful for the following reason: ' + status);
  //     }
  //   });
  // };


  // Check location
  console.log("Input location: " + location);
  map = new google.maps.Map($('.map')[0], {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6
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
            zoom: 16,
            scrollwheel: false,
            position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
    // showBars();
  }

  // PUT ALL BARS MARKER
  // var drawMarker = function() {
  //   geocoder.geocode( { 'address': "Flinders St Station, VIC 3000" }, function(results, status) {
  //     console.log("Input location: " + location +"NOT NEARBY!");
  //     if ( status == google.maps.GeocoderStatus.OK ) {
  //       map.setCenter(results[0].geometry.location);
  //       var marker = new google.maps.Marker({
  //           map: map,
  //           zoom: 16,
  //           scrollwheel: false,
  //           position: results[0].geometry.location
  //       });
  //     } else {
  //       alert('Geocode was not successful for the following reason: ' + status);
  //     }
  //   });
  // };

}

// var showBars = function() {
//   var options = {
//     url: 'http://localhost:3000/api/bars',
//     type: 'GET',
//     dataType: 'json'
//   };

//   $.ajax(options).done(function(data) {
//     console.log(data);
//   });
// };

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}