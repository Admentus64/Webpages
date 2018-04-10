// JavaScript Document
// Author: Group 10

var Payload = {   // Start Static Class: Payload
    
    // Class Variables
    filters: [],
    filterBtns: [],
    activities: [],
    activityIcon: "src/img/map/activityIcon.png",
    commonExcludes: "",
    
    
    // Class Methods
    setFilters: function() {   // Start Method: setFilters
        
        // Add filter include and exclude words
        Payload.filters.push("reservat|naturpark|nationalpark?maten|camping");
        Payload.filters.push("älgpark|älgsafari|djur & nöjespark?havsbad|camping");
        Payload.filters.push("marknad|skärgårdsdagen|skärgårdsfestivalen|loppis?havsbad|restaurang|camping|leksaksmuseum|telemusem");
        Payload.filters.push("badplats|sjö|havsbad|badet|hamn|böda sand|vattenpalatset?fiske i|rastplats|ateljé|loppis|kräftodling|cykel|skogsbana|kroppkakan|stadsmuseum|militärhistoriska|järnvägsmuseum|eko-museum|museet|naturreservat|xperiment");
        Payload.filters.push("astrid lindgren|world|emils katthult|bullerbyn|high chaparral|kreativa|lekland|minigolf|lådbilslandet|prison island|xperiment?havsbad|camping|vattenexperiment");
        Payload.filters.push("långe jan|långe erik|fyr|sightseeing?havsbad|simhall|sjön|maten|bryggeri|camping");
        Payload.filters.push("slott|castle|borgholmsslott?fiske|huseby|havsbad|museum|camping");
        Payload.filters.push("museum?begravning|havsbad|filmby|hembygdspark|loppmarknad|camping|naturreservatet|badplats");
        
        // Add common words to exclude for
        Payload.commonExcludes = "familjecamping|camping och konferens|camping & stugor|stugor & camping|hotell|däck|autoservice|golfklubb|matkultur|vimmerby camping|pizzeria|vildmarkscamping|tvättmaskin|stensö camping";
        Payload.commonExcludes += "|sandviks camping|sandbybadets camping|movänta camping|semesterby";
        
    }, // End Method: setFilters
    
    createFilterButtons(div, event) {   // Start Method: createFilterButtons
        
        // Create the filter words and filter buttons
        Payload.setFilters();
        Payload.filterBtns = ["Naturreservat", "Djurpark", "Marknad", "Badplats", "Temapark", "Sevärdighet", "Slottsruin", "Museum"];
        
        // Go through each filter button, make a tag button from it and fill it with the filter words respective to it
        for (var i=0; i<Payload.filterBtns.length; i++) {
            var input = document.createElement("input");
            div.appendChild(input);
            input.type = "checkbox";
            input.name = "activityType";
            input.value = Payload.filters[i];
            input.checked = true;
            div.appendChild(document.createTextNode(Payload.filterBtns[i]));
            Event.add(input, "click", event);
        }
        
    }, // End Method: createFilterButtons
    
    load: function(json, specificFilter, isSet) {   // Start Method: load
        
        for (var i=0; i<json.payload.length; i++) {                 // Go through each entry from the database
            if (!json.payload[i].hasOwnProperty("start"))
                obj = new ActivityLocation(json.payload[i]);        // Convert the database entry into an Activity object (which is specified by the function call)
            else obj = new ActivityEvent(json.payload[i]);
            if (Payload.datePass(obj))                              // Check if the activity date window is within today's date window and allow if so, or allow if it does not specify the dates
                if (Payload.filterPass(obj, specificFilter)) {      // Check if the activity matches the filter or filters and allow if so
                    Payload.activities.push(obj);                   // Store the activity into the Payload for further use   
                    if (isSet)                                      // Create a fieldset for the activity if specified
                        obj.createSet();
                }
        }
        
    }, // End Method: load
    
    checkFilter: function(activity, specificFilter) {   // Start Method: checkFilter
        
        var rgxp;
        var filter = specificFilter;
        
        rgxp = new RegExp(Payload.commonExcludes, "gi");                            // Convert the common globaly shared exclude words into a regular expression
        if (activity.description.match(rgxp) || activity.name.match(rgxp))          // If exclude common globaly shared exclude words are found in the description or name, deny it
            return false;
        
        if (filter.indexOf("?") >= 0) {                                             // If the ? symbol is found then there must be exclude filter words
            rgxp = new RegExp(filter.slice(filter.indexOf("?")+1), "gi");           // Convert the exclude filter words into a regular expression
            if (activity.description.match(rgxp) || activity.name.match(rgxp))      // If exclude filter words are found in the description or name, deny it
                return false;
            filter = specificFilter.slice(0, filter.indexOf("?"));                  // Revert to the include filter words now
         }    
        rgxp = new RegExp(filter, "gi");                                            // Convert the include filter words into a regular expression
        if (activity.description.match(rgxp) || activity.name.match(rgxp))          // If any of the include filter words are found in the description or name, let it pass
            return true;
        else return false;
        
    }, // End method: checkFilter
    
    filterPass: function(activity, specificFilter) {   // End Method: filterPass
        
        // If no filter is specified, just go through all the filters
        if (specificFilter === null || specificFilter === false || specificFilter === undefined || specificFilter === "" || typeof specificFilter === "undefined") {
            for (var i=0; i<Payload.filters.length; i++)                                    // Go through each filter
                if (Payload.checkFilter(activity, Payload.filters[i]))                      // If the activity passes the filter check, allow it
                    return true;
            return false;                                                                   // If none of the filters matches the activity, deny it
        }
        else if (Payload.checkFilter(activity, specificFilter))                             // Otherwise a filter is specified, only check that filter. If it matches allow it, otherwise deny it
            return true;
        return false;
        
    }, // End Method: filterPass
    
    datePass: function(obj) {   // Start Method: datePass
        
        if (obj.start === "" && obj.end === "")                                                 // Allow the activity if it does not contain dates
            return true;
        
        var endDate = new Date(obj.end.replace(/-/g, "/"));                                     // Convert the date to a Date object
        
        var today = new Date();                                                                 // New date object
        var day = today.getDate();                                                              // Today's day
        var month = today.getMonth() + 1;                                                       // Today's month
        var year = today.getFullYear();                                                         // Today's year
        var hour = today.getHours();                                                            // Today's hour
        var min = today.getMinutes();                                                           // Today's minute
        var sec = today.getSeconds();                                                           // Today's second
        today = new Date(year + "/" + month + "/" + day + " " + hour + ":" + min + ":" + sec);  // Parse today's date into a date object
        
        if (endDate >= today)                                                                   // Allow the activity if the dates remain within today's date, otherwise filter it
            return true;
        return false;
        
    }, // End Method: datePass
    
    dynamicSort: function(property) {   // Start Method: dynamicSort
        
        var sortOrder = 1;                                          // Positive soring order
        if (property[0] === "-") {                                  // If the - symbol has been found, change the sorting order to be negative and remove the symbol from the provided value to sort
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {                                    // Commence the sorting and return the sorted value (use the sortOrder variable to return it ascending or descending)
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        };
        
    }, // End Method: dynamicSort
    
    getActivityById: function(id) {   // Start Method: getActivityById
        
        if (typeof id !== String)                                   // Convert the provided ID to string if not so already
            id = id.toString();
        
        for (var i=0; i<Payload.activities.length; i++) {           // Go through each activity
            if (Payload.activities[i].id == id)                     // If the current activity matches the provided id, return that activity
                return Payload.activities[i];
        }
        return null;                                                // No activity with a matching id has been found, so return none
        
    }, // End Method: getActivityById
    
}; // End Static Class: Payload