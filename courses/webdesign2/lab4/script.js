// JavaScript

// Global variables
// Words and images
var allPics;												// Array with all words
var allDescription;											// Array with short descriptions of all words/images
var picsIx4;												// Array with number (index to allPics) for the four images which will show 
var words8;													// Array med de åtta ord som ska finnas i listan (sorteras i bokstavsordning) Array with the eight words that are in th list (alphabetical order)
// Interface elements
var startGameBtn;											// Reference to the start game button
var checkAnswersBtn;										// Reference to the check answers button
var wordListElem;											// Reference to the list with all draggable words (ul-element)
var	wordElems;												// Array with references to elements for the eight words (li-element)
var picsElems;												// Array with references to elements for the four images (img)
var userAnswerElems;										// Array with references to elements for words for the images (span)
var correctAnswerElems;										// Array with references to elements for the right answer (span)
var largePictElem;											// Reference to the enlarged image element (img)
var msgElem; 												// Reference to the div-element for printing the message (div)
// Drag and drop elements
var dragWordElem;											// The ords which are draggable (can be both li och span)



// Functions to run when the webpage is loaded (all HTML-code is executed)
function init() {   // Initialize global variables and eventhandlers
	
	// Local variables
	var i;													// Loop counter
	
	// Initialize variables
	picsIx4 = [];											// The 4 images
	words8 = [];											// The 8 words
	
	// Words and images
	allPics = ["Borgholm","Gränna","Gävle","Göteborg","Halmstad","Jönköping","Kalmar","Karlskrona","Kiruna","Ljungby","Malmö","Norrköping","Skara","Stockholm","Sundsvall","Umeå","Visby","Västervik","Växjö","Örebro"];
	allDescription = [" - Kyrkan"," - Storgatan"," - Julbock"," - Operan"," - Picassoparken"," - Sofiakyrkan"," - Domkyrkan"," - Rosenbom"," - Stadshus"," - Garvaren"," - Stortorget"," - Spårvagn"," - Domkyrka"," - Rosenbad"," - Hotell Knaust"," - Storgatan"," - Stadsmur"," - Hamnen"," - Teater"," - Svampen"];
	
	// References to elements in the interface
	startGameBtn = document.getElementById("startGameBtn");
	checkAnswersBtn = document.getElementById("checkAnswersBtn");
	wordListElem = document.getElementById("words").getElementsByTagName("ul")[0];
	wordElems = document.getElementById("words").getElementsByTagName("li");
	picsElems = document.getElementById("pics").getElementsByTagName("img");
	userAnswerElems = document.getElementsByClassName("userAnswer");
	correctAnswerElems = document.getElementsByClassName("correctAnswer");
	largePictElem = document.getElementById("largePict");
	msgElem = document.getElementById("message");
	
	// Add eventhandlers
	addListener(startGameBtn, "click", startGame);				// Start button can be used when clicked on
	addListener(checkAnswersBtn, "click", checkAnswers);		// Check answers button can be used when clicked on
	for (i=0; i<picsElems.length; i++) {						// Each image can be enlarged when hovering over and returns to normal size when fading
		addListener(picsElems[i], "mouseover", showLargePict);
		addListener(picsElems[i], "mouseout", hideLargePict);
	}
	
	// Enable / disable buttons
	startGameBtn.disabled = false;
	checkAnswersBtn.disabled = true;
		
} // End init
addListener(window, "load", init);							// Active function init when the page is loaded



function startGame() {   // Initialize the game, choose random words, show words and images
	
	// local variables
	var i;													// Loop counter
	var r;													// Random number
	var tempList;											// Local copy of allPics
	
	tempList = allPics.slice(0);							// Copy tempList into allPics as a new array
	
	// Adding 4 correct words to 4 images
	for (i=0; i<4; i++) {									// Run four times, starting at index value 0 up to 3
		r = Math.floor(tempList.length * Math.random());	// Create random number based on the remaining elements in tempList
		words8[i] = tempList[r];							// Add word from tempList using the random number index into the words8 with the current loop index
		picsIx4[i] = allPics.indexOf(tempList[r]);			// Link the chosen word to the image array picsIx4
		tempList.splice(r, 1);								// Remove selected word from tempList using the random number index
	}
	
	// Adding 4 incorrect words
	for (i=4; i<8; i++) {									// Run four times, starting at index value 4 up to 7
		r = Math.floor(tempList.length * Math.random());	// Create random number based on the remaining elements in tempList
		words8[i] = tempList[r];							// Add word from tempList using the random number index into the words8 with the current loop index
		tempList.splice(r, 1);								// Remove selected word from tempList using the random number index
	}
	words8.sort();											// Sort chosen words in alphabetical order
	
	// Store all 8 words on the webpage
	for (i=0; i<words8.length; i++)							// Add chosen words into the html code to make it visible to read
		wordElems[i].innerHTML = words8[i];
	
	// Adding 4 images to 4 correct words
	for (i=0; i<picsIx4.length; i++) {
		picsElems[i].src = "pics/" + picsIx4[i] + ".jpg";	// Locate the image source to make it visible
		userAnswerElems[i].innerHTML = "";					// Reset the chosen user answers
		correctAnswerElems[i].innerHTML = "";				// Reset the correct user answers
	}
	
	// Final touches
	eventsForDrag(true);									// Activate dragging
	startGameBtn.disabled = true;							// Disable the start button
	checkAnswersBtn.disabled = false;						// Enable the check answers button
	
} // End startGame



