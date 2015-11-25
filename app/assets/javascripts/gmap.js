function initMap() {

  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };

  var map;
  var geocoder = new google.maps.Geocoder();
  var location = $('.location').text();



  //ADDED ---- GREG
  var myLat = null;
  var myLong = null;

  $.ajax({
    url: "http://maps.googleapis.com/maps/api/geocode/json?address="+location+"&sensor=false",
    type: "POST",
    success: function(res){
      console.log("IN AJAX" + res.results[0].geometry.location.lat);
      myLat = res.results[0].geometry.location.lat;
      console.log("IN AJAX" + res.results[0].geometry.location.lng);
      myLong = res.results[0].geometry.location.lng;
    }
  });

  function rad(x) {return x*Math.PI/180;}
  //END --- GREG


  // SHOW BAR INSIDE INITMAP()
  var showBars = function() {
    var $barList = $('.bar-list');
    var options = {
      url: 'http://localhost:3000/api/bars',
      type: 'GET',
      dataType: 'json'
    };

    $.ajax(options).done(function(data) {
      /*_.each(data, function(bar) {
        // console.log(bar.name);

        var compiled = _.template( $('#bar-box-template').html() );
        var html = compiled( {name: bar.name, image_url: bar.image_url } );
        $barList.append(html);
        
        var marker = new google.maps.Marker ({
          position: {lat: bar.latitude, lng: bar.longitude},
          map: map,
          title: bar.name,
          // icon: "/assets/blueMarker.png"
        });
      }); */

      //first we get the lat and lng from the address, 
      //since the ajax above is unsynchronous, we are assuming by now the lat and long for current position will be fetched
      
      //ADDED ---- GREG

      console.log("LAT " + myLat + "LONG " + myLong );

      var R = 6371; // radius of earth in km
      var distances = [];
      var id = 0;

      _.each(data, function(bar) {
        //find the distance for each bar from my location
        //var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(myLat, myLong), new google.maps.LatLng(bar.latitude, bar.longitude));
        var dLat  = rad(bar.latitude - myLat);
        var dLong = rad(bar.longitude - myLong);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(rad(myLat)) * Math.cos(rad(myLat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        console.log("DISTANCE IS : " + d);
        var distance_index = [d, id]
        distances.push(distance_index);
        id++;
      });

      console.log(distances);
      distances = distances.sort();
      console.log(distances);

      for(var i=0; i<10; i++) {  // list only closest 10 

        var compiled = _.template( $('#bar-box-template').html() );
        sort_order = distances[i][1];  // Fetch the id field of each pair in distances
        console.log("THIS IS THE SORT ORDER" + sort_order);
        var html = compiled( {name: data[sort_order].name, image_url: data[sort_order].image_url, 
                              address: data[sort_order].address, website: data[sort_order].website } );
        $barList.append(html);
        
        var marker = new google.maps.Marker ({
          position: {lat: data[sort_order].latitude, lng: data[sort_order].longitude},
          map: map,
          title: data[sort_order].name
        });

      }

      //END -- GREG

    });
  };


  // Check loction
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