var google_map;
$(document).ready(function () {
var map_data, Locations, lat, lon, marker, map_zoom, markers = [], getdetails, active;
	$.getJSON("../QB-Locations/json/Qb_details.json", function(getdetails) {

		getdetails = getdetails;
		map_data = getdetails.metaData;
		Locations=getdetails.Details;
		lat= map_data[0].Latitude;
		lon= map_data[0].Longitude;
		map_zoom= map_data[0].Zoom;
				
		google.maps.event.addDomListener(window, 'load', initialize(lat,lon,map_zoom));		

	/* MAP INITIALIZATION FUNCTION */ 

		function initialize(lat,lon,map_zoom) {
			var mapprop = {
		  	  center:new google.maps.LatLng(lat,lon),
			  zoom:map_zoom,
			  maptypeid:google.maps.MapTypeId.ROADMAP
			  };
			// var infowindow = new google.maps.InfoWindow({
			//   content: "",
			//   maxWidth: 50
			// });
			google_map = new google.maps.Map(document.getElementById("google-map"), mapprop);
			setMarkers(google_map,Locations)
		}

		/* ADD MARKERS TO LOCATIONS */

		function setMarkers(map,locations){
			var i, marker;
			for (i = 0; i < Locations.length; i++) {
			    marker = new google.maps.Marker({
					map: google_map,
					position: new google.maps.LatLng(Locations[i].Latitude,Locations[i].Longitude),
					title: "Employee headcount:" + Locations[i].Headcount + ""
				});

				markers.push(marker);
				//  Create a new viewpoint bound
				var bounds = new google.maps.LatLngBounds();
				//  Go through each...
				$.each(markers, function (index, marker) {
					bounds.extend(marker.position);
				});
				//  Fit these bounds to the map
				google_map.fitBounds(bounds);


			    var content = '<div><b>Location</b>: </div>' + Locations[i].Location + " " + '<div><b>Address</b>:</div>' + Locations[i].Address + " " + '<div><b>Headcount</b>:</div>' + Locations[i].Headcount
			  	var infowindow = new google.maps.InfoWindow({
					content: "",
					maxWidth: 200
				});

				google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
				    return function() {
				       if(active!=null)
				       		active.close();
				       infowindow.setContent(content);
				       infowindow.setZIndex(6);
				       infowindow.open(google_map,marker);
				       active = infowindow;
				    };
				})(marker,content,infowindow));
			       
			}		
		}
	
	});
			
});	