function eventsForDrag(drag) {   // Add or remove eventhandlers for draggable elements and elements that support droppable words
	
	// Local variables
	var i;													// Loop counter
	
	// Dragging is used
	if (drag) {
		for (i=0; i<wordElems.length; i++) {				// Go through each word
			wordElems[i].draggable = true;					// Make it draggble and add it to an eventhandler
			addListener(wordElems[i], "dragstart", dragStarted);
		}
		for (i=0; i<picsElems.length; i++) {				// Go through each image and add it to eventhandlers when dragging over or dropping
			addListener(picsElems[i], "dragover", wordOverPict);
			addListener(picsElems[i], "drop", wordOverPict);
		}
		for (i=0; i<userAnswerElems.length; i++) {			// Go through each user answer
			userAnswerElems[i].draggable = true;			// Make it draggble and add it to an eventhandler
			addListener(userAnswerElems[i], "dragstart", dragStarted);
		}
		// Add eventhandlers for dragging over and dropping words
		addListener(wordListElem, "dragover", wordOverList);
		addListener(wordListElem, "drop", wordOverList);
	}
	// Dragging is not used
	else {
		for (i=0; i<wordElems.length; i++) {				// Go through each word
			wordElems[i].draggable = false;					// Stop dragging and remove eventhandler
			removeListener(wordElems[i], "dragstart", dragStarted);
		}
		for (i=0; i<picsElems.length; i++) {				// Go through each image and remove eventhandlers
			removeListener(picsElems[i], "dragover", wordOverPict);
			removeListener(picsElems[i], "drop", wordOverPict);
		}
		for (i=0; i<userAnswerElems.length; i++) {			// Go through each user answer
			userAnswerElems[i].draggable = false;			// Stop dragging and remove eventhandler
			removeListener(userAnswerElems[i], "dragstart", dragStarted);
		}
		// Remove eventhandlers for dragging over and dropping words
		removeListener(wordListElem, "dragover", wordOverList);
		removeListener(wordListElem, "drop", wordOverList);
	}
	
} // End eventsForDrag



function showLargePict() {   // Show enlarged image
	
	largePictElem.src = this.src;							// Use the same image file path for the larger image section to show a larger image version
	
} // End showLargePict



function hideLargePict() {   // Hide enlarged image
	
	largePictElem.src = "pics/empty.png";					// Make the enlarged image invisble by replacing it with a transparent empty image
	
} // End hideLargePict



function dragStarted(e) {   // A word is being dragged
	
	e.dataTransfer.setData("text", this.innerHTML);			// Use dataTransfer to set text content in HTML code of current event
	dragWordElem = this;									// Set the current dragged element to this event
	
} // End dragStarted



function wordOverPict(e) {   // Handle events dragover and drop, when words are released over an image (only drop for now)
	
	// Local variables
	var i;													// Index counter
	
	// Setup
	e.preventDefault();										// Prevent the webbrowser from doing unexpected things when releasing dragged objects
	
	// Handle drops
	if (e.type == "drop") {									// Continue if event is drop-event
		dragWordElem.innerHTML = "";						// Reset current dragged element
		i = this.id;										// Set index value to event ID value
		if (userAnswerElems[i].innerHTML != "")
			moveBackToList(userAnswerElems[i].innerHTML);	// If user answer is chosen then return that word back into word list
		// Use dataTransfer to move text content into HTML code, showing chosen user answer for image
		userAnswerElems[i].innerHTML = e.dataTransfer.getData("text");
	}
	
} // End wordOverPict



function wordOverList(e) {   // Handle events dragover and drop, when words are released over a word list (only drop for now)
	
	// Setup
	e.preventDefault();										// Prevent the webbrowser from doing unexpected things when releasing dragged objects
	
	// Handle drops
	if (e.type == "drop") {									// Continue if event is drop-event
		dragWordElem.innerHTML = "";						// Reset current dragged element
		moveBackToList(e.dataTransfer.getData("text"));		// Use dataTransfer to move text content back into word list
	}
	
} // End wordOverList



function moveBackToList(word) {   // Return the word (a variable) back to the word list
	
	// Local variables
	var i;													// Index value
	
	// Returning
	i = words8.indexOf(word);								// Get index value from the current used word in the array
	wordElems[i].innerHTML = words8[i];						// Return chosen word into HTML code making it usable / visable again
	
} // End moveBackToList



function checkAnswers() {   // Check the users answers and show the correct answers
	
	// Local variables
	var i;													// Loop counter
	var points;												// Score counter
	
	// Checking conditions
	for (i=0; i<userAnswerElems.length; i++)				// Go through each of the user provided answers
		if (userAnswerElems[i].innerHTML == "") {			// Stop this function is not all answers are provided (print error)
			alert("Dra först ord till alla bilder.");
			return;
		}
	
	// Reseting
	eventsForDrag(false);									// Stop dragging
	points = 0;												// Reset score
	
	// Checking and adding points
	for (i=0; i<userAnswerElems.length; i++) {				// Go trouch each of the user provided answers again
		if (userAnswerElems[i].innerHTML == allPics[picsIx4[i]])
			points++;										// Add one point is the answer belongs to the image
		// Print correct answer for each image (city name with location name)
		correctAnswerElems[i].innerHTML = allPics[picsIx4[i]] + "<br>" + allDescription[picsIx4[i]];
	}
	
	// Reseting buttons and print the score on the webpage
	msgElem.innerHTML = "Du fick: " + points + " antal poäng.";
	startGameBtn.disabled = false;							// Enable the start game button
	checkAnswersBtn.disabled = true;						// Disable the check answers button
	
} // End checkAnswers