$(document).ready(function() {
  $('.box-2').delay('3000').fadeIn('slow')

  //Imagens
$.each(restaurantes, function (index, restaurante) {
  //$("<img>").attr("src", restaurante.image).addClass(restaurante.name).appendTo("#box-images");
  $("<img>").attr("src", restaurante.image).attr('id', restaurante.name).attr('onClick', 'onClick(this);').addClass(restaurante.type).appendTo("#box-images");
  $(".form-control").focusout(function(){
    var busca = $(this).val();
    //console.log(busca);
  });
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
  zoom: 14,
  center: new google.maps.LatLng(-23.5576364, -46.6644888),
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
