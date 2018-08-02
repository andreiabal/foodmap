$(document).ready(function() {
  $('.box-2').delay('3000').fadeIn('slow')

  //Imagens
$.each(restaurantes, function (index, restaurante) {
  $("<img>").attr("src", restaurante.image).addClass(restaurante.name).appendTo("#box-images");
})
});

/*var map;

function initMap() {
 map = new google.maps.Map(document.getElementById('map'), {
   center: {lat: -23.5676623, lng: -46.6601063},
   zoom: 15
 });
}*/

//MAPA//
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
  zoom: 15,
  center: new google.maps.LatLng(-23.5578108, -46.6625469),
  mapTypeId: 'roadmap'
});

  /*var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  var icons = {
    info: {
      icon: iconBase + 'info-i_maps.png'
    }
  };*/

  var features = restaurantes.map(function(r){
    return {
      position: new google.maps.LatLng(r.latitude, r.longitude),
      type: 'info'
    }
  });

  // Create markers.
  features.forEach(function(feature) {
    var marker = new google.maps.Marker({
      position: feature.position,
      //icon: icons[feature.type],
      map: map
    });
  });
}
