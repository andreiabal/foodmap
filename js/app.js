// O mapa é iniciado pelo callback do carregamento do Google Maps
function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: new google.maps.LatLng(-23.5576364, -46.6644888),
    mapTypeId: 'roadmap'
  });

  const features = restaurantes.map(function(r){
    return {
      position: new google.maps.LatLng(r.latitude, r.longitude),
      type: 'info'
    }
  });

  // Marcadores
  features.forEach(function(feature) {
    new google.maps.Marker({
      position: feature.position,
      map: map
    });
  });
}

function hideSplashScreen() {
  $('#main-content').delay('2000').fadeIn('slow')
}

function showRestaurants(restaurantsArray) {
  $.each(restaurantsArray, function (index, restaurant) {
    $('<img>')
      .attr('src', restaurant.image)
      .attr('id', restaurant.name)
      .attr('onClick', 'openModal')
      .addClass(restaurant.type)
      .appendTo('#box-images');
  })
}

function initialiseSearchInput() {
  $('.form-control').keyup(function() {
    const search = $(this).val().toLowerCase();

    // Mesma coisa que:
    //
    // const filteredRestaurants = []
    // for (let i = 0; i < restaurantes.length) {
    //   if (restaurantes[i].name === search) {
    //     filteredRestaurants.push(restaurantes[i]);
    //   }
    // }
    const filteredRestaurants = 
      $(restaurantes).filter(function (index, restaurant) { 
        // Quando a busca for vazia, mostro todos os restaurantes
        if (search === '') { 
          return true;
        }

        if (restaurant.type.toLowerCase() === search) {
          return true;
        } else {
          return false;
        }
      })

    $('#box-images').html('');

    showRestaurants(filteredRestaurants);
  });
}

// Inicialização da aplicação
$(document).ready(function() {
  hideSplashScreen();
  showRestaurants(restaurantes);
  initialiseSearchInput();
});
