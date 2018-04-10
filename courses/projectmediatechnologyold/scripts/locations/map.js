// JavaScript



// ---------- Global Variables ----------
var flickrKey = "a8b15d9caa6cefd1482aa5e1cff3cbe6";					// Flickr API key
var flickrUri = "https://api.flickr.com/services/rest/?api_key=" + flickrKey;

var flickrImgElem;													// Reference to element there images are shown
var mapLocationElem;												// Element for showing the koordinates
var myMap;															// Object for the map
var myMarkers;														// Array with markers
var userMarker;														// Object for marking where the user clicks
var markerData = [													// Data for markers related to the buttons
			{ position: { lat: 56.883612, lng: 14.806500 }, title: "Växjö" },
			{ position: { lat: 56.665577, lng: 16.356995 }, title: "Kalmar" },
			{ position: { lat: 57.190868, lng: 16.952472 }, title: "Hornsjön" },
			{ position: { lat: 56.626561, lng: 14.651901 }, title: "Åsnen" },
			{ position: { lat: 56.733120, lng: 15.123238 }, title: "Rottnen" },
	];
var tags;
var onlineLocations = [];
var nrOfEventLocations;



// ---------- Initialization ----------
function init() {   // Initialization of the program
	
	// Request SMAPI to retrieve more locations and events, then wait before moving on
	requestMoreLocations("&controller=event&method=getAll");
	requestMoreLocations("&controller=location&method=getAll");
	window.setTimeout(continueInit, 2000);
	
} // End init
addListener(window, "pageshow", init);									// Call initialization when finished loading page

function continueInit() {   // The actual initialization of the program
	
	// Local variables and setup
	var i;
	addNewMarkerBtns();
	myMarkers = [];
	var addrBtnElems = document.getElementById("addrBtns").getElementsByTagName("button");
	
	for (i=0; i<onlineLocations.length; i++)														// Go through every  additional location and event and store their coordinates and names in a set
		markerData.push( { position: { lat: parseInt(onlineLocations[i][0]), lng: parseInt(onlineLocations[i][1]) }, title: onlineLocations[i][2] } );
	
	initMap();
	
	// Define parts of the HTML document
	mapLocationElem = document.getElementById("mapLocation");
	flickrImgElem = document.getElementById("flickrImg");
	
	// Address Buttons
	for (i=0; i<markerData.length; i++) {															// Link each stored set of coordinates and names to a button
		addrBtnElems[i].innerHTML = markerData[i].title;
		addListener(addrBtnElems[i], "click", showAddrMarker);										// Make the buttons clickable to present the marker
		addrBtnElems[i].setAttribute("data-ix", i);
	}
	
	if (sessionStorage.getItem("lat") !== null && sessionStorage.getItem("lng") !== null)
		showSessionStorageMarker(sessionStorage.getItem("lat"), sessionStorage.getItem("lng"));
	
} // End continueInit



// ---------- Functions ----------
function initMap() {   // Create a map and markers
	
	// Local variables
	var newMarker;																					// Object for marking
	
	// Create a new Map
	myMap = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 56.925729, lng: 15.322607 },
		zoom: 8,
		styles: [																					// Turn off points of interest, bus stations and so on
			{ featureType: "poi", stylers: [ { visibility:"off" } ] },
			{ featureType: "transit.station", stylers: [ { visibility:"off" } ] }
		]
	});
	
	// Markers
	for (var i=0; i<markerData.length; i++) {														// Define a new marker for each set of stored coordinates and names
		newMarker = new google.maps.Marker(markerData[i]);
		myMarkers.push(newMarker);
	}
	userMarker = new google.maps.Marker();															// Define the user marker
	google.maps.event.addListener(myMap, "click", showUserMarker);									// Make it possible to set an user marker when clicking on the map
	
} // End initMap

