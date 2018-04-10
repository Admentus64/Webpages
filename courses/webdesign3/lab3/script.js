// JavaScript

// Global variables
var linkListElem;													// Reference to div-element for links
var courseListElem;													// Reference to div-element there chosen courses are added



// Functions
function init() {   // Initialize page with global variables, eventhandlers and function calls
	
	// Local variables
	var i;															// Loop counter
	var courseElems;												// Array with references to all li-elements in the second section
	
	// Declare HTML elements
	linkListElem = document.getElementById("linkList");
	courseListElem = document.getElementById("courseList");
	addListener(document.getElementById("linkBtn"), "click", listLinks);
	courseElems = document.querySelectorAll("main section:nth-of-type(2) div:first-of-type li");
	
	// Add function call for buttons and menu's
	for (i=0; i<courseElems.length; i++) {
		addListener(courseElems[i], "click", addCourse);
		courseElems[i].style.cursor = "pointer";
	}
	
	// Used for extra points
	addListener(document.getElementById("teacherBtn"), "click", addTeachers);
	
} // End init
addListener(window,"load",init);									// Call to initialize when page is loaded



function listLinks() {   // Copy all links from the main text and add them in a list
	
	// Stop this function is the clicked course already exists in the list
	if (linkListElem.hasChildNodes())
		return;
	
	// Local variables
	var listElems;													// Reference to the HTML code part to modify
	var newParagraph;												// New HTML objects to add		
	var clone;														// Copy of the link
	var i;															// Loop counter
	
	// Get the correct HTML code part to modify, searching for links
	listElems = document.querySelectorAll("main section:nth-of-type(1) div:first-of-type a");
	
	// Go through each found link
	for (i=0; i<listElems.length; i++) {
		newParagraph = document.createElement("p");					// Create a new <p> tag
		clone = listElems[i].cloneNode(true);						// Create a clone (copy) of the current found link
		clone.setAttribute("target", "_blank");						// Ensure that pressing the cloned link opens a new tab
		newParagraph.appendChild(clone);							// Apply the clone to the <p> tag
		linkListElem.appendChild(newParagraph);						// Apply the <p> tag to the Listed Links list
	}
	
} // End listLinks



function addCourse() {   // The course the users clicks on, add it at the top of the course list
	
	// Local variables
	var courseElems;												// Reference to the HTML code part to modify
	var newParagraph, newText;										// New HTML objects to add
	var i, j;														// Loop counters
	
	// Get the correct HTML code part to modify, searching for listed items (courses)
	courseElems = document.querySelectorAll("main section:nth-of-type(2) div:first-of-type li");
	
	// Go through each found course
	for (i=0; i<courseElems.length; i++)
		if (this == courseElems[i]) {									// Continue if the current found course equals the pressed course
			//if (courseListElem.contains(this.innerHTML))				// Contains does not work on Google Chrome
			if (courseListElem.innerHTML.indexOf(this.innerHTML) >= 0)	// Stop this function if the course is present in the chosen courses list
				return;
		}
		
	// Add the found course into the course list
	newText = document.createTextNode(this.innerHTML);		// Store the found course in newT
	newParagraph = document.createElement("p");									// Create a new <p> tag
	newParagraph.appendChild(newText);											// Apply newT into the <p> tag
	courseListElem.insertBefore(newParagraph, courseListElem.childNodes[0]);	// Place the new element on top in the chosen courses list
	addListener(newParagraph, "click", removeCourse);							// Add a listener for the pressed course
	newParagraph.style.cursor = "pointer";										// Change cursor to a pointer when hovering above it
	
} // End addCourse



function removeCourse() {   // The course the user click on in the course list, remove it
	
	courseListElem.removeChild(this);								// Removes the called element from the HTML code
	
} // End removeCourse



// ----- Extra points -----
function addTeachers() {   // Function that adds the teacher for the course in the course list
	
	// Not required anymore when going for the gold star task
	// var teachers = ["Rune Körnefors", "David Johansson", "Karl Lohan Rosqvist"];
	// var teacherLinks = ["http://lnu.se/personal/rune.kornefors", "http://lnu.se/personal/david.johansson", "http://lnu.se/personal/karl.johan.rosqvist"];
	
	var i, j;														// Loop counters
	var teacherElems;												// Should refer to all listed courses in the teachers section
	var newLink, newText, newAttribute;								// New HTML objects to add
	var x;															// Stores all courses from the XML file
	var courseCode;													// Checking the course code from the HTML code
	var fileName = "teachers.xml";									// Filename for the XML, including location
	var xml = AJAXRequest();										// Request to use AJAX for a XML file (location included)
	
	// Check if AJAX is supported, otherwise end this function
	if (xml == null)
		return;
	
	// Get the correct HTML code part to modify, searching for listed items (courses that contains teachers)
	teacherElems = document.querySelectorAll("main section:nth-of-type(3) div:first-of-type li");
	
	// A simply check if teachers are already added, if so end this function
	// The check searches if an <a> tag exists (link for the teacher)
	for (i=0; i<teacherElems.length; i++)
		if (teacherElems[i].getElementsByTagName("a").length != 0)
			return;
	
	xml.open("GET", fileName, true);								// Get and read the data from the xml file
    xml.send(null);														// Send xml request to server
	
	// Read and use the XML file
	xml.onreadystatechange = function() {
		if (xml.readyState == 4 && xml.status == 200) {
			
			x = xml.responseXML.getElementsByTagName("course");		// Store the courses from the XML file in x
			
			for (i=0; i<x.length; i++) {							// Go through each course the XML file contains
				// Add break line into teacher list + create new element and attribute to add into teacher list
				teacherElems[i].appendChild(document.createElement("br"));
				newLink = document.createElement("a");
				newAttribute = document.createAttribute("href");
				
				// Get current course code from HTML
				courseCode = teacherElems[i].innerHTML.substring(0, teacherElems[i].innerHTML.indexOf(','));
				
				// Get the course teacher for current course code
				for (j=0; j<x.length; j++)
					if (courseCode == x[j].getAttribute('code')) {
						newText = document.createTextNode(x[j].getElementsByTagName("teacher")[0].childNodes[0].nodeValue);
						newAttribute.value = x[j].getElementsByTagName("link")[0].getAttribute('url');
						newLink.setAttribute("target", "_blank");	// Open a new tab when clicking the URL link
						newLink.appendChild(newText);				// Apply text into URL link
						newLink.setAttributeNode(newAttribute);		// Apply new attribute into URL link (new tab)
						break;
					}
				
				teacherElems[i].appendChild(newLink);				// Add the newly created link element into the current course, thus showing the result on the web page
			}
			
		}
	};
	
} // End addTeachers



function AJAXRequest() {   // Assign an object for AJAX support
	
	// Check first for XML HTTP support
	if (XMLHttpRequest)
		return new XMLHttpRequest();									
	
	// If not, try Active X Object support
	if (ActiveXObject)											
		return new ActiveXObject("Microsoft.XMLHTTP");
	
	// Otherwise AJAX is not supported, return an empty value
	alert("Tyvärr, inget stöd för AJAX, så data kan inte läsas in.");
	return null;
	
} // End AJAXRequest