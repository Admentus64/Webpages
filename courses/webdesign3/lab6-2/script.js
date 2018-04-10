// JavaScript



// ---------- Global Variables ----------
var myApiKey = "a8b15d9caa6cefd1482aa5e1cff3cbe6";					// Replace xxx-xxx with your own Flickr API key
var flickrImgElem;													// Reference to element there images are shown
var mapLocationElem;												// Element for showing the koordinates
var myMap;															// Object for the map
var myMarkers;														// Array with markers
var userMarker;														// Object for marking where the user clicks
var markerData = [													// Data for markers related to the buttons
			{ position: { lat: 56.876844, lng: 14.806901 }, title: "Länstrafiken Kronoberg" },
			{ position: { lat: 56.877391, lng: 14.812248 }, title: "Växjö domkyrka" },
			{ position: { lat: 56.872423, lng: 14.816166 }, title: "Medley Växjö simhall & Aqua Mera" },
			{ position: { lat: 56.880413, lng: 14.803864 }, title: "Växjö Konserthus" },
			{ position: { lat: 56.877421, lng: 14.801667 }, title: "Tegnérkyrkogården" },
	];



// ---------- Initialization ----------
function init() {   // Initialization of the program
	
	// Variables
	myMarkers = [];
	var addrBtnElems = document.getElementById("addrBtns").getElementsByTagName("button");
	
	initMap();
	
	// Document
	mapLocationElem = document.getElementById("mapLocation");
	flickrImgElem = document.getElementById("flickrImg");
	
	// Address Buttons
	for (var i=0; i<markerData.length; i++) {
		addrBtnElems[i].innerHTML = markerData[i].title;
		addListener(addrBtnElems[i], "click", showAddrMarker);
		addrBtnElems[i].setAttribute("data-ix", i);
	}
	
} // End init
addListener(window, "load", init);									// Call initialization when finished loading page



// ---------- Functions ----------
function initMap() {   // Create a map and markers
	
	//Variables
	var newMarker;													// Object for marking
	
	// Map
	myMap = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 56.877665, lng: 14.804517 },
		zoom: 14,
		styles: [													// Turn off points of interest, bus stations and so on
			{ featureType: "poi", stylers: [ { visibility:"off" } ] },
			{ featureType: "transit.station", stylers: [ { visibility:"off" } ] }
		]
	});
	
	// Markers
	for (var i=0; i<markerData.length; i++) {
		newMarker = new google.maps.Marker(markerData[i]);
		myMarkers.push(newMarker);
	}
	userMarker = new google.maps.Marker();
	google.maps.event.addListener(myMap, "click", showUserMarker);
	
} // End initMap

function showUserMarker(e) {   // Set position of the marker where the user clicked and place it on the map
	
	hideMarkers();
	userMarker.setPosition(e.latLng);
	userMarker.setMap(myMap);
	mapLocationElem.innerHTML = "Latitud: " + e.latLng.lat() + " Longitud: " + e.latLng.lng();
	requestImgsByLocation(e.latLng.lat(), e.latLng.lng());
	
} // End showUserMarker

function showAddrMarker() {   // Show marker for the address-button the user clicked on
	
	hideMarkers();
	myMarkers[this.getAttribute("data-ix")].setMap(myMap);
	
} // End showAddrMarker

function hideMarkers() {   // Hide all markers
	
	for (var i=0; i<myMarkers.length; i++)
		myMarkers[i].setMap(null);
	userMarker.setMap(null);
	mapLocationElem.innerHTML = "";
	
} // End hideMarkers



// ---------- Flickr Photo's Bonus Task ----------
function requestImgsByLocation(lat, lon) {   // AJAX-request of new images
	
	// Variables
	var request;													// Object for AJAX-call
	if (XMLHttpRequest)												// Check first for XML HTTP support
		request = new XMLHttpRequest();
	else if (ActiveXObject)											// If not, try Active X Object support						
		request = new ActiveXObject("Microsoft.XMLHTTP");
	else {															// Otherwise AJAX is not supported, return an empty value
		alert("Tyvärr, inget stöd för AJAX, så data kan inte läsas in.");
		return null;
	}	
	
	// Run AJAX
	request.open("GET", "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&per_page=3&page=1&api_key=" + myApiKey + "&lat=" + lat + "&lon=" + lon, true)
	request.send(null);												// Send request to the server
	request.onreadystatechange = function () {						// Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4 && request.status == 200)
			showMoreImgs(request.responseText);
	};
	
} // End requestImgsByLocation

function showMoreImgs(response) {   // Interpret the answer and show the images
	
	// Variables
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