// JavaScript

// Global variables
var wordList;												// Array with a set of words, where one randomly is chosen from
var selectedWord;											// The randomly chosen word the user has to guess
var leterBoxes;												// Array with references to span-tags that define the boxes for each letter in the word
var hangmanImg;												// Reference to img-element with the image for the hallows and man
var handmanImgNr;											// Number for actual image (0-6), for the picture being shown (so it is known which becomes the next picture)
var msgElem;												// Reference to div-element for message
var startGameBtn;											// Reference to the start button
var letterButtons;											// Array with references to the letter buttons
var startTime;												// A timer that activates when the game starts



// Functions
function init() {   // Initialization function, setups the whole page
	
	// Local variables
	var i;													// Loop variable
	
	// Initialize a list of words
	wordList = ["BLOMMA","LASTBIL","SOPTUNNA","KÖKSBORD","RADIOAPPARAT","VINTER","SOMMAR","DATORMUS","LEJON","ELEFANTÖRA","JULTOMTE",
				"SKOGSHYDDA","BILNUMMER","BLYERTSPENNA","SUDDGUMMI","KLÄDSKÅP","VEDSPIS","LJUSSTAKE","SKRIVBORD","ELDGAFFEL","STEKPANNA",
				"KASTRULL","KAFFEBRYGGARE","TALLRIK","SOFFBORD","TRASMATTA","FLYGPLAN","FLYGPLATS","TANGENTBORD"];				
	
	// Refer each button element to a variable
	startGameBtn = document.getElementById("startGameBtn");
	letterButtons = document.getElementById("letterButtons").getElementsByTagName("button");
	for (i=0; i<letterButtons.length; i++)					// Refer to all letter buttons within guessLetter
		letterButtons[i].onclick = guessLetter;
	
	// Refer to the image and message
	hangmanImg = document.getElementById("hangman");		// Refer the image to hangmanImg
	msgElem = document.getElementById("message");			// Refer the message to msgElem
	
	// Final preparations
	changeButtonActivation(true);							// Enable the Start Game button and disable all letter buttons
	
	// Start the game when the Start Game button is pressed (call function startGame)
	document.getElementById("startGameBtn").onclick = startGame;
	
} // End init
window.onload = init;										// Call init function when page is loaded



function startGame() {   // Function that starts / initializes / setups the game
	
	// Local variables
	var now;												// The current time
	
	// Call functions
	randomWord();											// Call function randmWord to choose a new word to guess for the game
	showLetterBoxes();										// Call function showLetterBoxes to enable the letter boxes for the chosen word
	
	// Reset the image
	hangmanImg.src = "pics/h0.png";							// Show the first image (which is invisible)
	hangmanImgNr = 0;										// The current image is the first image
	
	// Change buttons and reset the text
	changeButtonActivation(false);							// Disable the Start Game button, but enable all letter buttons 
	msgElem.innerHTML = "";									// Reset the message with an empty text line
	
	// Activate the timer when the game starts
	now = new Date();										// Initialize now with a new date
	startTime = now.getTime();								// Read the time from now
	
} // End startGame



function randomWord() {   // Function that decides the selected word for the game
    
	// Local variables
	var oldWord;											// Keeps tracking of the last chosen word
	var wordIndex;											// Random number to choose selectedWord
	
	// Initialize variables
	oldWord = selectedWord;									// Set oldWord equal to selectedWord
	
	// Choose a random whole number, then use that number to refer to a word in the wordList and set that as SelectedWord
	while (oldWord == selectedWord) {						// Keep choosing a new word until it is really a new word (words are not chosen twice in a row)
		wordIndex = Math.floor(29 * Math.random());;		// Assign a random number to wordIndex
		selectedWord = wordList[wordIndex];					// Use wordIndex value to choose selectedWord
	}
	
} // End randomWord



