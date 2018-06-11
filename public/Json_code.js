/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

  function loadFile() {
    var input, file, fr;

    if (typeof window.FileReader !== 'function') {
      alert("The file API isn't supported on this browser yet.");
      return;
    }

    input = document.getElementById('fileinput');
    if (!input) {
      alert("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
      alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
      alert("Please select a file before clicking 'Load'");
    }
    else {
      file = input.files[0];
      fr = new FileReader();
      fr.onload = receivedText;
      fr.readAsText(file);
    }

    function receivedText(e) {
        let lines = e.target.result;
        var archivoJSONArr = JSON.parse(lines); 
        var strInformacionAdicional;   
        var myLatLng = {lat: 0, lng: 0};
        
        var mapOptions = {
              zoom: 2,
              center: myLatLng
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        var markers = [];
        
        for (y in archivoJSONArr.viajes){           
            var strTag = "";
            for(i = 0; archivoJSONArr.viajes[y].tags.length > i; i++){
                strTag = strTag + archivoJSONArr.viajes[y].tags[i] + ", ";
            }  
            
            var strInformacionAdicional = "";

            for (i in archivoJSONArr.viajes[y].informacionAdicional) {
                strInformacionAdicional += "<br>"+ "<b>"+archivoJSONArr.viajes[y].informacionAdicional[i].name+"</b>" + ": <br>";
                for (j in archivoJSONArr.viajes[y].informacionAdicional[i].valor) {
                    strInformacionAdicional += archivoJSONArr.viajes[y].informacionAdicional[i].valor[j] + " ";
                }
            }
            /*------------------------------------------------*/     
            
            var myLatlng = new google.maps.LatLng(parseInt(archivoJSONArr.viajes[y].latitud),parseInt(archivoJSONArr.viajes[y].longitud));           
            var marker = new google.maps.Marker({
                position: myLatlng,
                title: archivoJSONArr.viajes[y].lugar
            });

            var contentString = 
                '<div id="content">'+
                '<div id="siteNotice">'+
                '</div>'+
                '<h1 id="firstHeading" class="firstHeading">'+archivoJSONArr.viajes[y].lugar +'</h1>'+
                '<div id="bodyContent">'+
                '<p> <b>Fechas: </b>, ' + archivoJSONArr.viajes[y].fechaLlegada +'/' + archivoJSONArr.viajes[y].fechaPartida + '<br>' +
                '<b>Tags: </b>' + strTag + '<br>' +
                '<b>Informacion adicional: </b>' + strInformacionAdicional + '<br>' +
                '</div>'+
                '</div>';
                                                       
            marker.setMap(map); 
            
            markers.push(marker);
            markers[y].infowindow = new google.maps.InfoWindow({
                content: contentString
            });                                      
        }
        for (var i = 0; i < markers.length; i++) {
        google.maps.event.addListener(markers[i], 'click', function() {
          this.infowindow.open(map, this);
        });


    }
  }          
}