function showSessionStorageMarker(lat, lng) {   // Set position of the marker which was stored in the session storage
	
	hideMarkers();																					// Hide the current marker first
	userMarker.setPosition(new google.maps.LatLng(lat, lng));										// Convert the coordinates to be usable for google maps
	userMarker.setMap(myMap);																		// Place the marker on the map
	mapLocationElem.innerHTML = "Latitud: " + lat + " - Longitud: " + lng;							// Show the coordinates as text
	requestImgsByLocation(lat, lng);																// Request some images related to the coordinates
	
} // End show SessionStorageMarker

function showUserMarker(e) {   // Set position of the marker where the user clicked and place it on the map
	
	hideMarkers();																					// Hide the current marker first
	userMarker.setPosition(e.latLng);																// Convert the coordinates to be usable for google maps
	userMarker.setMap(myMap);																		// Place the marker on the map
	mapLocationElem.innerHTML = "Latitud: " + e.latLng.lat() + " - Longitud: " + e.latLng.lng();	// Show the coordinates as text
	requestImgsByLocation(e.latLng.lat(), e.latLng.lng());											// Request some images related to the coordinates
	
} // End showUserMarker

function showAddrMarker() {   // Show marker for the address-button the user clicked on
	
	hideMarkers();																					// Hide each marker, including the user marker
	myMarkers[this.getAttribute("data-ix")].setMap(myMap);											// Place the user marker on the clicked location
	
} // End showAddrMarker

function hideMarkers() {   // Hide all markers
	
	// Hide each marker, hide the user marker and remove the current coordinates from the page
	for (var i=0; i<myMarkers.length; i++)
		myMarkers[i].setMap(null);
	userMarker.setMap(null);
	mapLocationElem.innerHTML = "";
	
} // End hideMarkers



// ---------- Flickr Photo's ----------
function requestImgsByLocation(lat, lon) {   // AJAX-request of new images
	
	// Local variables
	var request;													// Object for AJAX-call
	
	// Initialize AJAX
	if (XMLHttpRequest)												// Check first for XML HTTP support
		request = new XMLHttpRequest();
	else if (ActiveXObject)											// If not, try Active X Object support						
		request = new ActiveXObject("Microsoft.XMLHTTP");
	else {															// Otherwise AJAX is not supported, return an empty value
		alert("Sorry, no support for AJAX, the data could not be read.");
		return null;
	}	
	
	// Run AJAX
    tags = "fish, lake, fishing, boat";
	request.open("GET", flickrUri + "&method=flickr.photos.search&format=json&nojsoncallback=1&per_page=3&page=1&tags=" + tags + "&lat=" + lat + "&lon=" + lon, true);
	request.send(null);												// Send request to the server
	request.onreadystatechange = function () {						// Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4 && request.status == 200)
			showMoreImgs(request.responseText);
	};
	
} // End requestImgsByLocation

function showMoreImgs(response) {   // Interpret the answer and show the images
	
	// Local variables
	var photo;														// A photo in the answer
	var imgUrl;														// URL address to a image
	response = JSON.parse(response);
	flickrImgElem.innerHTML = "";
	
	// Interpret JSON
	for (var i=0; i<response.photos.photo.length; i++) {
		photo = response.photos.photo[i];
		imgUrl = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_s.jpg";
		newElem = document.createElement("img");
		newElem.setAttribute("src", imgUrl);
		newElem.setAttribute("data-photo", JSON.stringify(photo));
		flickrImgElem.appendChild(newElem);
	}
	
} // End showMoreImgs



