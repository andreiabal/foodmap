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
  $('#main-content').fadeIn('slow')
}

function showRestaurants(restaurantsArray) {
  $('#box-images').html('');

  $.each(restaurantsArray, function (index, restaurant) {
    $('<img>')
      .attr('src', restaurant.image)
      .attr('id', restaurant.name)
      .on('click', openModal)
      .addClass(restaurant.type)
      .appendTo('#box-images');
  })
}

function openModal(event) {
  const restaurantName = $(event.target).attr('id');

  const restaurantData = 
    $(restaurantes).filter(function (index, restaurant) {
      if (restaurantName === restaurant.name) {
        return true;
      } else {
        return false; 
      }
    })[0];

  $('#restaurant-modal-name').text(restaurantData.name);
  $('#restaurant-modal-type').text(restaurantData.type);
  $('#restaurant-modal-description').text(restaurantData.description);
  $('#restaurant-modal-image').attr('src', restaurantData.image);
  
  $('#restaurant-modal').modal('show');

  $('.form-control').val('');

  showRestaurants(restaurantes);

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
