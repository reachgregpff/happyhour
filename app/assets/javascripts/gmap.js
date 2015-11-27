function initMap() {

  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };

  var map;
  var geocoder = new google.maps.Geocoder();
  var location = $('.location').text().toUpperCase();
  // ADDED ---- GREG
  var myLat = null;
  var myLong = null;
  // END --- GREG

  function rad(x) {return x*Math.PI/180;}

  // SHOW BAR INSIDE INITMAP()
  var showBars = function() {
    var $barList = $('.bar-list');
    var options = {
      url: '/api/bars',
      type: 'GET',
      dataType: 'json'
    };

    $.ajax(options).done(function(data) {
      // first we get the lat and lng from the address, 
      // since the ajax above is unsynchronous, we are assuming by now the lat and long for current position will be fetched
      
      // ADDED ---- GREG

      // console.log("LAT " + myLat + "LONG " + myLong );

      var R = 6371; // radius of earth in km
      var distances = [];
      var id = 0;

      _.each(data, function(bar) {
        // find the distance for each bar from my location
        // var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(myLat, myLong), new google.maps.LatLng(bar.latitude, bar.longitude));
        var dLat  = rad(bar.latitude - myLat);
        var dLong = rad(bar.longitude - myLong);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(rad(myLat)) * Math.cos(rad(myLat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        // console.log("DISTANCE IS: " + d);
        var distance_index = [d, id]
        distances.push(distance_index);
        id++;
      });

      // console.log("Area of distance and index: " + distances);
      // SORTING DISTANCE OF BARS
      distances = distances.sort();
      // console.log("Area of distance and index after sorting: " + distances);
      var counter = 0;
      for(var i=0; i<10; i++) {  // list only closest 10 

        (function() {
          counter += 1
          var compiled = _.template( $('#bar-box-template').html() );

          sort_order = distances[i][1];  // Fetch the id field of each pair in distances
          // console.log("THIS IS THE SORT ORDER: " + sort_order);

          if (data[sort_order].starred){
            var abc = 'clicked'
          } else {
            var abc = '';
          }


          image_number = "/" + (i+1) + ".png";

          // console.log("THIS IS THE SORT ORDER: " + sort_order);
          // Underscore Compiled function

          var html = compiled( {id: data[sort_order].id, name: data[sort_order].name, image_url: data[sort_order].image_url, 
                                address: data[sort_order].address, website: data[sort_order].website,
                                offer: data[sort_order].offer, phone: data[sort_order].phone, image_number: image_number, abc: "unclicked" 
                              } );
          $barList.append(html);

          // image of marker
          var image = {
            url: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + counter + '|FF9900|000000',
            size: new google.maps.Size(42, 68),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 32)
          };

          // create marker object for each bars
          var marker = new google.maps.Marker ({
            position: {lat: data[sort_order].latitude, lng: data[sort_order].longitude},
            map: map,
            icon: image,
            title: data[sort_order].name
          });
          // create dialog box for each marker
          var infowindow = new google.maps.InfoWindow({
            content: data[sort_order].name
          });

          // listener on click for each marker to pop up dialog box
          marker.addListener('click', function() {
            infowindow.open(map, marker);
          });        

        })();
      }

      //END -- GREG

    });
  };


  // Check loction
  // console.log("Input location: " + location);
  map = new google.maps.Map($('.map')[0], {
    center: {lat: -34.397, lng: 150.644},
    zoom: 15
  });

  if ( location === "NEARBY" ) {
  // Try HTML5 geolocation.
    if (navigator.geolocation) {
      // console.log("Input location in NEARBY: " + location + " HERE");
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
        var marker = new google.maps.Marker({
            map: map,
            position: pos,
            icon: '/marker-star-3.png'
        });
        // console.log("LatLng of Nearby: " + pos);
        myLat = position.coords.latitude;
        myLong = position.coords.longitude;
        showBars();
      }, function() {
        var infoWindow = new google.maps.InfoWindow({map: map});
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      var infoWindow = new google.maps.InfoWindow({map: map});
      handleLocationError(false, infoWindow, map.getCenter());
    }

  } else {
    // IF SOMETHING ELSE BUT NEARBY
    geocoder.geocode( { 'address': location }, function(results, status) {
      // console.log("Input location: " + location +" NOT NEARBY!");
      if ( status == google.maps.GeocoderStatus.OK ) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            icon: '/marker-star-3.png'
        });
        // console.log("Other than Nearby LatLng: " + results[0].geometry.location);
        myLat = results[0].geometry.location.lat();
        myLong = results[0].geometry.location.lng();
        showBars();
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}

// Showing error message on converting geolocation
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed. Please let us have your location for this service.' :
                        'Error: Your browser doesn\'t support geolocation.');
}