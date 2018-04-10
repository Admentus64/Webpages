// JavaScript Document



// ---------- Global Variables ----------
var globalLinks;                                                    // Contains all the global link elements
var globalToLocalLinks;												// Contains all the global to local elements
var currentGlobalLink;												// Contains the current global link
var latestGlobalLink;												// Contains the last visited global link
var activeGlobalLink;												// Contains pressed global link


// ---------- Functions ----------
function init() {   // Initialization of the program
	
	// Initialize variables and elements
	globalLinks = document.getElementById("global").getElementsByTagName("li");
	globalToLocalLinks = document.getElementById("globalToLocal").getElementsByTagName("li");
	document.getElementById("globalToLocal").style.visibility = "hidden";
	document.getElementById("globalToLocal").style.display = "none";
	currentGlobalLink = latestGlobalLink = "";
	
	// Add button presses for each link
	$(globalLinks).each(function(index) {
		if (globalLinks[index].className == "activeGlobal")
            activeGlobalLink = globalLinks[index];
        $(globalLinks[index]).click(function() {
			clickGlobalLink(this);
		});
    });
	
}   // End init

addListener(window, "load", init);														// Load this script when a page is loaded (this will be used for every page)



function clickGlobalLink(thisGlobalLink) {   // Controls the global links panel and their local links, allows the user to press the global links in order to access different pages
	
	if (latestGlobalLink != thisGlobalLink) {											// When pressing a different global link or when no global link is pressed yet
		if (thisGlobalLink.className == "inactiveGlobal" && latestGlobalLink !== "") {	// Don't forget to deselect the current selected global link when switching
			latestGlobalLink.className = "inactiveGlobal";
			activeGlobalLink.className = "activeGlobal";
		}
		else if (thisGlobalLink == activeGlobalLink && latestGlobalLink !== "") {		// Also check if the current selected global link is an active link when switching
			latestGlobalLink.className = "inactiveGlobal";
			activeGlobalLink.className = "activeGlobal";
		}
		
		latestGlobalLink = thisGlobalLink;												// Set the latest selected global link equal to the current selected global link
		document.getElementById("globalToLocal").style.visibility = "visible";			// Make the local link block (which contains the local links) part of the current selected global link visible
		document.getElementById("globalToLocal").style.display = "block";
		thisGlobalLink.className = "activeSelection";									// Highlight that the current selected global link is selected
		
		$(globalToLocalLinks).each(function(i) {										// Go through each local link
			if (globalToLocalLinks[i].className == thisGlobalLink.innerHTML) {			// Check if the each local link belongs to the current selected global link, if so make them visible
				globalToLocalLinks[i].style.visibility = "visible";
				globalToLocalLinks[i].style.display = "inline-block";
			}
			else {																		// Otherwise just render them invisible
				globalToLocalLinks[i].style.visibility = "hidden";
				globalToLocalLinks[i].style.display = "none";
			}
		});
		
	}
	else {                                                    							// When a global link is already selected
		if (thisGlobalLink == activeGlobalLink)											// Check if the current select link is active or inactive
			thisGlobalLink.className = "activeGlobal";									// Deselect the global link again, but make it the current active link again
		else thisGlobalLink.className = "inactiveGlobal";								// Deselect the global link again
		latestGlobalLink = "";															// Reset the latest selected global link
		document.getElementById("globalToLocal").style.visibility = "hidden";			// Hide the local links
		document.getElementById("globalToLocal").style.display = "none";
	}
	
}   // End clickGlobalLink