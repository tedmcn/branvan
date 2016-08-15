// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//
//= require turbolinks
//= require_tree .
//
// RailsAjax
//= require jquery.history
//= require jquery.rails-ajax
//= require RailsAjax-Config
function openModal(){
    document.getElementById('modal_custom').style.visibility="visible";
    document.activeElement.blur();
    document.getElementById('modal_custom').focus();
}

function editLocation(){
    alert("!");
}

  var map;
  var geocoder;
  var markers = [];
  var xcoord = document.getElementById('location_xcoord');
  var ycoord = document.getElementById('location_ycoord');
  var name =document.getElementById("location_name");
  var search = document.getElementById("search");
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 42.3765, lng: -71.2356},
      zoom: 12
    });
    
    geocoder = new google.maps.Geocoder();
  
    document.getElementById("search").addEventListener("keydown", codeAddress, false);
    
    map.addListener('click', function(e){
        
        //Grab variables
        var coords = e.latLng.toString().substring(1,e.latLng.toString().length-1);
        var x = coords.split(',')[0];
        var y = coords.split(',')[1];
        
        //
        map.setCenter(e.latLng);
        
        //Set all markers to null
        for (var i=0;i< markers.length; i++){
            markers[i].setMap(null);
        }
        
        //Make the new marker
        var marker= new google.maps.Marker({
            position:e.latLng,
            map:map
        });
        
        xcoord.value=x;
        ycoord.value=y;
        
        markers.push(marker);
        geocoder.geocode( { 'location': e.latLng}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var address = results[0].address_components[0].long_name + " " + results[0].address_components[1].long_name + " " + results[0].address_components[2].long_name + " " + results[0].address_components[3].long_name;
            
            // markers.push(marker);
            google.maps.event.addListener(marker, "dragend", function() {
              document.getElementById('location_name').value= address;
              document.getElementById('search').value= address;
            });
            document.getElementById('location_name').value= address;
            document.getElementById('search').value= address;
          }
        });
    });
    
  }
  
  
  function codeAddress() {
        var address = document.getElementById('location_name').value;
        var search = document.getElementById("search");
        //Set all markers to null
        for (var i=0;i< markers.length; i++){
            markers[i].setMap(null);
        }
        
        geocoder.geocode( { 'address': search.value}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            
            
            var address = results[0].address_components[0].long_name + " " + results[0].address_components[1].long_name + " " + results[0].address_components[2].long_name + " " + results[0].address_components[3].long_name;
            
            google.maps.event.addListener(marker, "dragend", function() {
              document.getElementById('location_xcoord').value = marker.getPosition().lat();
              document.getElementById('location_ycoord').value = marker.getPosition().lng();
              // document.getElementById('location_name').value= address;
            });
            document.getElementById('location_xcoord').value = marker.getPosition().lat();
            document.getElementById('location_ycoord').value = marker.getPosition().lng();
            // document.getElementById('location_name').value= address;

          } else {
            // alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }
  
  
function addToRoute(loc){
  // alert(loc.dataset.id);
  var list =document.getElementById('route_list');
  var children= list.childNodes;
  var exists=false;
  var child;
  
 if(loc.checked==true){
  var tr= document.createElement("tr");
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var input = document.createElement("input");
  
  input.type="text";
  td1.class="mdl-data-table__cell--non-numeric";
  td1.innerHTML=loc.dataset.name;
  td2.innerHTML=children.length-1;
  
  td3.appendChild(input);
  
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  
  
  list.appendChild(tr);
 }else{
   loc.checked=true;
 }

  
}