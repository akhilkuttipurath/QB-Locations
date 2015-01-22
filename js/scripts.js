var google_map;
$(document).ready(function () {

			$.getJSON("../QB-Locations/json/Qb_details.json", function(getdetails) {
				
				var map_data = getdetails.metaData;
				var Locations=getdetails.Details;

				var lat= map_data[0].Latitude;
				var lon= map_data[0].Longitude;
				var map_zoom= map_data[0].Zoom;
				var markers = [];

				
				

				google.maps.event.addDomListener(window, 'load', initialize(lat,lon,map_zoom, getdetails));



		
		/* ADD MARKERS TO LOCATIONS */
				var i;
				for (i = 0; i < Locations.length; i++) {                      
				        var marker = new google.maps.Marker({
					        map: google_map,
					        title: 'Hello World!',
					        position: new google.maps.LatLng(Locations[i].Latitude,Locations[i].Longitude)
				        });
				        markers[i].push(marker);
				  }

			});

		/*ONCLICK EVENT TO MARKER*/


			

		/* MAP INITIALIZATION FUNCTION */ 

			function initialize(lat,lon,map_zoom, getdetails) {

					  var mapProp = {
					    center:new google.maps.LatLng(lat,lon),
					    zoom:map_zoom,
					    mapTypeId:google.maps.MapTypeId.ROADMAP
					  };

					  google_map = new google.maps.Map(document.getElementById("google-map"), mapProp);
					}			

});