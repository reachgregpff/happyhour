$('document').ready(function() {
  var map;
  var geocoder = new google.maps.Geocoder();

  var drawMap = function(mapOptions) {
    map = new google.maps.Map( $('.map')[0], mapOptions );
  };
  var mapOptions = {
            zoom: 14,
            scrollwheel: false,
            center: { lat: -37.8064071, lng: 144.8605126 }
          };
  drawMap(mapOptions);
  var searchAddress = function() {
    // Input box
    var address = $('.address').val();

    // Dropdown box
    // var address = $( "select.address option:selected").val();

    var infoWindow = new google.maps.InfoWindow( { map: map } );
          
    // Check if location Nearby
    if ( address == "Nearby") {

      // Nearby True
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          var mapOptions = {
            zoom: 14,
            scrollwheel: false,
            center: pos
          };

          drawMap(mapOptions);

          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        console.log(map.getCenter())
        handleLocationError(false, infoWindow, map.getCenter());
      }

    // Another Location
    } else {
      geocoder.geocode( { 'address': address }, function(results, status) {
        if ( status == google.maps.GeocoderStatus.OK ) {
          console.log(results[0].geometry.location);
          var mapOptions = {
            zoom: 14,
            scrollwheel: false,
            // center: { lat: -37.8064071, lng: 144.8605126}
            center: results[0].geometry.location
          }
          drawMap(mapOptions);
        } else {
          console.log("Geocode was not successful.")
        }
      }); 
    }
  };

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
  }
  $('#search-btn').on('click', searchAddress);
});