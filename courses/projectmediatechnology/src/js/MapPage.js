// JavaScript Document
// Author: Group 10

var MapPage = {   // Start Static Class: Map
    
    // Class Methods
    init: function() {   // Start Method: init
        
        GoogleMap.initSearchBox();                                                                      // Add a search box on the map and prepare it
        Payload.createFilterButtons(document.getElementById("filtering"), MapPage.clickFilterBtn);
        
        // Go through all database to retrieve activities
        Ajax.request("database", [Payload.load, GoogleMap.placeAllMarkers], false, true);
        Ajax.request("&controller=location&method=getall", [Payload.load, GoogleMap.placeAllMarkers], false, true);
        
    }, // End Method: init
    
    clickFilterBtn: function() {   // Start Method: checkFilterBtn
        
        var filter;
        
        if (this.checked) {                                         // If a clicked checkbox becomes active
            Payload.filters.push(this.value);                       // Read the filter of the clicked checkbox and add it to the payload
            filter = this.value;                                    // Pass the filter of the clicked checkbox
        }
        else {                                                      // Otherwise the clicked checkbox became inactive
            var index = Payload.filters.indexOf(this.value);        // Retrieve the index value of the current filter button in the filters list
            Payload.filters.splice(index, 1);                       // Remove the filter from the clicked checkbox
            filter = false;                                         // Pass all remaining filters
            for (i=0; i<Payload.activities.length; i++)             // Remove all activities from the list
                Payload.activities[i].remove();
            Payload.activities = [];                                // Empty the activities in the payload
        }
        
        // Go through all databases to retrieve activities
        Ajax.request("database", [Payload.load, GoogleMap.placeAllMarkers], filter, true);
        Ajax.request("&controller=location&method=getall", [Payload.load, GoogleMap.placeAllMarkers], filter, true);
        
    }, // End Method: checkFilterBtn
    
}; // End Static Class: Map



Event.add(window, "load", MapPage.init);                                // Active function init when the page is loaded