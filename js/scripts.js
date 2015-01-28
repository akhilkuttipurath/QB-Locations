var google_map;
$(document).ready(function () {
var map_data, Locations, lat, lon, marker, map_zoom, markers = [], getdetails;
			$.getJSON("../QB-Locations/json/Qb_details.json", function(getdetails) {
				getdetails = getdetails;
				map_data = getdetails.metaData;
				Locations=getdetails.Details;

				lat= map_data[0].Latitude;
				lon= map_data[0].Longitude;
				map_zoom= map_data[0].Zoom;


				var mapProp = {
				    center:new google.maps.LatLng(lat,lon),
				    zoom:map_zoom,
				    mapTypeId:google.maps.MapTypeId.ROADMAP
				  };

				  google_map = new google.maps.Map(document.getElementById("google-map"), mapProp);
				  google_map.setZoom(map_zoom);

				/* ADD MARKERS TO LOCATIONS */
				for (var i = 0; i < Locations.length; i++) {

				         marker = new google.maps.Marker({
					        map: google_map,
					        position: new google.maps.LatLng(Locations[i].Latitude,Locations[i].Longitude),
					        title: toString(Locations[i].Headcount)
				        });

				        markers.push(marker);

						/* ON MOUSEOVER EVENT TO MARKER */				
						var infowindow = new google.maps.InfoWindow();
						
						google.maps.event.addListener(marker, 'mouseover', function() {
							infowindow.setContent("Headcount");
						  	infowindow.open(google_map, this);
					  	});
					  	google.maps.event.addListener(marker, 'mouseout', function() {
							
						  	infowindow.close(google_map, this);
					  	});
						
				}

				//  Create a new viewpoint bound
				var bounds = new google.maps.LatLngBounds();
				//  Go through each...
				$.each(markers, function (index, marker) {
					bounds.extend(marker.position);
				});
				//  Fit these bounds to the map
				google_map.fitBounds(bounds);

			});


});