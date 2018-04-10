// JavaScript

// Global variables
var depmenuElem, coursemenuElem;									// References to select-elements for menu's
var depinfoElem, courselistElem;									// References to div-elements there provided data is writed



// Functions
function init() {   // Initialize page with global variables, eventhandlers and function calls
	
	// Declare HTML elements
	depmenuElem = document.getElementById("depmenu");
	coursemenuElem = document.getElementById("coursemenu");
	depinfoElem = document.getElementById("depinfo");
	courselistElem = document.getElementById("courselist");
	
	// Add function call for menu's
	addListener(depmenuElem, "change", selectDepartment);
	addListener(coursemenuElem, "change", selectCourses);
	
	// Check functions once when (re)loading the page
	selectDepartment();
	selectCourses();
	
} // End init
addListener(window,"load",init);									// Call to initialize when page is loaded



// ----- Menu 1 -----
function selectDepartment() {   // Read menu for choice of program for the institution
	
	// This function completely works on a Local Host server through
	// XAMPP Control Panel v3.2.2 with the Apache Module started
	// On the FirstClass server this method does not work properly and fetches the php file instead
	// The php file is supposed to fetch the XML file from a server
	// Firefox provides no errors in Firebug either with XAMPP or locale offline.
	
	// Preforming checks before executing this fuction
	if (depmenuElem[0].selected) {									// Stop this function if the first option in the menu is selected (empty button)
		if (depinfoElem != "")										// Reset the info if no department is selected
			depinfoElem.innerHTML = "";
		return;
	}
	
	// Local variables										
	var i;															// Loop counter
	var x;															// Stores all departments from the XML file
	var fileName = "getDepInfo.php?file=http://medieteknik.lnu.se/1me323/departments.xml&id=";	// Filename for the XML with server location	
	var xml = AJAXRequest();										// Request to use AJAX for a XML file (location included)
	
	// Check if AJAX is supported, otherwise end this function
	if (xml == null)
		return;
	
	// Get the current selected menu option
	for (i=0; i<depmenuElem.length; i++)
		if (depmenuElem[i].selected) {
			fileName += i;
			break;
		}
	
	xml.open("GET", fileName, true);								// Get and read the data from the xml file
	xml.send(null);													// Send xml request to server
	
	// Read and use the XML file
	xml.onreadystatechange = function () {							// Prepare to read XML data from server
		if (xml.readyState == 4 && xml.status == 200)				// Receive data when no errors are found
			getData(xml.responseXML);								// Process the XML data
	};
	
} // End selectDepartment



function getData(XMLcode) {   // Reading the XML data and convert it
	
	// Function is based on the code example from the course 1ME323 (LNU)
	// Lecture: 2, Example: 5, File: script.js, Function: getData(xmlCode)
	
	var i;															// Loop counter
	var infoElem;													// Info element of the XML file (to be accessed later)
	var depElems = XMLcode.getElementsByTagName("department");		// Department element of the XML file (fetch it now from the XML file)
	var HTMLcode = "";												// Code to add into the inner HTML (start the variable empty)
	
	for (i=0; i<depElems.length; i++) {								// Going through each department in the XML file
		infoElem = depElems[i].getElementsByTagName("info")[0];		// Get info element from current department
		HTMLcode += "<p> " + infoElem.firstChild.data + "</p>";		// Add info element into temporary code
	}
	
	depinfoElem.innerHTML = HTMLcode;								// Set the department info to the  temporary code
	
} // End getData



// ----- Menu 2 -----
function selectCourses() {   // Read menu for choice of courses for the program
	
	// Preforming checks before executing this fuction
	while (courselistElem.hasChildNodes())							// Keep emptying the course list as long it is not empty
		courselistElem.removeChild(courselistElem.childNodes[0]);
	if (coursemenuElem[0].selected)									// Stop this function if the first option in the menu is selected (empty button)
		return;
	
	// Local variables
	var i;															// Loop counter
	var x;															// Stores all courses from the XML file
	var newHeader, newParagraph, newLink, newAttribute, newText;	// New HTML objects to add
	var fileName = "xml/courselist";								// Filename for the XML, including location
	var xml = AJAXRequest();										// Request to use AJAX for a XML file (location included)
	
	// Check if AJAX is supported, otherwise end this function
	if (xml == null)
		return;
	
	// Get the current selected menu option
	for (i=0; i<coursemenuElem.length; i++) {
		if (coursemenuElem[i].selected) {
			fileName += i + ".xml";
			buttonName = coursemenuElem[i].innerHTML;
			break;
		}
	}
	
	xml.open("GET", fileName, true);								// Get and read the data from the xml file
    xml.send();														// Send xml request to server
	
	// Read and use the XML file
	xml.onreadystatechange = function() {							// Prepare to read XML data
		if (xml.readyState == 4 && xml.status == 200) {				// Receive data when no errors are found
			
			newHeader = document.createElement("h3");				// Create new header element
			newText = document.createTextNode(buttonName);			// Read current button name to add
			newHeader.appendChild(newText);							// Add current button name into new header
			courselistElem.appendChild(newHeader);					// Add new header into course list
			x = xml.responseXML.getElementsByTagName("course");		// Store the courses from the XML file in x
			
			for (i=0; i<x.length; i++) {							// Go through each course the XML file contains
				// Create new elements and attribute to push into the course list for each course later
				newParagraph = document.createElement("p");
				newLink = document.createElement("a");
				newAttribute = document.createAttribute("href");
				
				// Add the current course code into the new paragraph element
				newText = document.createTextNode(x[i].getElementsByTagName("code")[0].childNodes[0].nodeValue + ", ");
				newParagraph.appendChild(newText);
				
				// Add the course name and add an usable URL link too it, add into the new paragraph element
				newText = document.createTextNode(x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue);
				newAttribute.value = x[i].getElementsByTagName("link")[0].getAttribute('url');
				newLink.appendChild(newText);						// Apply text into URL link
				newLink.setAttributeNode(newAttribute);				// Add URL attribute into <a> tag element
				newParagraph.appendChild(newLink);					// Apply link into new paragraph
				
				// Add the current course credits into the new paragraph element
				newText = document.createTextNode(", " + x[i].getElementsByTagName("credits")[0].childNodes[0].nodeValue + "hp");
				newParagraph.appendChild(newText);
				
				// Add the current course contact person into the new paragraph element, but only if the current course contains a contact person
				if (x[i].getElementsByTagName("contact").length != 0) {
					newText = document.createTextNode(", Kontaktperson: " + x[i].getElementsByTagName("contact")[0].getElementsByTagName("name")[0].childNodes[0].nodeValue);
					newParagraph.appendChild(newText);
				}
				
				courselistElem.appendChild(newParagraph);			// Add the new paragraph into the course list, thus showing the result on the web page
			}
			
		}
	};
	
} // End selectCourses



function AJAXRequest() {   // Assign an object for AJAX support
	
	// Check first for XML HTTP support
	if (XMLHttpRequest)
		return new XMLHttpRequest();									
	
	// If not, try Active X Object support
	if (ActiveXObject)											
		return new ActiveXObject("Microsoft.XMLHTTP");
	
	// Otherwise AJAX is not supported, return an empty value
	alert("Tyvärr, inget stöd för AJAX på webbläsaren. Data kan inte läsas in.");
	return null;
	
} // End AJAXRequest