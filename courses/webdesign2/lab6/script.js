// JavaScript Document

// Global variables
var formElem;												// Reference to elements from form
var totalCostElem;											// Reference to element for total price
var re;														// Array with several 
var errMsg;													// Array with several preset error text outputs



// Functions to run when the webpage is loaded (all HTML-code is executed)
function init() {   // Initialize global variables and relates functions to buttons
	
	// Local variables
	var i;													// Loop variable
	
	// Refering to HTML code
	formElem = document.getElementById("booking");			// Link form element from HTML code location
	totalCostElem = document.getElementById("totalCost");	// Link total cost element from HTML code location
	
	// Add eventhandlers to read price and check if it is a family room for each roomType element
	for (i=0; i<formElem.roomType.length; i++) {
		addListener(formElem.roomType[i], "click", checkIfFamilyRoom);
		addListener(formElem.roomType[i], "click", calculateCost);
	}
	// Add eventhandler to read price for each addition element
	for (i=0; i<formElem.addition.length; i++)
		addListener(formElem.addition[i], "click", calculateCost);
	// Add eventhandler to read price for each nights element
	for (i=0; i<formElem.nights.length; i++)
		addListener(formElem.nights[i], "click", calculateCost);
	
	// Calling functions
	checkIfFamilyRoom();									// Preset the form with checking if current selected room is a family room
	calculateCost();										// Preset the form with checking the current with current selected buttons
	
	// Add eventhandlers to check city name, zipcode and telephone number
	addListener(formElem.city, "blur", checkCity);
	addListener(formElem.zipcode, "blur", checkZipcode);
	addListener(formElem.telephone, "blur", checkTelephone);
	
	// Add eventhandlers to check the campaign code (exists out of several functions)
	addListener(formElem.campaigncode, "focus", startCheckCampaign);
	addListener(formElem.campaigncode, "keyup", checkCampaign);
	addListener(formElem.campaigncode, "blur", endCheckCampaign);
	
	// Static variables
	re = [													// Preset a regular expresion for proper zipcodes and telephone numbers
		/^\d{3} ?\d{2}$/,									// Zipcode
		/^0\d{1,3}[-/ ]?\d{5,8}$/							// Telephone
	];
	errMsg = [												// Preset error message if regular expressions are not satisfied
		"Postnumret måste bestå av fem siffror.",
		"Telnr måste börja med en 0:a och sedan 6-11 siffror."
	];
	
} // End init
addListener(window,"load",init);							// Active function init when the page is loaded



function checkIfFamilyRoom() {   // Checking if the current selected room is a family room, certain options will enable or disable
	
	if (formElem.roomType[2].checked) {						// If current room is family room
		formElem.persons.disabled = false;					// Enable option to select amount of persons, set color to black
		formElem.persons.parentNode.style.color = "#000";
		formElem.addition[2].disabled = true;				// Disable option to have sight at sea, set color to gray
		formElem.addition[2].parentNode.style.color = "#999";
	}
	else {													// Otherwise
		formElem.persons.disabled = true;					// Disable option to select amount of persons, set color to gray
		formElem.persons.parentNode.style.color = "#999";
		formElem.addition[2].disabled = false;				// Enable option to have sight at sea, set color to black
		formElem.addition[2].parentNode.style.color = "#000";
	}
	
} // End checkIfFamilyRoom