function showLetterBoxes() {   // Function that initializes the letter boxes
	
	// Local Variables
	var i;													// Loop variable
	var newCode;											// Used to add new temporary code in the index.htm file 
	
	// Initialize variables
	newCode = "";											// Give newCode an empty text line
	
	for (i=0; i<selectedWord.length; i++)					// Go through each letter from the selected word
		newCode += "<span>&nbsp;</span>";					// Add a text line for each letter the selected word has in newCode (the text line is read in HTML as an empty box)
		
	// Push the text lines from newCode into the htm file, then refer these new lines of code to letterBoxes, empty text boxes are now visible in the game
	document.getElementById("letterBoxes").innerHTML = newCode;
	letterBoxes = document.getElementById("letterBoxes").getElementsByTagName("span");	
	
} // End showLetterBoxes



function guessLetter() {   // Function when a letter button is pressed
	
	// Disable this button
	this.disabled = true;									// Disable this button, so it can not be used twice the same game
	
	// Local variables
	var i;													// Loop variable
	var letter;												// The letter value of this button
	var letterFound;										// A check if the pressed button is the same as a letter in the selected word
	var correctLettersCount;								// A counter to check how many correct letters are found
	
	// Initialize variables
	letter = this.value;									// Read the letter value from this button
	letterFound = false;									// Reset letterFound always as false
	correctLettersCount = 0;								// Reset correctLettersCount always as 0
	
	// Checking for results
	for (i=0; i<selectedWord.length; i++) {					// Go through each letter in the selected word
        if (letter == selectedWord.charAt(i)) {				// Read each letter from the selected word, continue if it is the same letter as the button
			letterBoxes[i].innerHTML = letter;				// Replace the empty box with a box with the correct letter, using the correct box position
			letterFound = true;								// A letter was found
        }
		if (letterBoxes[i].innerHTML != "&nbsp;")			// Checking for each box if it remains without a letter
			correctLettersCount++;							// Add one to correctLettersCount each time a box is not without a letter
	}
	
	// End of game check
	if (!letterFound) {										// Only continue if a letter has not been found yet			
		hangmanImgNr++;										// Update the hanged man image to the next step
		hangmanImg.src = "pics/h" + hangmanImgNr + ".png";
		if (hangmanImgNr == 6)								// Continue if the hanged man image reached the final step (which is image 6)
			endGame(true);									// End the game telling the player lost
	}
	// If a letter was indeed found, check if the amount of found letters is the same as the amount of letters in the selected word
	else if (correctLettersCount == selectedWord.length)	
		endGame(false);										// End the game telling the player won
	
} // End guessLetter



function endGame(manHanged) {   // Function that ends the game, with either the player won or lost
    
	// Local variables
	var now;												// The current date, can be used to get the current time
	var runTime;											// A timer which keeps track of the play time for each game
	
	// Initialize timer
	now = new Date();										// Initialize with a date
	runTime = (now.getTime() - startTime) / 1000;			// Start the timer at 0 seconds, adds 1 second each second to the timer
	
	// Print messages
	if (manHanged)											// Print out a message based on the player either won or the man got hanged
		msgElem.innerHTML = "Du förlör! Den korrekta ordet var: " + selectedWord + ". Försök igen?";
	else msgElem.innerHTML = "Grattis! Du har gissat rätt!";
	// Print out an extra message with the play time, with only 1 decimal
	msgElem.innerHTML += "<br><br>Det tog " + runTime.toFixed(1) + " sekunder.";
	
	// Reset the buttons
	changeButtonActivation(true);							// Enable the Start Game button again and disable the letter buttons
	
} // End endGame



function changeButtonActivation(status) {   // Function that enables and disables buttons
	
	// Disable all letter buttons, but activate the Start Game button when this function is called as true
	if (status == true) {						
		startGameBtn.disabled = false;
		for (i=0; i<letterButtons.length; i++)				// Go through all letter buttons to change their state
			letterButtons[i].disabled = true;
	}
	// Otherwise (which means this function is called as false) enable all letter buttons, dis disable the Start Game button
	else {
		startGameBtn.disabled = true;
		for (i=0; i<letterButtons.length; i++)
			letterButtons[i].disabled = false;
	}
	
} // End changeButtonActivation