// JavaScript Document

// ---------- Initialization ----------
function init() {   // Initialize global variables and link functions to buttons
	
	category.init();												// Create category object
	list.init();													// Create list object
	ssStyle.init();													// Create ssStyle object
	
	// Add event for clicking on "Gå till bildspelet" button to access the slide show page
	addListener(document.getElementById("goBtn"), "click", function() { location.href = "slideshow.htm"; });
	
} // End init
addListener(window, "load", init);									// Run the initialization after the page is loaded



// ---------- Object category ----------
var category = {
	
	// Local variables
    menu: null,														// Refer to category menu element
	images: null,													// Refer to element where små images are added
	largeImg: null,													// Refer to big image element
	
	init: function() {   // Initialize variables and events
		
		// Initialize the refered elements
		category.menu = document.getElementById("categoryMenu");
		category.images = document.getElementById("images");
		category.largeImg = document.getElementById("largeImg");
		
		category.menu.selectedIndex = 0;							// Set category menu to first option
		addListener(category.menu, "change", category.choose);		// Add event for changing an option in the menu
		
	}, // End init
	
	choose: function() {   // Read menu for choosing a category
					
		category.request(category.menu.selectedIndex);				// Index for chosen option i menu = number for chosen category
		category.menu.selectedIndex = 0;							// Set category menu to first option (default option thus)
		
	}, // End choose
	
	request: function(nr) {   // Make an AJAX-call to read chosen file
		
		// Parameter nr is used in url:en for chosen file that is read
		var request;												// Object for AJAX-call
		
		// Initialize AJAX
		if (XMLHttpRequest)
			request = new XMLHttpRequest();							// Different objects (XMLHttpRequest or ActiveXObject), depending on browser
		else if (ActiveXObject)
			request = new ActiveXObject("Microsoft.XMLHTTP");
		else {
			alert("Tyvärr inget stöd för AJAX, så listan kan inte läsas in");
			return false;
		}
		
		// Run AJAX
		request.open("GET", "categories/images" + nr + ".xml", true);
		request.send(null);											// Send request to the server
		request.onreadystatechange = function () {					// Function to check status in the communication
			if (request.readyState == 4 && request.status == 200)	// When communication is ready readyState is 4 and if file exists status is 200 (OK)
				category.get(request.responseXML);					// Interpret data from read file
		};
		
	}, // End request
	
	get: function(XMLcode) {   // Function to interpret XML-code and to create HTML-cod with content shown on page
		
		// Parameter XMLcode is the whole read XML-code
		// I form "imgForm" must first category being added as a h3 element, then must each image being added by the following structure:
		//	<div>
		//		<p>*** Imagetext from XML-code ***</p>
		//		<img src="*** URL of XML-code ***" alt="">
		//	</div>
		
		// Local variables
		var i;																			// Loop counter
		var categoryElem = XMLcode.getElementsByTagName("category");					// Refer to category element of XML-code
		var urlElems = XMLcode.getElementsByTagName("url");								// Array with all li elements of XML-code
		var captionElems = XMLcode.getElementsByTagName("caption");						// Array with all caption elements of XML-code
		var HTMLcode = "<h3>" + categoryElem[0].firstChild.data + "</h3>";				// Textstring for the HTML-code to be added
		var imgElems = document.getElementById("images").getElementsByTagName("img");	// Array with references to all new img-tags for the small images
		
		// Writing and using HTML code
		for (i=0; i<urlElems.length; i++)							// Going through each url and add each read image into the temporary HTML code
			HTMLcode += '<div><p>' + captionElems[i].firstChild.data + '</p><img src="' + urlElems[i].firstChild.data + '" alt=""></div>';
		category.images.innerHTML = HTMLcode;						// Add temporary HTML code to the page
		
		// Adding listeners
		for (i=0; i<imgElems.length; i++) {							// Going through each image
			addListener(imgElems[i], "mouseover", category.enlarge);
			addListener(imgElems[i], "click", list.add);
		}
		
	}, // End get
	
	enlarge: function() {   // Show enlarged version of the small image when hovering with the mouse over
		
		category.largeImg.src = this.src;
		
	} // End enlarge
	
	
}; // End object category



