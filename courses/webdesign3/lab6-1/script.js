// JavaScript



// ---------- Global Variables ----------
var myApiKey = "a8b15d9caa6cefd1482aa5e1cff3cbe6";					// Replace xxx-xxx with your own Flickr API key
var flickrImgElem;													// Reference to element their images are shown
var formElem;														// Reference to search box
var pageNrElem;														// Reference to element for page number
var largeImgElem;													// Reference to img-element for large image
var captionElem;													// Reference to element for image text
var tags;															// Tags provided in the search box
var pageNr;															// Current page number
var imgLocationElem;												// References to element for the coordinates of an image
var moreImgElem;													// Reference to element for multiple images
var map;															// Object for the map



// ---------- Initialization ----------
function init() {   // Initialization of the program
	
	// Variables
	pageNr = 1;
	
	// Document
	flickrImgElem = document.getElementById("flickrImg");
	formElem = document.getElementById("searchForm");
	pageNrElem = document.getElementById("pageNr");
	largeImgElem = document.querySelector("#largeImg img");
	captionElem = document.querySelector("#largeImg figcaption");
	imgLocationElem = document.getElementById("imgLocation");
	moreImgElem = document.getElementById("moreImg");
	
	// Events
	addListener(formElem.searchBtn,"click", searchImg);
	addListener(document.getElementById("prevBtn"), "click", prevPage);
	addListener(document.getElementById("nextBtn"), "click", nextPage);
	
} // End init
addListener(window, "load", init);									// Call initialization when finished loading page



// ---------- Functions ----------
function searchImg() {   // Initialize a new search
	
	tags = formElem.tags.value;
	pageNr = 1;
	requestNewImgs();
	
} // End searchImg

function requestNewImgs() {   // AJAX-request of new images
	
	// Variables
	flickrImgElem.innerHTML = "<img src='pics/progress.gif' style='border:none;'>";
	pageNrElem.innerHTML = pageNr;
	var request = AJAXRequest();									// Object for AJAX-call
	if (request == null)
		return;
	
	// Run AJAX
	request.open("GET","https://api.flickr.com/services/rest/?method=flickr.photos.search&per_page=5&format=json&nojsoncallback=1&has_geo=1&api_key=" + myApiKey + "&tags=" + tags + "&page=" + pageNr, true);
	request.send(null);												// Send request to the server
	request.onreadystatechange = function () {						// Function to check status in the communication
		if (request.readyState == 4 && request.status == 200)
			newImgs(request.responseText);
	};
	
} // End requestNewImgs

function newImgs(response) {   // Interpret the answer and show the images
	
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
		addListener(newElem, "click", enlargeImg);
		flickrImgElem.appendChild(newElem);
	}
	
} // End newImgs

function prevPage() {   // Get the previous set of images
	
	if (pageNr > 1) {
		pageNr--;
		requestNewImgs();
	}
	
} // End prevPage

function nextPage() {   // Get the next set of images
	
	pageNr++;
	requestNewImgs();
	
} // End nextPage

function enlargeImg() {   // Show an enlarged image of that image the user clicked on
	
	// Variables
	var photo;														// Object with data of photo
	var imgUrl;														// URL address to a image
	photo = JSON.parse(this.getAttribute("data-photo"));
	imgUrl = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_z.jpg";
	
	// Enlarge
	largeImgElem.src = imgUrl;
	captionElem.innerHTML = photo.title;
	requestLocation(photo.id);
	
} // End enlargeImg



// ---------- Added Laboration 6 ----------
function AJAXRequest() {   // Assign an object for AJAX support
	
	if (XMLHttpRequest)												// Check first for XML HTTP support
		return new XMLHttpRequest();									
	if (ActiveXObject)												// If not, try Active X Object support									
		return new ActiveXObject("Microsoft.XMLHTTP");
	alert("Tyvärr, inget stöd för AJAX, så data kan inte läsas in.");
	return null;													// Otherwise AJAX is not supported, return an empty value
	
} // End AJAXRequest

function requestLocation(id) {   // Ajax-begäran av plats för bilden
	
	// Variables
	var request = AJAXRequest();									// Object for AJAX-call
	if (request == null)
		return;
		
	// Run AJAX
	request.open("GET", "https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&format=json&nojsoncallback=1&api_key=" + myApiKey + "&photo_id=" + id, true)
	request.send(null);												// Send request to the server
	request.onreadystatechange = function () {						// Function to check status in the communication
		if (request.readyState == 4 && request.status == 200)
			showLocation(request.responseText);
	};
	
} // End requestLocation

function showLocation(response) {   // Show coordinates
	
	// Variables
	response = JSON.parse(response);
	var lat = response.photo.location.latitude;
	var lon = response.photo.location.longitude;
	
	// Show location
	imgLocationElem.innerHTML = "Latitud: " + lat + " Longitud: " + lon;
	requestImgsByLocation(lat, lon);
	initMap(lat, lon);
	
} // End showLocation

function requestImgsByLocation(lat, lon) {   // AJAX-request of new images
	
	// Variables
	var request = AJAXRequest();									// Object for AJAX-call
	if (request == null)
		return;
	
	// Run AJAX
	request.open("GET", "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&per_page=5&page=1&api_key=" + myApiKey + "&lat=" + lat + "&lon=" + lon, true)
	request.send(null);												// Send request to the server
	request.onreadystatechange = function () {						// Function to check status in the communication
		if (request.readyState == 4 && request.status == 200)
			showMoreImgs(request.responseText);
	};
	
} // End requestImgsByLocation

function showMoreImgs(response) {   // Interpret the answer and show the images
	
	// Variables
	var photo;														// A photo in the answer
	var imgUrl;														// URL address to a image
	response = JSON.parse(response);
	moreImgElem.innerHTML = "";
	
	// Interpret JSON
	for (var i=0; i<response.photos.photo.length; i++) {
		photo = response.photos.photo[i];
		imgUrl = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_s.jpg";
		newElem = document.createElement("img");
		newElem.setAttribute("src", imgUrl);
		newElem.setAttribute("data-photo", JSON.stringify(photo));
		moreImgElem.appendChild(newElem);
	}
	
} // End showMoreImgs



// ---------- Google Maps Bonus Task ----------
function initMap(lat, lon) {   // Create a map and marker
	
	// Variables
	var latLon = { lat: parseFloat(lat), lng: parseFloat(lon) };	// Parsing coordinates to use later
	
	// Map
	map = new google.maps.Map(document.getElementById('map'), {
		center: latLon,												// Using the parsed coordinates
		zoom: 6,
		styles: [													// Turn off points of interest, bus stations and so on
			{ featureType: "poi", stylers: [ { visibility:"off" } ] },
			{ featureType: "transit.station", stylers: [ { visibility:"off" } ] }
		]
	});
	
	// Marker
	var markerData = { position: latLon, map: map }
	var marker = new google.maps.Marker(markerData);
	
} // End initMap