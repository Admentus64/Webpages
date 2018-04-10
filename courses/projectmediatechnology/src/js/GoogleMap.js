// JavaScript Document
// Author: Group 10

var GoogleMap = {   // Start Static Class: GoogleMap
    
    // Class Variables
    myMap: undefined,
    infoWindow: undefined,
    searchBox: undefined,
    markers: [],
    searchBoxMarkers: [],
    ranInit: false,    
    
    
    
    // Class Methods
    init: function() {   // Start Method: init
        
        if (GoogleMap.ranInit)
            return;
        GoogleMap.ranInit = true;
        
        GoogleMap.restoreRobotoFont();
        
        GoogleMap.myMap = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 56.925729, lng: 15.322607 },
            zoom: 8,
            styles: [
            	{ featureType: "poi", stylers: [ { visibility:"off" } ] },
            	{ featureType: "transit.station", stylers: [ { visibility:"off" } ] }
            ],
        });
        
        GoogleMap.infoWindow = new google.maps.InfoWindow({ content: "" });
        google.maps.event.addListener(GoogleMap.myMap, "click", function() { GoogleMap.infoWindow.close(); } );
        GoogleMap.myMap.setOptions({ scrollwheel: false });
        
    }, // End Method: init
    
    initSearchBox: function() {   // Start Method: initSearchBox
        
        GoogleMap.init();
        
        GoogleMap.searchBox = new google.maps.places.SearchBox(document.getElementById("searchBox"));   // Create the search box and link it to the UI element
        GoogleMap.myMap.addListener("bounds_changed", GoogleMap.getSearchBoxBounds);                    // Bias the SearchBox results towards current map's viewport
        GoogleMap.searchBox.addListener("places_changed", GoogleMap.getSearchBoxPlaces);                // Listen for the event fired when the user selects a prediction and retrieve more details for that place
        
    }, // End Method: initSearchBox
    
    restoreRobotoFont: function() {   // Start Method: restoreRobotoFont
        
        var head = document.getElementsByTagName('head')[0];
        var insertBefore = head.insertBefore;                           // Save the original method
        head.insertBefore = function (newElement, referenceElement) {   // Replace it!
            if (newElement.href && newElement.href.indexOf("https://fonts.googleapis.com/css?family=Roboto") === 0)
                return;
            insertBefore.call(head, newElement, referenceElement);
        };
        
    }, // End Method: restoreRobotoFont
    
    placeAllMarkers: function() {   // Start Method: placeAllMarkers
        
        GoogleMap.init();
        
        for (var i=0; i<Payload.activities.length; i++)
            Payload.activities[i].mark(false, Payload.activityIcon);
        
    }, // End Method: placeAllMarkers
    
    hideAllMarkers: function() {   // Start Method: hideAllMarkers
        
        for (var i=0; i<GoogleMap.markers.length; i++)
            GoogleMap.markers[i].setMap(null);
        GoogleMap.markers = [];
        
    }, // End Method: hideAllMarkers
    
    placeMarker: function(lat, lng, name, focus, iconPath) {   // Start Method: placeMarker
        
        var latLng = new google.maps.LatLng(lat, lng);
        GoogleMap.markers.push(new google.maps.Marker({ position: latLng, title: name, map: GoogleMap.myMap }));
        
        if (focus === true) {
            GoogleMap.myMap.setZoom(10);
            GoogleMap.myMap.setCenter(latLng);
        }
        
        if (iconPath !== null && iconPath !== false && iconPath !== undefined && typeof iconPath !== "undefined") {
            var icon = {
                url: iconPath,                              // url
                scaledSize: new google.maps.Size(32, 32),   // scaled size
                origin: new google.maps.Point(0,0),         // origin
                anchor: new google.maps.Point(0, 0)         // anchor
            };
            GoogleMap.markers[GoogleMap.markers.length-1].setIcon(icon);
        }
        
    }, // End Method: placeMarker
    
    openInfoWindow: function(text, marker) {   // Start Method: openInfoWindow
        
        GoogleMap.infoWindow.close();
        GoogleMap.infoWindow.setContent(text);
        GoogleMap.infoWindow.open(GoogleMap.myMap, marker);
    
    }, // End Method: openInfoWindow
    
    getSearchBoxPlaces: function() {   // Start Method: getSearchBoxPlaces
        
        var places = GoogleMap.searchBox.getPlaces();
        if (places.length === 0)
            return;
        
        // Clear out the old markers.
        GoogleMap.searchBoxMarkers.forEach(function(marker) { marker.setMap(null); });
        GoogleMap.searchBoxMarkers = [];
        
        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };
            
            // Create a marker for each place.
            GoogleMap.searchBoxMarkers.push(new google.maps.Marker({
                map: GoogleMap.myMap,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));
                
            if (place.geometry.viewport)
                bounds.union(place.geometry.viewport);              // Only geocodes have viewport.
            else bounds.extend(place.geometry.location);
        });
        GoogleMap.myMap.fitBounds(bounds);
        
    }, // End Method: getSearchBoxPlaces
    
    getSearchBoxBounds: function()  { GoogleMap.searchBox.setBounds(GoogleMap.myMap.getBounds()); },    // Method: getSearchBoxBounds
    
}; // End Static Class: GoogleMap



Event.add(window, "load", GoogleMap.init);                                // Active function init when the page is loaded