// ---------- Get More Locations Through 1ME302 Server ----------
function requestMoreLocations(controller) {
		
		// Constant variables for the use of SMAPI and local variables
		var request;												// Object for AJAX-call
		var smapiUri = "https://cactuar.lnu.se/course/1me302/";
		var smapiKey = "?key=MUq38eBy";
		
		// Initialize AJAX
		if (XMLHttpRequest)
			request = new XMLHttpRequest();							// Different objects (XMLHttpRequest or ActiveXObject), depending on browser
		else if (ActiveXObject)
			request = new ActiveXObject("Microsoft.XMLHTTP");
		else {
			alert("Tyvärr inget stöd för AJAX, så listan kan inte läsas in");
			return false;
		}
		
		// Run AJAX
        request.open("GET", smapiUri + smapiKey + controller, true);
		request.send(null);											                            // Send request to the server
		request.onreadystatechange = function () {					                            // Function to check status in the communication
            if (request.readyState == 4 && request.status == 200) {								// When communication is ready readyState is 4 and if file exists status is 200 (OK), if OK then interpret data from read file 
				if (controller.indexOf("event") >= 0)
					requestSmapiEventLocations(JSON.parse(request.responseText));				// Get the events from SMAPI when called for
				else if (controller.indexOf("location") >= 0)
					requestSmapiLocations(JSON.parse(request.responseText));					// Get the locations from SMAPI when called for
			}
		};
		
} // End requestMoreLocations

function requestSmapiEventLocations(json) {   // Requesting the cooridnates and names of events from SMAPI
	
	// Go through each retrieved item, filter it and add it to the an array if within the proper filters
	for (var i=0; i<json.payload.length; i++)
		if (json.payload[i].title.indexOf("fisk") >= 0 ||										// Check if the event is related to fishing, if not delete it
			json.payload[i].title.indexOf("fish") >= 0 ||
			json.payload[i].description.indexOf("fisk") >= 0 ||
			json.payload[i].description.indexOf("fish") >= 0)
				onlineLocations.push([json.payload[i].latitude, json.payload[i].longitude, json.payload[i].title]);
	
	// We just want to know how many of the additional locations are events
	nrOfEventLocations = onlineLocations.length;
	
} // End requestSmapiEventLocatiosn

function requestSmapiLocations(json) {   // Requesting the coordinates and names of locations from SMAPI
	
	// Go through each retrieved item, filter it and add it to the an array if within the proper filters
	for (var i=0; i<json.payload.length; i++) {
		if (json.payload[i].name.indexOf("fisk") >= 0 || json.payload[i].name.indexOf("fish") >= 0)
			onlineLocations.push([json.payload[i].latitude, json.payload[i].longitude, json.payload[i].name]);
		else if (json.payload[i].description.indexOf("fisk") >= 0 || json.payload[i].description.indexOf("fish") >= 0)
			onlineLocations.push([json.payload[i].latitude, json.payload[i].longitude, json.payload[i].name]);
		else if (json.payload[i].website !== null)
			if (json.payload[i].website.indexOf("fisk") >= 0 || json.payload[i].website.indexOf("fish") >= 0)
				onlineLocations.push([json.payload[i].latitude, json.payload[i].longitude, json.payload[i].name]);
	}
	
} // End requestSmapiLocations

function addNewMarkerBtns() {   // Add additional buttons for the additional found sets of coordinates and names
	
	// Local variables
	var addrBtns = document.getElementById("addrBtns");
	var newElem, newText;
	
	// Setup HTML elements to be injected
	newElem = document.createElement("h3");
	newText = document.createTextNode("Online Database: Events");
	newElem.appendChild(newText);
	addrBtns.appendChild(newElem);
	
	// Go through each additional location and event
	for (var i=0; i<onlineLocations.length; i++) {
		if (i ==nrOfEventLocations) {							// We just want to know when the locations starts and the events are concluded, separate that with a header
			newElem = document.createElement("h3");
			newText = document.createTextNode("Online Database: Other Locations");
			newElem.appendChild(newText);
			addrBtns.appendChild(newElem);
		}
		// Create a new button for each additional location and event and inject it
		newElem = document.createElement("button");
		newElem.setAttribute("type", "button");
		addrBtns.appendChild(newElem);
	}
	return addrBtns;										// Send back the new and extended list of map buttons
	
} // End addNewMarkerBtns

