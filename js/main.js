var app = (function(){
  var markers = {};
  var map;

  var initialize = function() {
    var ny = new google.maps.LatLng(40.721659, -73.997250);
    var mapOptions = {
      zoom: 13,
      center: ny,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
  };

  $('.stationname').on('click', function(){
    var longitude = $(this).siblings().children('div.longitude').text();
    var latitude = $(this).siblings().children('div.latitude').text();
    var id = 'mkr_'+longitude+latitude;
    var latlong = new google.maps.LatLng(latitude, longitude);
    
    if(typeof markers[id] != 'undefined'){
      delMarker(markers[id], id);
      // markers[id].setMap(null);
      // delete markers[id];
    } else {
      addMarker(latlong, id);
    }

    $(this).siblings($('div.stationinfo')).slideToggle('fast');
    console.log(markers);
  });

  var addMarker = function(location, id) {
    var marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position: location,
      map : map,
    });
    markers[id] = marker;
  };

  var delMarker = function(marker, id){
    marker.setMap(null);
    delete markers[String(id)];
    console.log('delete',marker);
  };

  google.maps.event.addDomListener(window, 'load', initialize);

  return {
    markers : markers
  };

})();

