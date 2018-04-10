// ---------- Object payload ----------
var payload = {   // Contains all the code for retreiving SMAPI commands in general
    
    // Local variables
    smapiUri: "https://cactuar.lnu.se/course/1me302/",                      // SMAPI URI location
    smapiKey: "?key=MUq38eBy",											    // SMAPI API key
    eventLocations: [],
    
    init: function(controller, list, topics) {   // Initialization of the program
        
        // If no topic buttons are used. This is not actually used, but is still useful for code reference in case ever needed.
        /*if (topics === undefined) {
            payload.request(controller, list);
            alert(true);
            return;
        }*/
        
        // If the checkboxes are used (used by hotels and restaurants)
        if ($(topics).is("input:checkbox")) {
            $(topics).each(function(index) {
                $(topics[index]).change(function() { payload.request(controller, list, topics); });
            });
            payload.request(controller, list, topics);
            return;
        }
        
        // If checkboxes are not used, thus must be radio buttons (used by events)
        $(topics).each(function(index) {
            $(topics[index]).change(function() { payload.request(controller, list, topics); });
        });
        payload.request(controller, list, topics);
        
    }, // End init
    
	request: function(controller, list, topics) {   // Make an AJAX-call to read chosen file
		
        // Local variables
		var request;												                            // Object for AJAX-call
		
		// Initialize AJAX
		if (XMLHttpRequest)
			request = new XMLHttpRequest();							                            // Different objects (XMLHttpRequest or ActiveXObject), depending on browser
		else if (ActiveXObject)
			request = new ActiveXObject("Microsoft.XMLHTTP");
		else {
			alert("Tyvärr inget stöd för AJAX, så listan kan inte läsas in");
			return false;
		}
		
		// Run AJAX
        request.open("GET", payload.smapiUri + payload.smapiKey + controller, true);
		request.send(null);											                            // Send request to the server
		request.onreadystatechange = function () {					                            // Function to check status in the communication
            if (request.readyState == 4 && request.status == 200) {                             // When communication is ready readyState is 4 and if file exists status is 200 (OK), if OK then interpret data from read file 
                if (controller.indexOf("event") >= 0)
                    payload.getEvents(JSON.parse(request.responseText), list, topics);  
                else if (controller.indexOf("hotel") >= 0)
                    payload.getHotels(JSON.parse(request.responseText), list, topics);
                else if (controller.indexOf("restaurant") >= 0)
                    payload.getRestaurants(JSON.parse(request.responseText), list, topics);
                else if (controller.indexOf("location") >= 0 )
                    payload.getLocations(JSON.parse(request.responseText), list, topics);
            }
        };
    		
	}, // End request
    
    getLocations: function(json, list, topics) {   // Function to interpret JSON-code and to create HTML-code with content shown on page
        
        // Local variables
        var HTMLcode;
        var hasLocation = false;
        list.innerHTML += "<h2>Online Database Locations</h2>";
        
        for (var i=0; i<json.payload.length; i++) {                     // Go through each item retreived by SMAPI
            payload.checkLocation(json.payload[i], topics);             // Check and filter each item, remove the name if not proper
            if (json.payload[i].name !== undefined) {                   // Should the name still exist, store it to be added later
                HTMLcode = "<button class=\"location\" value=";
                HTMLcode += json.payload[i].latitude + ";" + json.payload[i].longitude;
                HTMLcode += ">" + json.payload[i].name + "</button>";
                list.innerHTML += HTMLcode;                             // Update the HTML code
                hasLocation = true;                                     // At least one location has been found
            }
        }
        
        if (!hasLocation)                                               // Post a message if no locations have been retreived
            list.innerHTML = "<b>No fishing locations available within this region.</b>";
        
    }, // End getLocations
    
    checkLocation: function(location, topics) {   // Check and filter a location
        
        // Check if the event is related to fishing, if not delete it
        if (location.name.indexOf("fisk") < 0 &&
            location.name.indexOf("fish") < 0 &&
            location.description.indexOf("fisk") < 0 &&
            location.description.indexOf("fish") < 0) {
                delete location.name;
                return;
            }
        
        // Check for Oland relationships without a website
        if (topics == "Oland" && location.website === null) {
            if (location.name.indexOf("oland") < 0 &&
                location.name.indexOf("Oland") < 0 &&
                location.description.indexOf("oland") < 0 &&
                location.description.indexOf("Oland") < 0) {
                    delete location.name;
                    return;
                }
        }
        
        // Check for Oland relationships with a website
        else if (topics == "Oland" && location.website !== null) {
            if (location.name.indexOf("oland") < 0 &&
                location.name.indexOf("Oland") < 0 &&
                location.description.indexOf("oland") < 0 &&
                location.description.indexOf("Oland") < 0 &&
                location.website.indexOf("oland") < 0 &&
                location.website.indexOf("Oland") < 0) {
                    delete location.name;
                    return;
                }
        }
        
        // Check for Smaland relationships without a website
        else if (topics == "Smaland" && location.website === null) {
            if (location.name.indexOf("smaland") < 0 &&
                location.name.indexOf("Smaland") < 0 &&
                location.description.indexOf("smaland") < 0 &&
                location.description.indexOf("Smaland") < 0) {
                    delete location.name;
                    return;
                }
        }
        
        // Check for Smaland relationships with a website
        else if (topics == "Smaland" && location.website !== null) {
            if (location.name.indexOf("smaland") < 0 &&
                location.name.indexOf("Smaland") < 0 &&
                location.description.indexOf("smaland") < 0 &&
                location.description.indexOf("Smaland") < 0 &&
                location.website.indexOf("smaland") < 0 &&
                location.website.indexOf("Smaland") < 0) {
                    delete location.name;
                    return;
                }
        }
        
    }, // End checkLocation
    
    getEvents: function(json, list, topics) {   // Function to interpret JSON-code and to create HTML-code with content shown on page
        
        // Local variables
		var HTMLcode;
        list.innerHTML = "";
        var hasEvent = false;
        
        for (var i=0; i<json.payload.length; i++) {                 // Go through each item retreived by SMAPI
            payload.checkEvent(json.payload[i], topics);            // Check and filter each item, remove the title if not proper
            if (json.payload[i].title !== undefined) {              // Should the title still exist, store it to be added later
                HTMLcode = "<div class=\"event\">";
                HTMLcode += "<b>Title:</b> " + json.payload[i].title + "<br>";
                HTMLcode += "<b>Price:</b> " + json.payload[i].price + "<br>";
                HTMLcode += "<b>Start:</b> " + json.payload[i].start + "<br>";
                HTMLcode += "<b>End:</b> " + json.payload[i].end + "<br>";
                HTMLcode += "<b>Location:</b> " + json.payload[i].latitude + ", " + json.payload[i].longitude + "<br>";
                HTMLcode += "<b>Description:</b>" + "<p>" +  json.payload[i].description + "</p>";
                HTMLcode += "</div>";
                list.innerHTML += HTMLcode;                         // Update the HTML code
                hasEvent = true;                                    // At least one event has been found
            }
        }
        
        if (!hasEvent)                                              // Post a message if no events have been retreived
            list.innerHTML = "<b>No events available within this time frame.</b>";
        
    }, // End getEvents
    
    checkEvent: function(event, topics) {   // Check and filter an event
        
        // Check if the event is related to fishing, if not delete it
        if (event.title.indexOf("fisk") < 0 &&
            event.title.indexOf("fish") < 0 &&
            event.description.indexOf("fisk") < 0 &&
            event.description.indexOf("fish") < 0) {
                delete event.title;
                return;
            }
        
        // Local variables for date checking
        var currDate = new Date();                                                                      // Read the date of today
        var eventDate = new Date(event.start);                                                          // Read the date of the event
        var oneDay = 24 * 60 * 60 * 1000;                                                               // Equals one day
        var diffDays = Math.round(Math.abs((currDate.getTime() - eventDate.getTime()) / (oneDay)));     // Get the difference in days between today and the event
        
        // Check if the event is within the specified time frame (this week, month or year), if not delete it
        if (topics[0].checked && diffDays >= 7 ||
            topics[1].checked && eventDate.getMonth() != currDate.getMonth() || eventDate.getYear() != currDate.getYear() ||
            topics[2].checked && eventDate.getYear() != currDate.getYear())
            delete event.title;
        
    }, // End checkEvent
    
    getHotels: function(json, list, topics) {   // Function to interpret JSON-code and to create HTML-code with content shown on page
		
		// Local variables
		var HTMLcode;
        var hasHotel = false;
        list.innerHTML = "";
        
        for (var i=0; i<json.payload.length; i++) {                         // Go through each item retreived by SMAPI
            payload.checkHotel(json.payload[i], topics);                    // Check and filter each item, remove the name if not proper
            if (json.payload[i].name !== undefined) {                       // Should the name still exist, store it to be added later
                HTMLcode = "<div class=\"event\">";
                HTMLcode += "<b>Name:</b> " + json.payload[i].name + "</br>";
                HTMLcode += "<b>Stars:</b> " + json.payload[i].stars + "</br>";
                HTMLcode += "<b>Price per Night:</b> " + json.payload[i].price_per_night + "</br>";
                
                if (json.payload[i].pet_friendly == "0")
                    HTMLcode += "<b>Pet Friendly:</b> No</br>";
                else HTMLcode += "<b>Pet Friendly:</b> Yes</br>";
                
                // Just go through each combination of hotel type (spa, conference and gym) for having a nice written summary
                if (json.payload[i].conference == "1" && json.payload[i].spa == "0" && json.payload[i].gym == "0")
                    HTMLcode += "<b>Includes:</b> Conference</br>";
                else if (json.payload[i].conference == "0" && json.payload[i].spa == "1" && json.payload[i].gym == "0")
                    HTMLcode += "<b>Includes:</b> Spa</br>";
                else if (json.payload[i].conference == "0" && json.payload[i].spa == "0" && json.payload[i].gym == "1")
                    HTMLcode += "<b>Includes:</b> Gym</br>";
                else if (json.payload[i].conference == "1" && json.payload[i].spa == "1" && json.payload[i].gym == "0")
                    HTMLcode += "<b>Includes:</b> Conference & Spa</br>";
                else if (json.payload[i].conference == "1" && json.payload[i].spa == "0" && json.payload[i].gym == "1")
                    HTMLcode += "<b>Includes:</b> Conference & Gym</br>";
                else if (json.payload[i].conference == "0" && json.payload[i].spa == "1" && json.payload[i].gym == "1")
                    HTMLcode += "<b>Includes:</b> Spa & Gym</br>";
                else if (json.payload[i].conference == "1" && json.payload[i].spa == "1" && json.payload[i].gym == "1")
                    HTMLcode += "<b>Includes:</b> Conference, Spa & Gym</br>";
                else HTMLcode += "<b>Includes:</b> Has no extra's</br>";
                    
                HTMLcode += "<b>Location:</b> " + json.payload[i].latitude + ", " + json.payload[i].longitude;
                HTMLcode += "</div>";
                list.innerHTML += HTMLcode;                             // Update the HTML code
                hasHotel = true;                                        // At least one hotel has been found
            }
        }
        
        if (!hasHotel)                                                  // Post a message if no events have been retreived
            list.innerHTML = "<b>No hotels were found that suited your requests.</b>";
		
	}, // End getHotels
    
    checkHotel: function(hotel, topics) {   // Check and filter an hotel
        
        // Check if the hotel supports the following requests when checked, if not delete it
        if (topics[0].checked && hotel.pet_friendly == "0" ||
            topics[1].checked && hotel.conference == "0" ||
            topics[2].checked && hotel.spa == "0" ||
            topics[3].checked && hotel.gym == "0")
                delete hotel.name;
        
    }, // End checkHotel
    
    getRestaurants: function(json, list, topics) {   // Function to interpret JSON-code and to create HTML-code with content shown on page
		
		// Local variables
		var HTMLcode;
        var hasRestaurant = false;
        
        list.innerHTML = "";
        
        for (var i=0; i<json.payload.length; i++) {                     // Go through each item retreived by SMAPI
            payload.checkRestaurant(json.payload[i], topics);           // Check and filter each item, remove the name if not proper
            if (json.payload[i].name !== undefined) {                   // Should the name still exist, store it to be added later
                HTMLcode = "<div class=\"event\">";
                HTMLcode += "<b>Name:</b> " + json.payload[i].name + "<br>";
                
                if (json.payload[i].lunch_pricing > 0)
                    HTMLcode += "<b>Lunch Pricing:</b> " + json.payload[i].lunch_pricing + "<br>";
                else HTMLcode += "<b>Lunch Pricing:</b> Not available for lunching<br>";
                if (json.payload[i].dinner_pricing > 0)
                    HTMLcode += "<b>Dinner Pricing:</b> " + json.payload[i].dinner_pricing + "<br>";
                else HTMLcode += "<b>Dinner Pricing:</b> Not available for dining<br>";
                
                HTMLcode += "<b>Hours:</b> " + json.payload[i].opening_time + " - " + json.payload[i].closing_time + "<br>";
                HTMLcode += "<b>Type:</b> " + json.payload[i].type + "<br>";
                HTMLcode += "<b>Age Group:</b> " + json.payload[i].age_group + "<br>";
                HTMLcode += "<b>Location:</b> " + json.payload[i].latitude + ", " + json.payload[i].longitude;
                HTMLcode += "</div>";
                list.innerHTML += HTMLcode;                             // Update the HTML code
                hasRestaurant = true;                                   // At least one restaurant has been found
            }
        }
        
        if (!hasRestaurant)                                             // Post a message if no restaurants have been retreived
            list.innerHTML = "<b>No restaurants were found that suited your requests.</b>";
		
	}, // End getRestaurants
    
    checkRestaurant: function(restaurant, topics) {   // Check and filter an restaurant
        
        // Check if the restaurant supports the following requests when checked, if not delete it
        if (!topics[0].checked && restaurant.type == "restaurant" ||
            !topics[1].checked && restaurant.type == "cafe" ||
            !topics[2].checked && restaurant.type == "bistro" ||
            !topics[3].checked && restaurant.type == "fast-food" ||
            !topics[4].checked && restaurant.type == "pub" ||
            !topics[5].checked && restaurant.lunch_pricing != "0" ||
            !topics[6].checked && restaurant.dinner_pricing != "0")
                delete restaurant.name;
        
    }, // End checkHotel
    
}; // End payload category