// JavaScript Document



// ---------- Initialization ----------
function init() {   // Initialize global variables and link functions to buttons
	
	// Create new options to add for the genres object
	var newOptions = [];
	newOptions.push(createOption("Rollspel"));
	newOptions.push(createOption("Plattformsspel"));
	newOptions.push(createOption("Actionspel"));
	
	// Create new objects
	genres.init(newOptions);
	games.init();
	info.init();
	
} // End init
addListener(window, "load", init);									// Call initialization when finished loading page



// ---------- Global Functions ----------
function createOption(text) {   // Create a new option element
	
	var newOption = document.createElement("option");				// Create element
	newOption.appendChild(document.createTextNode(text));			// Add text to element
	return newOption;												// Return element
	
} // End createOption

function AJAXRequest() {   // Assign an object for AJAX support
	
	if (XMLHttpRequest)												// Check first for XML HTTP support
		return new XMLHttpRequest();									
	if (ActiveXObject)												// If not, try Active X Object support									
		return new ActiveXObject("Microsoft.XMLHTTP");
	alert("Tyvärr, inget stöd för AJAX, så data kan inte läsas in.");
	return null;													// Otherwise AJAX is not supported, return an empty value
	
} // End AJAXRequest

function bubbleSort(arr, start) {   // Running bubble sort (pseudo code studied from: https://en.wikipedia.org/wiki/Bubble_sort)
	
	// Setup
	if (start < 0)													// Return if the starting value is below zero
		return;
	var temp, done;
	
	// Sort
	do {															// Keep sorting as long there is something sortable
		done = false;												// Nothing sorted yet
		for (var i=start; i<arr.length-1; i++)						// Go through each value to start
			if (arr[i].innerHTML > arr[i+1].innerHTML) {			// Check if current element has lower value than next element
				temp = arr[i].innerHTML;							// Sort it! Swap both elements by using a temporary element.
				arr[i].innerHTML = arr[i+1].innerHTML;
				arr[i+1].innerHTML = temp;
				done = true;										// Sorted an element
			}
	} while(done);
	
} // End bubbleSort