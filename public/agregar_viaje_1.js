/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: new google.maps.LatLng(35.137879, -82.836914),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var myMarker = new google.maps.Marker({
        position: new google.maps.LatLng(47.651968, 9.478485),
        draggable: true
    });

    Getcoordenadas(myMarker);

    map.setCenter(myMarker.position);
    myMarker.setMap(map);
                
    }

function Getcoordenadas(markerobject){
    google.maps.event.addListener(markerobject, 'dragend', function(evt){
        console.log(evt.latLng.lng().toFixed(3));
        console.log(evt.latLng.lat().toFixed(3));
    });

    google.maps.event.addListener(markerobject, 'drag', function(evt){
        console.log("marker is being dragged");
    });     
}