function calculateCost() {   // Calculating the total price to stay, using room type, amount of nights and additions
	
	// Local variables
	var i;													// Loop counter
	var elemValue;											// Temporary string read-in for current element reading from HTML code
	var roomPrice;											// Room price for each type as an array
	var nightsIndex;										// Price for selected amount of nights
	var nrOfNights;											// Select amount of nights refering by index value
	
	// Calculating room price
	for (i=0; i<formElem.roomType.length; i++)				// Go through each available room option
		if (formElem.roomType[i].checked) {					// Continue when selected room option is found
			elemValue = formElem.roomType[i].value;			// Reading HTML code string for selected room option
			roomPrice = Number(elemValue.split(",")[1]);	// Properly read and parse room price, using only integer values from HTML code
			break;											// Room is found and read, stop this loop
		}
	// Calculating additions prices
	for (i=0; i<formElem.addition.length; i++)				// Go throuch each available addition, only check options which are checked and available
		if (formElem.addition[i].checked && !formElem.addition[i].disabled) {
			elemValue = formElem.addition[i].value;			// Reading HTML code string for current addition option
			roomPrice += Number(elemValue.split(",")[1]);	// Properly read and parse addition price, using only integer values from HTML code, add into price room
		}
	
	// Finishing
	nightsIndex = formElem.nights.selectedIndex;			// Read current selected amount of nights using index value and read price value as a number
	nrOfNights = Number(formElem.nights.options[nightsIndex].value);
	totalCostElem.innerHTML = nrOfNights * roomPrice;		// Calculate total price using room price and amount of nights and present output answer
	
} // End calculateCost



function checkCity() {   //  Checking city name input and convert it to upper case
	
	// Local variables
	var city;												// City name
	
	// Converting to upper case
	city = formElem.city.value;								// Read text from City label and store within city variable
	city = city.toUpperCase();								// Convert city variable text to upper case letters
	formElem.city.value = city;								// Replace text from City label with upper case letters from city variable
	
} // End checkCity



function checkZipcode() {   // Checking if zipcode satifies the first regular expression
	
	checkField(formElem.zipcode, 0);						// Send text from Zipcode label to checkField function to check with first regular expression
	
} // End checkZipcode



function checkTelephone() {   // Checking if zipcode satifies the second regular expression
	
	checkField(formElem.telephone, 1);						// Send text from Telephone label to checkField function to check with second regular expression
	
} // End checkTelephone



function startCheckCampaign() {   // Start the check for the campaign code (called when label is clicked on)
	
	this.style.backgroundColor = "#F99";					// Set label color to red
	this.select();											// Select the campaign code label
	
} // End startCheckCampaign



function endCheckCampaign() {   // End the check for the campaign code (called when label is clicked away from)
	
	this.style.backgroundColor = "";						// Remove color from label and convert all letters to upper case
	formElem.campaigncode.value = formElem.campaigncode.value.toUpperCase();
	
} // End endCheckCampaign



function checkCampaign() {   // Check for the campaign code (called when releasing a keyboard key)
	
	// Local variables
	var re;													// A local regular expression temporary overwritting the global version
	
	// Running the regular expression and setting a value to use with
	// First three symbols are swedish letters (upper- or lowercase), fourth symbol is -
	// Fifth and sixth symbol are digits, seventh symbol is -
	// Eight symbol is sedish letter (upper- or lowercase), last symbol is digit
	re = new RegExp(/^[a-öA-Ö]{3}[-][0-9]{2}[-][a-öA-Ö][0-9]$/m);
	if (re.test(this.value))								// Check the regular expression for provided label text for campaign code
		this.style.backgroundColor = "#6F9";				// If correct, set label color green
	else this.style.backgroundColor = "#F99";				// Otherwise, set label color red
	
} // End endCheckCampaign



function checkField(theField, index) {   // Code for checking regular expressions, code provided by course, comments added
	
	// Local variables
	var errMsgElem;											// Reference to other span-element
	
	// Select error message to use with provided index value, keep it empty yet
	errMsgElem = theField.parentNode.parentNode.getElementsByTagName("span")[1];
	errMsgElem.innerHTML = "";
	if (!re[index].test(theField.value)) {					// Check if label this function received does not follow provided regular expression
		errMsgElem.innerHTML = errMsg[index];				// When incorrect, add and print provided error message using index value and return false value
		return false;
	}
	else return true;										// Otherwise, label has correct input, thus return true value
	
} // End checkField