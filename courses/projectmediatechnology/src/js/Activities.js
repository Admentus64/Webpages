// JavaScript Document
// Author: Group 10

var Activities = {   // Start Static Class: Activities
    
    // Class Variables
    listElem: undefined,
    sortingMenu: undefined,
    locationBtns: undefined,
    activeLocation: "both",
    
    
    
    // Class Methods
    init: function() {   // Start Method: init
        
        Activities.listElem = document.getElementById("activitiesList");
        Activities.sortingMenu = document.getElementById("sortingMenu");
        Activities.locationBtns = document.getElementById("location").getElementsByTagName("input");
        
        Payload.createFilterButtons(document.getElementById("filtering"), Activities.clickFilterBtn);
        Event.add(Activities.sortingMenu, "change", Activities.sort);
        
        for (var i=0; i<Activities.locationBtns.length; i++)                                            // Make each location filter button usable to filter the contents of the activities
            Event.add(Activities.locationBtns[i], "click", Activities.clickLocationBtn);
        
        // Go through all database to retrieve activities
        Ajax.request("database", [Payload.load, Activities.sort, Activities.filterLocations], false, true);
        Ajax.request("&controller=location&method=getall", [Payload.load, Activities.sort, Activities.filterLocations], false, true);
        
    }, // End Method: init
    
    sort: function() {   // Start Method: sort
        
        var i;
        
        if (Activities.sortingMenu.value == "alfa-asc")
            Payload.activities.sort(Payload.dynamicSort("name"));
        else if (Activities.sortingMenu.value == "alfa-desc")
            Payload.activities.sort(Payload.dynamicSort("-name"));
        else if (Activities.sortingMenu.value == "rating-high")
            Payload.activities.sort(Payload.dynamicSort("-rating"));
        else if (Activities.sortingMenu.value == "rating-low")
            Payload.activities.sort(Payload.dynamicSort("rating"));
        
        for (i=0; i<Payload.activities.length; i++)
            Payload.activities[i].remove();
        for (i=0; i<Payload.activities.length; i++)
            Payload.activities[i].list();
        
    }, // End Method: sort
    
    clickLocationBtn: function() {   // Start Method: filterLocations
        
        Activities.activeLocation = this.value;
        Activities.filterLocations();
        
    }, // End Method: filterLocations
    
    filterLocations: function() {   // Start Method: clickLocationBtn
        
        var i;
        
        if (Activities.activeLocation == "smaland") {
            for (i=0; i<Payload.activities.length; i++) {
                if (Activities.isOnSmaland(Payload.activities[i].city))
                    Payload.activities[i].show();
                else Payload.activities[i].hide();
            }
        }
        else if (Activities.activeLocation == "oland") {
            for (i=0; i<Payload.activities.length; i++) {
                if (Activities.isOnOland(Payload.activities[i].city))
                    Payload.activities[i].show();
                else Payload.activities[i].hide();
            }
        }
        else for (i=0; i<Payload.activities.length; i++)
            Payload.activities[i].show();
        
    }, // End Method: clickLocationBtn
    
    isOnSmaland: function(c) {   // End Method: isOnSmaland
        
        if (c == "Vimmerby" || c == "Kalmar" || c == "Växjö" || c == "Linneryd" || c == "Jönköping" || c == "Ryd" || c == "Lagan" || c == "Ljungby" || c == "Hultsfred" || c == "Kosta" || c == "Loftahammar" ||
        c == "Kulltorp" || c == "Hovmantorp" || c == "Värnamo" || c == "Virserum" || c == "Nybro" || c == "Högsby" || c == "Oskarshamn" || c == "Hjorted" || c == "Västervik" || c == "Gamleby" || c == "Gislaved" ||
        c == "Gränna" || c == "Habo" || c == "Huskvarna" || c == "Mariannelund" || c == "Vetlanda" || c == "Bodafors" || c == "Björköby" || c == "Eksjö" || c == "Nässjö" || c == "Rydaholm" || c == "Alvesta" ||
        c == "Sävsjö" || c == "Annerstad" || c == "Diö" || c == "Tingsryd" || c == "Gemla" || c == "\u00c5ryd" || c == "\u00c4lmhult" || c == "Tranås" || c == "Urshult" || c == "Mönsterås" || c == "Ingelstad" ||
        c == "Holsbybrunn")
            return true;
        return false;
        
    }, // End Method: isOnSmaland
    
    isOnOland: function(c) {   // End Method: isOnOland
        
        if (c == "Färjestaden" || c == "Borgholm" || c == "Löttorp" || c == "Degerhamn" || c == "Byxelkrok" || c == "Söderåkra" || c == "\u00d6land")
            return true;
        return false;
        
    }, // End Method: isOnOland
    
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
        Ajax.request("database", [Payload.load, Activities.sort, Activities.filterLocations], filter, true);
        Ajax.request("&controller=location&method=getall", [Payload.load, Activities.sort, Activities.filterLocations], filter, true);
        
    }, // End Method: checkFilterBtn
    
}; // End Static Class: Activities



Event.add(window, "load", Activities.init);						// Active function init when the page is loaded