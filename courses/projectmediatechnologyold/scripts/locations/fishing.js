// JavaScript Document



// ---------- Global Variables ----------
var list1;												                        // Reference to main section containing the topic information
var list2;												                        // Reference to main section containing the topic information



// ---------- Functions ----------
function init() {   // Initialization of the program
    
    // Define HTML elements
    list1 = document.getElementById("list1");
    getTopic("../scripts/locations/Smaland.txt", list1);                        // Fill this list with locations for Smaland
    payload.request("&controller=location&method=getAll", list1, "Smaland");    // Use SMAPI to fill the list even further
    
    list2 = document.getElementById("list2");
    getTopic("../scripts/locations/Oland.txt", list2);                          // Fill this list with locations for Oland
    payload.request("&controller=location&method=getAll", list2, "Oland");      // Use SMAPI to fill the list even further
    
    window.setTimeout(getCoordinates, 1000);                                    // Wait a bit before moving on
        
} // End init

addListener(window, "load", init);                                              // Load the page                  

function getCoordinates() {   // Get the location and set the syle for each button
    
    locations = document.getElementsByClassName("location");                    // Where the locations are found in the document
    for (var i=0; i<locations.length; i++) {                                    // Check each location
        addListener(locations[i], "click", storeCoordinates);                   // Make the button clickable and therefore usable
        locations[i].style.cursor = "pointer";                                  // Set the style so the user knows the button is usable
        locations[i].style.color = "Black";
        locations[i].style.backgroundColor = "Orange";
    }
        
} // End getCoordiantes

function storeCoordinates() {   // Store the coordinates of the clicked button
    
	// Get value of the button and save it within the local session
    sessionStorage.setItem("lat", this.value.substring(0, this.value.indexOf(";")));
    sessionStorage.setItem("lng", this.value.substring(this.value.indexOf(";") + 1));
    
    location.replace("map.html");                                               // Refer to the map page
    
} // End storeCoordinates