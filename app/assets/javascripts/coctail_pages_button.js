$('#number-scroll').on('click', function() {

  page_count++;
  data.page = page_count;
  data.per_page = 2;

  var options = {
    url: 'http://localhost:3000/api/dishes',
    type: 'get',
    dataType: 'json',
    data: data
  }

  $.ajax(options).done(function(data) {

    console.log(data);
    

    /*var $dishList = $('.dish-list');  //search

    //$.each (data, function (i, dish){  Use underscore.js instead of jquery.js for each cos it is faster

    _.each(data, function(dish) {

    
      var view = new DishItemView({ model: dish });
      view.render();
      $('.dish-list').append(view.el);

      //comment out as dishItemView is doing this

      //var compiled = _.template( $('#dish-box-template').html() );
      //var html = compiled({ name: dish.name, image: dish.image_url, lat: dish.latitude, lng: dish.longitude });
      //$('.dish-list').append(html);


      var marker = new google.maps.Marker ({
        position: { lat: dish.latitude, lng: dish.longitude},
        map: map,
        title: dish.name
      });


    });  */

  });


});