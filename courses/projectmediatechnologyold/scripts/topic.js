// JavaScript Document



// ---------- Functions ----------
function AJAXRequest() {   // Assign an object for AJAX support
	
	if (XMLHttpRequest)                                             // Check first for XML HTTP support
		return new XMLHttpRequest();
	if (ActiveXObject)			                                    // If not, try Active X Object support								
		return new ActiveXObject("Microsoft.XMLHTTP");
	alert("There is no support for AJAX, the read is not read.");   // Otherwise AJAX is not supported, return an empty value
	return null;
	
} // End AJAXRequest

function getTopic(filePath, textElem) {   // Retrieve information from a file and add it into the requested HTML part
	
	// Local variables
	var text = AJAXRequest();										// Request to use AJAX for a XML file (location included)
	
	if (text === null)                                              // Check if AJAX is supported, otherwise end this function
		return;
	text.open("GET", filePath, true);								// Get and read the data from the text file
	text.send(null);												// Send text request to server
	
	text.onreadystatechange = function () {							// Prepare to read text data
		if (text.readyState == 4 && text.status == 200)			    // Receive data when no errors are found
            textElem.innerHTML = text.responseText;                 // Use the text file data
    };
	
} // End getTopic

function prepareTopics(filePath, topic, list) {   // Make the content of the page changable when selecting a different topic
    
    $(topic).each(function(index) {									// Go through each topic button
        if (topic[index].checked)									// Retrieve the information linked to that topic for the page
            getTopic(filePath + (index + 1) + ".txt", list);
		// Also make it possible to switch out the information when changing between topics
        $(topic[index]).change(function() { getTopic(filePath + (index + 1) + ".txt", list); });
    });
        
} // End prepareTopics

function prepareHeader(topic, header, prefix) {   // Make the topic header changable to reflect a proper title
	
	// Make an valid empty prefix if not empty
	if (prefix === undefined || prefix === null)
		prefix = "";
	
    $(topic).each(function(index) {								// Go through each topic button
        if (topic[index].checked)								// Set the header equal to the selected topic button's title
            header.innerHTML = prefix + topic[index].value;
		// Also make the topic header changable when changing between topics
        $(topic[index]).change(function() { header.innerHTML = prefix + topic[index].value; });
    });
	
} // End prepareHeader