// ---------- Object list ----------
var list = {
	
	// Local variables
	images: [],														// Array with all images in the list
	elem: null,														// Refer to the list element itself
	img: null,														// Refer to the small images in the list
	
	init: function() {   // Initialize variables and events
		
		// Initialize the refered elements
		list.elem = document.getElementById("list");
		list.img = document.getElementById("listImg");
		
		// Add event for pressing the "Save List" button
		addListener(document.getElementById("saveBtn"), "click", list.save);
		
	}, // End init
	
	add: function() {   // Add the clicked image into the list, title should show on the page, both title and url must save in the arrays (or array that stores both values)
		
		// Local variables
		var titleElem = this.parentNode.getElementsByTagName("p")[0];		// Refer to the element that includes the title of the image
		var newElem =  titleElem.cloneNode(true);							// New element to add
	
		// Listeners
		addListener(newElem, "click", list.remove);							// Click to remove it
		addListener(newElem, "mouseover", list.show);						// Hover over it to show it
		addListener(newElem, "mouseout", list.hide);						// Hover away to hide it again
	
		// Append and push
		list.elem.appendChild(newElem);										// Extend the list with the new element
		list.images.push(new ImgObj(this.src, titleElem.innerHTML));		// Add new image with information into list
		
	}, // End add
	
	remove: function() {   // Remove the title when the user clicks on it in the list, thus remove the element with url and title from array
		
		var ix = list.get(this);;									// Index to marked image
		list.images.splice(ix, 1);									// Remove the clicked item from the array containing the information
		list.elem.removeChild(this);								// Remove the clicked item from the list
		list.img.style.visibility = "hidden";						// Hide the small image, in case it was showing
		
	}, // End remove
	
	get: function(thisP) {   // Get the index value for an image in the list
		
		// thisP is refering to the p-tag that is to be searched from the list
		var pElems = list.elem.getElementsByTagName("p");			// Array with references to all p-tags in the list
		
		// Find the p-tag
		for (var i=0; i<pElems.length; i++)							// Go through each p-tag
			if (pElems[i] == thisP)									// Check if the current p-tag is the requested p-tag
				return i;											// Return index to current p-tag
		
	}, // End get
	
	show: function(e) {   // Show a small "popup"-image for the title the mouse is hovering over
		
		// e is the event-object
		list.img.src = list.images[list.get(this)].url;					// Get the image from the list requiring the "popop"-image
		list.img.style.left = (e.clientX+window.pageXOffset+5) + "px";	// e.clientX and e.clientY are the coordinates of the mouse on the page
		list.img.style.top = (e.clientY+window.pageYOffset+5) + "px";	// window.pageXOffset and window.pageYOffset is the amount of pixel being scrolled in the page
		list.img.style.visibility = "visible";							// Make the "popup"-image image visible
		
	}, // End show
	
	hide: function() {   // Hide the small "popup"-image
		
		list.img.style.visibility = "hidden";
		
	}, // End hide
	
	save: function() {   // Save the list as a cookie, use #.# as separators in the arrays, which itself is not part of an URL or title
		
		// Local variables
		var localUrl = [];											// Array containing all URL:s
		var localCaption = [];										// Array containing all captions
		
		// Get all URL:s and captions
		for (var i=0; i<list.images.length; i++) {					// Go through each image in the list
			localUrl.push(list.images[i].url);						// Store the current image URL in the array
			localCaption.push(list.images[i].caption);				// Store the current image caption in the array
		}
		
		// Save as a cookie
		localStorage.imgUrls = localUrl.join("#.#");				// Store all URL:s in a cookie
		localStorage.imgCaptions = localCaption.join("#.#");		// Store all captions in a cookie
		
	} // End save
	
}; // End object list



// ---------- Object (Reference Type) ImgObj ----------
ImgObj = function(url, caption) {
	
	this.url = url;
	this.caption = caption;
	
} // End constructor for object ImgObj



// ---------- Object ssStyle ----------
var ssStyle = {
	
	// Local variables
	bgColor: null,													// Refer to the background color button
	txColor: null,													// Refer to the text color button
	txStyle: null,													// Refer to the text style buttons
	frame: null,													// Refer to the frame options
	
	init: function() {   // Initialize variables and events
		
		// Initialize the refered elements
		ssStyle.bgColor = document.getElementsByName("bgColor")[0];
		ssStyle.txColor = document.getElementsByName("captionColor")[0];
		ssStyle.txStyle = document.getElementsByName("captionStyle");
		ssStyle.frame = document.getElementsByName("frameStyle")[0].getElementsByTagName("option");
		
		// Add event for pressing the "Spara stil" button
		addListener(document.getElementById("saveStyleBtn"), "click", ssStyle.save);
		
		ssStyle.retrieve();											// Retrieve the last chosen style
		
	}, // End init
	
	retrieve: function() {   // Retrieve the last chosen style from saved cookies
		
		// Local variables
		var i;														// Loop counter
		
		// Color buttons
		if (localStorage.bgColor)									// Check if cookie exists then get the last chosen background color
			ssStyle.bgColor.value = localStorage.bgColor;
		if (localStorage.txColor)									// Check if cookie exists then get the last chosen text color
			ssStyle.txColor.value = localStorage.txColor;
		
		// Text style
		if (localStorage.txStyle)									// Check if cookie exists then go through each text style button
			for (i=0; i<ssStyle.txStyle.length; i++)
				if (ssStyle.txStyle[i].value == localStorage.txStyle) {
					ssStyle.txStyle[i].checked = true;				// Check the text style button that equals the same value as saved in the cookie
					break;											// No need to check further
				}
		
		// Frame style
		if (localStorage.frame)										// Check if cookie exists then go through each frame style option
			for (i=0; i<ssStyle.frame.length; i++)
				if (ssStyle.frame[i].value == localStorage.frame) {
					ssStyle.frame[i].selected = true;				// Select the frame button that equals the same value as saved in the cookie
					break;											// No need to check further
				}
		
	}, // End retrieve
	
	save: function() {
		
		// Local variables
		var i;														// Loop counter
		
		// Color buttons
		localStorage.bgColor = ssStyle.bgColor.value;				// Save the background color value in a cookie
		localStorage.txColor = ssStyle.txColor.value;				// Save the text color value in a cookie
		
		// Text style
		for (i=0; i<ssStyle.txStyle.length; i++)					// Go through each text style button
			if (ssStyle.txStyle[i].checked)							// Save the text style value in a cookie from the button that is checked
				localStorage.txStyle = ssStyle.txStyle[i].value;
		
		// Frame style
		for (i=0; i<ssStyle.frame.length; i++)						// Go through each frame style option
			if (ssStyle.frame[i].selected)							// Save the text style value in a cookie from the option that is selected
				localStorage.frame = ssStyle.frame[i].value;
		
	} // End save
	
}; // End object ssStyle