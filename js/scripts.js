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

      function drawVisualization() {

      }
		google.load('visualization', '1', {"callback" : drawVisualization, 'packages': ['table']});

	});

	function removeMarkers(){
					    for(i=0; i<markers.length; i++){
					        markers[i].setMap(null);
					    }

					}

	function visiblerows()
			{

				var oTable = $("#table").dataTable();
				var rows = [];
				var currentMarkers = [];
				rows = oTable.fnGetData();
				console.log(rows);
				

				$('#table_filter input').keyup(function() {
					 currentMarkers= $("#table").dataTable()._('tr', {"filter":"applied"});
					removeMarkers();
					setMarkers(google_map,Locations,currentMarkers);
					console.log(currentMarkers);

				});
				$('#table_length select').change(function(){
					iDisplayStart=$('#table').dataTable().fnSettings()._iDisplayStart;
					iDisplayLength=$('#table').dataTable().fnSettings()._iDisplayLength;				
					filter = $("#table").dataTable()._('tr', {"filter":"applied"});
					var currentMarkers = Array.prototype.slice.call(filter, iDisplayStart, iDisplayLength);
					removeMarkers();
					setMarkers(google_map,Locations,currentMarkers);
				});
				$('#table_previous').on("click",function(){
					iDisplayStart=$('#table').dataTable().fnSettings()._iDisplayStart;
					iDisplayLength=$('#table').dataTable().fnSettings()._iDisplayLength;
					filter = $("#table").dataTable()._('tr', {"filter":"applied"});
					var currentMarkers = Array.prototype.slice.call(filter, iDisplayStart, iDisplayStart + iDisplayLength);
					removeMarkers();
					setMarkers(google_map,Locations,currentMarkers);
				});
				$('#table_next').on("click",function(){
					iDisplayStart=$('#table').dataTable().fnSettings()._iDisplayStart;
					iDisplayLength=$('#table').dataTable().fnSettings()._iDisplayLength;
					filter = $("#table").dataTable()._('tr', {"filter":"applied"});
					var currentMarkers = Array.prototype.slice.call(filter, iDisplayStart, iDisplayStart + iDisplayLength);
					removeMarkers();
					setMarkers(google_map,Locations,currentMarkers);
				});
				setMarkers(google_map,Locations,rows);
			}
			// function select(){
			// 	$('#table_length select').change(function(){
			// 		var i,j;
			// 		var table = $('#table').dataTable();
  	// 				var hidden_nodes = table.fnGetHiddenNodes();
  	// 				var allrows = table.fnGetNodes();
  	// 				var hidden_len = hidden_nodes.length;
  	// 				var allrows_len = allrows.length;
  	// 				var Array_hidden = [];
  	// 				var Array_rows = [];
  	// 				var Visible_rows = [];
  
  	// 				for(j=0; j< hidden_len; j++)
  	// 				{
  	// 				   Array_hidden [j] = [
  	// 						$(hidden_nodes[j]).find('td').eq(0).html(),
  	// 						$(hidden_nodes[j]).find('td').eq(1).html(),
  	// 						$(hidden_nodes[j]).find('td').eq(2).html()
  	// 					]
  	// 				}
  	// 				for(i=0; i< allrows_len; i++)
  	// 				{
  	// 				    Array_rows [i] = [
  	// 						$(allrows[i]).find('td').eq(0).html(),
  	// 						$(allrows[i]).find('td').eq(1).html(),
  	// 						$(allrows[i]).find('td').eq(2).html()
  	// 					]
  	// 				}
  	// 				var diff = [];	
			// 		var visible=arr_diff(Array_hidden,Array_rows);
			// 		for(i=0; i < visible.length ; i++)
  	// 				{
  	// 				    Visible_rows [i] = [
  	// 						$(visible[i]).html().eq(0)=visible[i],
  	// 						$(visible[i]).html().eq(1)=visible[i],
  	// 						$(visible[i]).html().eq(2)=visible[i]
  							
  	// 					]
  	// 				}
  	// 				console.log(Visible_rows);
  	// 			});
  					
  	// 		}
  	// 			function arr_diff(a1, a2)
			// 		{
			// 		  var a=[], diff=[];
			// 		  for(var i=0;i<a1.length;i++)
			// 		    a[a1[i]]=true;
			// 		  for(var i=0;i<a2.length;i++)
			// 		    if(a[a2[i]]) delete a[a2[i]];
			// 		    else a[a2[i]]=true;
			// 		  for(var k in a)
			// 		    diff.push(k);
			// 			// removeMarkers();
			// 			// setMarkers(google_map,Locations,diff);
			// 			return diff;
					  
			// 		}
			// 	function toArray(obj) {
			// 	  var array = [];
			// 	  // iterate backwards ensuring that length is an UInt32
			// 	  for (var i = obj.length >>> 0; i--;) { 
			// 	    array[i] = obj[i];
			// 	  }
			// 	  return array;
			// 	}
				
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
					console.log(rlen);
					var len=Locations.length;
					for(var n=0; n < rlen;n++){
							
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
												maxWidth: 200,
												zIndex:5
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
					
		jQuery.fn.dataTableExt.oApi.fnGetHiddenNodes = function ( settings )
		{
			var nodes;
    		var display = jQuery('tbody tr', settings.nTable);
    		 if ( jQuery.fn.dataTable.versionCheck ) {
        		// DataTables 1.10
        		var api = new jQuery.fn.dataTable.Api( settings );
        		nodes = api.rows().nodes().toArray();
    		}
    		else {
        		// 1.9-
        		nodes = this.oApi._fnGetTrNodes( settings );
    		}
 
    		/* Remove nodes which are being displayed */
    		for ( var i=0 ; i<display.length ; i++ ) {
        		var iIndex = jQuery.inArray( display[i], nodes );
 
        		if ( iIndex != -1 ) {
        		    nodes.splice( iIndex, 1 );
       		    }
    		}
 
         return nodes;
		};

});	

