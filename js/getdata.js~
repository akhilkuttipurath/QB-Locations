$(document).ready(function() {
	
	$.getJSON("../QB-Locations/json/Qb_details.json",function(getdetails) {
		
			var row = $("<tr />");
			var header= getdetails.tableHeader;
			$("#table").append(row);
			row.append($("<th>" + header[0].header1 + "</th>"));
			console.log(header[0].header1);
			row.append($("<th>" + header[1].header2 + "</th>"));
			row.append($("<th>" + header[2].header3 + "</th>"));
		
		$.each(getdetails.Details, function(key, value) {
			var row= $("<tr />");
			$("#table").append(row);
			row.append($("<td>" + value.Location + "</td>"));
			row.append($("<td>" + value.Address + "</td>"));
			row.append($("<td>" + value.Headcount + "</td>"));
		});
	});
});
