var google_map;
$(document).ready(function () {
var map_data, Locations, lat, lon, marker, map_zoom, markers = [], getdetails, active;
infoWindow  = new google.maps.InfoWindow();
     //Data table
	$.ajax({
		    type: 'GET',
		    dataType: "json",
		    url: 'json/Qb_details.json',
		    data: '',
		    success: function(response) {
		      $("#table").html('').append("<thead></thead><tbody></tbody>");
		      var header= response.tableHeader;
		      console.log(header[0].header1);
		        
		      var head = "<tr><th>" + header[0].header1 + "</th><th>" + header[1].header2 + "</th><th>" + header[2].header3 + "</th></tr>";
		      $("#table > thead").append(head);
		          
		      $.each(response.Details, function(key, value) {
		             var tblRow = "<tr><td>" + value.Location + "</td><td>" + value.Address+ "</td><td>" + value.Headcount + "</td></tr>";
		            $("#table > tbody").append(tblRow);
		       });

		    },
		    complete: function(response) {
		      // initializeDatatables('table');
		      $('#table').dataTable({
		        "aLengthMenu": [[3, 5, 7,-1], [3, 5, 7, "All"]],
		        "iDisplayLength": -1
		       });
		    }
	});
	$.getJSON("../QB-Locations/json/Qb_details.json", function(getdetails) {

		// getdetails = getdetails;
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
			  maptypeid:google.maps.MapTypeId.ROADMAP,
			  minZoom:2
			  };
			google_map = new google.maps.Map(document.getElementById("google-map"), mapprop);
			visiblerows();	
		}

		/* ADD MARKERS TO LOCATIONS */

		
		/**********Pie chart**********/
		
      function drawVisualization() {

      }
		google.load('visualization', '1', {"callback" : drawVisualization, 'packages': ['table']});
	});

	function visiblerows()
			{

				var oTable = $("#table").dataTable();
				var rows = [];
				var currentMarkers = [];
				rows = oTable._('tr', {"filter":"applied"});
				console.log(rows);
				var p= rows.length;

				$('#table_filter input').keyup(function() {
					 currentMarkers= $("#table").dataTable()._('tr', {"filter":"applied"});
					 
					 function removeMarkers(){
					    for(i=0; i<markers.length; i++){
					        markers[i].setMap(null);
					    }

					}
					removeMarkers();
					setMarkers(google_map,Locations,currentMarkers);

				})
				setMarkers(google_map,Locations,rows);
				
				function drawChart(marker, locations,n, content) {

			        // Create the data table.
			        var data = new google.visualization.DataTable();
			        data.addColumn('string', 'Gender');
			        data.addColumn('number', 'Headcount');
			        
			        data.addRows([
			          ['Male', locations[n].Male],
			          ['Female', locations[n].Female]
			        ]);
			    	
			        // Set chart options
			        var options = {'title': content+"\n\n"+'Headcount',
			                       'width':400,
			                       'height':250};
			                       
			        var node        = document.createElement('div'),
			            // infoWindow  = new google.maps.InfoWindow(),
			            chart       = new google.visualization.PieChart(node);
			            
			            chart.draw(data, options);
			            infoWindow.setContent(node);
			            infoWindow.open(google_map,marker);
			            active = infowindow;
     			}


				function setMarkers(map,locations,rows){
					var i, marker;
					var rlen=rows.length;
					var len=Locations.length;
					for(var n=0; n< rlen;n++){
							
							for (i = 0; i < len ; i++) {

						

								if(locations[i].Location == (rows[n])[0]) {

										    marker = new google.maps.Marker({
												map: google_map,
												position: new google.maps.LatLng(Locations[i].Latitude,Locations[i].Longitude),
												title: "Employee headcount:" + Locations[i].Headcount + "",
												icon: new google.maps.MarkerImage('./images/blue.png', null, null, null, new google.maps.Size(35, 40))
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


										    // var content = '<div><b>Location</b>: </div>' + Locations[i].Location + " " + '<div><b>Address</b>:</div>' + Locations[i].Address + " " + '<div><b>Headcount</b>:</div>' + Locations[i].Headcount
										  	var infowindow = new google.maps.InfoWindow({
												content: "",
												maxWidth: 200
											});
											var content = "Location: "+ Locations[i].Location+"\n"+"Address: "+ Locations[i].Address +"\n" + "Headcount: " + Locations[i].Headcount;

											google.maps.event.addListener(marker,'click', (function(marker,content,infowindow,i){ 
											    return function() {
											       if(active!=null)
														active.close();
											       
											       
											       drawChart(this,Locations,i, content);

											    };
											})(marker,content,infowindow,i));
								}
							}
					       
					}	

			
				}

			
	// 			var anNodes = $("#table tbody tr");
				 
	// 			for (var i = 0; i < anNodes.length; ++i)
	// 			{
	// 			    var rowData = oTable.fnGetData( anNodes[i] );
	// 			 console.log(rowData);
				 
	// }

			}		
			
});	

