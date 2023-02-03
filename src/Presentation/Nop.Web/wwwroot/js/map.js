//(function () {
//    "use strict";

//    // Google Map api v3 - Map for contact pages
//    if ( document.getElementById("map") && typeof google === "object" ) {
//        var content = '<address>' +
//                            '123 Street Name, City,<br>' +
//                            '1001 United States<br>'+
//                            '<a href="#">Get Directions <i class="icon-angle-right"></i></a>'+
//                        '</address>';

//        var map = new google.maps.Map(document.getElementById('map'), {
//            zoom: 15,
//            center: new google.maps.LatLng(-34.398, 150.884), // Map Center coordinates
//            scrollwheel: false,
//            mapTypeId: google.maps.MapTypeId.ROADMAP,
//            styles: [{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#d3d3d3"}]},{"featureType":"transit","stylers":[{"color":"#808080"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#b3b3b3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":1.8}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#d7d7d7"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ebebeb"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#a7a7a7"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#efefef"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#696969"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#737373"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#d6d6d6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#dadada"}]}]

//        });

//        var infowindow = new google.maps.InfoWindow({
//            content: content,
//            maxWidth: 360
//        });

//        var marker;
//        marker = new google.maps.Marker({
//            position: new google.maps.LatLng(-34.398, 150.884),
//            map: map,
//            animation: google.maps.Animation.DROP
//        });

//        google.maps.event.addListener(marker, 'click', (function (marker) {
//            return function() {
//              infowindow.open(map, marker);
//            }
//        })(marker));
//    }
//})();





$(document).ready(function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }

 









  var locations;
  function showPosition(position) {
    console.log(position);
    locations = position


    var itemLocality;
    var geocoder = new google.maps.Geocoder();
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
   


    $.ajax({

      url: '/product/CheckServices/',
      type: 'GET',

      dataType: 'json',
      success: function (result) {
        callback(result);
      },
      error: function (request, message, error) {
        handleException(request, message, error);
      }
    });



    function calcDistance(p1, p2) {
      return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
    }
    var locationsAvaliable;
    var listOfLatLng = []
    function callback(response) {
      locationsAvaliable = response;
      console.log(locationsAvaliable);

      if (locationsAvaliable != null) {
        for (var i = 0; i < locationsAvaliable.length; i++) {
          var p1 = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          /*  console.log(p1);*/
          var p2 = new google.maps.LatLng(locationsAvaliable[i].lat, locationsAvaliable[i].lng);
          /* console.log(p2);*/
          var distance = calcDistance(p1, p2) * 1000;
          console.log(distance);
          console.log(distance < 2000);
          if (distance < 2000) {
            var lats = locationsAvaliable[i].lat
            var lngs = locationsAvaliable[i].lng
            var vendorId = locationsAvaliable[i].vendorId
            listOfLatLng.push({ lat: lats, lng: lngs, vendorId: vendorId });



          }
        }
        


      }
      dataCall(listOfLatLng)
    }




    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({ latLng: latlng }, function (results, status) {

      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          var arrAddress = results;
          console.log(results);
          $.each(arrAddress, function (i, address_component) {
            if (address_component.types[0] == "locality") {
              console.log("City: " + address_component.address_components[0].long_name);
              itemLocality = address_component.address_components[0].long_name;
              //document.getElementById("CityName").value = itemLocality;
              console.log(itemLocality)

            }
          });
        }
      }
    })
  }


  var newDataLatLng;
  function dataCall(response) {
    newDataLatLng = response
    
    //window.localStorage.setItem("newDataLatLng", JSON.stringify( newDataLatLng))
    //let newObject = window.localStorage.getItem("newDataLatLng");
    //console.log(JSON.parse(newObject));
    window.sessionStorage.setItem("newDataLatLng", JSON.stringify(newDataLatLng))
 


 

  
  }

 

  
  

});






