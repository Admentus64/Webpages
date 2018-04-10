// JavaScript Document
// Author: Group 10

function Activity() {   // Start Dynamic Parent Class: Activity
    
    // Public Attributes
    this.id = "";
    this.name = "";
    this.description = "";
    this.address = "";
    this.city = "";
    this.zip_code = "";
    this.phone_number = "";
    this.website = "";
    this.latitude = "";
    this.longitude = "";
    this.rating = "";
    this.indoors = "";
    this.price = "";
    this.interactivity = "";
    this.location_id = "";
    this.opening_time = "";
    this.closing_time = "";
    this.start = "";
    this.end = "";
    
    this.emptyStar = "&#9734;";                                     // Unfilled Star Rating Symbol through UTF-8 Decimal
    this.filledStar = "&#9733;";                                    // Filled Star Rating Symbol through UTF-8 Decimal
    
    
    
    // Public Info Attributes
    this.fieldset = undefined;                                      // Tag that contains all sub-tags
    this.hTag = undefined;                                          // Meant for the title / name which is a header-tag
    this.pTag = undefined;                                          // Meant for the description which is a p-tag
    this.spanDiv = undefined;                                       // Div-tag that contains the span-tags which contain a star rating symbol (either filled or unfilled)
    this.button = undefined;                                        // Button-tag for read more info to access the activity.html page
    this.img = undefined;                                           // Image-tag that contains an image of the activity
    
    
    
    // Private Attributes
    var self = this;                                                // Refers the object itself if the keywork this is not suitable
    var hidden = false;                                             // If the fieldset is hidden or not (hidden, not removed, thus it can exist but be invisible)
    var listed = false;                                             // If the fieldset exists in the HTML
    var marker = null;                                              // The marker of the activity on a map, if it is null then there marker simply does not exist
    
    
    
    // Public Methods
    this.hide = function() {   // Start Method: hide
        
        if (!hidden) {                                              // If the fieldset is not hidden, then hide it from the user's view
            self.fieldset.style.display = "none";
            hidden = true;
        }
        
    }; // End Method: hide
    
    this.show = function() {   // Start Method: show
        
        if (hidden) {                                               // If the fieldset is hidden, then show it to the user again
            self.fieldset.style.display = "initial";
            hidden = false;
        }
        
    }; // End Method: show
    
    this.list = function() {   // Start Method: list
        
        if (!listed) {                                              // If the fieldset is not listed yet in the HTML code, add it
            Activities.listElem.appendChild(self.fieldset);
            listed = true;
        }
        
    }; // End Method: list
    
    this.mark = function(focus, iconPath, xSize, ySize) {   // Start Method: mark
        
        if (marker === null) {                                      // If a marker of the activity does not exists yet on the map then add a new marker on the map with specifics provided by the activity itself
            var latLng = new google.maps.LatLng(self.latitude, self.longitude);
            marker = new google.maps.Marker({ position: latLng, title: self.name, map: GoogleMap.myMap });
            
            if (focus === true) {
                GoogleMap.myMap.setZoom(12);
                GoogleMap.myMap.setCenter(latLng);
            }
            
            if (iconPath !== null && iconPath !== false && iconPath !== undefined && typeof iconPath !== "undefined") {
                if (xSize > 0 && ySize > 0)
                    size = new google.maps.Size(xSize, ySize);
                else size = new google.maps.Size(32, 32);
                var icon = {
                    url: iconPath,                              // url
                    scaledSize: size,                           // scaled size
                    origin: new google.maps.Point(0,0),         // origin
                    anchor: new google.maps.Point(0, 0)         // anchor
                };
                marker.setIcon(icon);
            }
            
            marker.addListener("click", function() { GoogleMap.openInfoWindow(self.fieldset, marker); }, false);
        }
        
    }; // End Method: mark
    
    this.unmark = function() {   // Start Method: unmark
        
        if (marker !== null) {
            GoogleMap.infoWindow.close();
            marker.setMap(null);
            marker = null;
        }
        
    }; // End Method: unmark
    
    this.remove = function() {   // Start Method: remove
        
        self.show();
        self.unmark();
        
        if (listed) {
            Activities.listElem.removeChild(self.fieldset);
            listed = false;
        }
        
    }; // End Method: remove
    
    this.setImage = function() {   // Start Method: setImage
        
        var imageUrl = "src/img/activity/" + self.id + ".jpg";
        
        imageExists(imageUrl, function(exists) {
            if (exists)
                self.img.src = imageUrl;
            else self.img.src = "src/img/activity/noImage.jpg";
        });
        
        self.img.setAttribute("alt", "Activity - ID: " + self.id);
        self.img.className = "activityImg";
        
    }; // End Method: setImage
    
    this.overrideInfoText = function(newInfoText) { marker.addListener("click", function() { GoogleMap.openInfoWindow(newInfoText, marker); }, false); };   // Method: overrideInfoText
    
    
    
    // Private Methods
    imageExists = function(url, callback) {   // Start Method: imageExists
        
        var img = new Image();
        img.onload = function() { callback(true); };
        img.onerror = function() { callback(false); };
        img.src = url;
        
    }; // End Method: imageExists
    
} // End Dynamic Parent Class: Activity