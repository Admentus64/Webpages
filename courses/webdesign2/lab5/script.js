// JavaScript Document

// Global variables
var carImgElem;												// Reference to image with car
var msgElem;												// Reference to element for message
var carImgs;												// Array with filenames for images with the car
var carDir;													// Direction for the car
var xStep, yStep;											// Amount of pixels the car uses to move using x- and y-coordinates each step
var timerRef;												// Reference to the timer for moving the car
var timerStep;												// Time in ms between each step during movement for timerRef

/* === Added in exercise === */
var pigImgElem;												// Reference to image with pig
var pigTimerRef;											// Reference to timer for pig spawning
var pigDuration;											// Time in ms between pig spawning for pigTimerRef
var cSize;													// Car sprite size
var pSize;													// Pig sprite size
var pigNr;													// Amount of pigs used so far
var hitCounter;												// Amount of pigs hit so far
var pigNrElem;												// Message output for amount of pigs used so far
var hitCounterElem;											// Message output for amount of pigs hit so far
var catchedPig;												// Boolean if current pig is catched



// Functions to run when the webpage is loaded (all HTML-code is executed)
function init() {   // Initialize global variables and relates functions to buttons
	
	carImgElem = document.getElementById("car");			// Link image with car from HTML code location
	msgElem = document.getElementById("message");			// Link element with message from HTML code location
	addListener(document, "keydown", checkKey);				// Add eventhandler for pressing down a key
	carImgs = ["car_up.png", "car_right.png", "car_down.png", "car_left.png"];
	carDir = 1;												// Add file names into car sprite images array, set current car direction to 1 (facing right)
	// Add button eventhandlers
	addListener(document.getElementById("startBtn"), "click", startGame);
	addListener(document.getElementById("stopBtn"), "click", stopGame);
	xStep = 5;												// 5 pixel change for x-coordinate during movement
	yStep = 5;												// 5 pixel change for y-coordinate during movement
	timerRef = null;										// Set timer for car movement to empty
	timerStep = 20;											// Set the car movement timer to 20 ms
	
	/* === Added in exercise === */
	pigImgElem = document.getElementById("pig");			// Link image with pig from HTML code location
	pigTimerRef = null;										// Set timer for pig spawning to empty
	pigDuration = 2000;										// Time duration to set into timer later, set to 2 seconds
	cSize = 80;												// Car sprite size
	pSize = 40;												// Pig sprite size
	pigNrElem = document.getElementById("pigNr");			// Link current pigs message output from HTML code location
	hitCounterElem = document.getElementById("hitCounter");	// Link hitted pigs message output from HTML code location
	
} // End init
addListener(window, "load", init);							// Active function init when the page is loaded



function checkKey(e) {
	
	// Local variables
	var k = e.keyCode;										// Assign keyboard ASCI codes to variable k
	
	// Switch for reading keyboard
	switch (k) {											// Read keyboard key k
		case 37:											// k = Left key
		case 90:											// k = Z key
			carDir--;										// Go to previous car sprite (rotating left)
			if (carDir < 0)									// Go to last sprite index of car when sprite index reaches below 0
				carDir = 3;
			carImgElem.src = "pics/" + carImgs[carDir];		// Read image source location for current car sprite index
			break;											// End the switch
		case 39:											// k = Right key
		case 173:											// k = - key
			carDir++;										// Go to next car sprite (rotating right)
			if (carDir > 3)									// Go to first sprite index of car when sprintes reaches above 3
				carDir = 0;
			carImgElem.src = "pics/" + carImgs[carDir];		// Read image source location for current car sprite index
			break;											// End the switch
	}
	
} // End checkKey



function startGame() {   // Start moving the car
	
	carImgElem.style.left = "0px";							// Start car sprite location from 0 pixels from the left
	carImgElem.style.top = "0px";							// Start car sprite location from 0 pixels from the top
	moveCar();												// Call function to move car
	
	/* === Added in exercise === */
	pigNr = 0;												// Reset amount of pigs used so far
	hitCounter = 0;											// Reset amount of pigs hit so far
	pigNrElem.innerHTML = pigNr;							// Reset message for used pigs
	hitCounterElem.innerHTML = hitCounter;					// Reset message for hitted pigs
	catchedPig = true;										// Start a game always with pig being hitted (even while not, to avoid setup issues)
	pigTimerRef = setTimeout(newPig, pigDuration);			// Start pig timer at 2 seconds then spawn new pig (pigDuration is static)
	
} // End startGame



function stopGame() {   // Stop the car
	
	// Check timer
	if (timerRef != null)									// Stop timer if not stopped already
		clearTimeout(timerRef);
	
	/* === Added in exercise === */
	clearTimeout(pigTimerRef);								// Stop timer for pig spawning
	pigImgElem.style.visibility = "hidden";					// Set pig image invisble
	
} // End stopGame



function moveCar() {   // Move the car one step in the current direction it is facing
	
	// Local variables
	var x;													// x-coordinate (left) for the car
	var y;													// y-coordinate (top) for the car
	
	// Parsing
	x = parseInt(carImgElem.style.left);					// Use x-coordinate of car as a whole integer
	y = parseInt(carImgElem.style.top);						// Use y-coordinate of car as a whole integer
	
	// Switch for changing speed
	switch (carDir) {										// Use current car sprite index to check speed
		case 0:												// Up direction
			y -= yStep;										// Negative y-speed, reset to 0 if outside y-bounds
			if (y < 0)
				y = 0;
			break;											// Speed found, stop switch
		case 1:												// Right direction
			x += xStep;										// Positive x-speed, reset to max if outside x-bounds
			if (x > 720)
				x = 720;
			break;											// Speed found, stop switch
		case 2:												// Down direction
			y += yStep;										// Positive y-speed, reset to max if outside y-bounds
			if (y > 420)
				y = 420;
			break;											// Speed found, stop switch
		case 3:												// Left direction
			x -= xStep;										// Negative x-speed, reset to 0 if outside x-bounds
			if (x < 0)
				x = 0;
			break;											// Speed found, stop switch
	}
	carImgElem.style.left = x + "px";						// Car x-location is current x-coordinate plus car width
	carImgElem.style.top = y + "px";						// Car y-location is current y-coordinate plus car height
	timerRef = setTimeout(moveCar, timerStep);				// Set timer 20 miliseconds then call this function to move car again
	
	/* === Added in exercise === */
	checkHit();												// Call function to check if car hit pig
	
} // End moveCar



/* === Added new functions in exercise === */
function newPig() {   // Spawning new pigs at a set time interval, including choosing where to place a pig
	
	if (pigNr < 10) {										// Only continue as long less than 10 pigs have passed
		
		// Local variables
		var t;												// Top value (x-coordinate)
		var l;												// Left value (y-coordinate)
	
		// Set top and left
		t = Math.floor(440 * Math.random()) + 10;			// Set top value to random value within limit
		l = Math.floor(740 * Math.random()) + 10;			// Set left value to random value within limit
		
		// Set pig image
		pigImgElem.style.top = t + "px";					// Set pig image x-coordinate using t-value in pixels 
		pigImgElem.style.left = l + "px";					// Set pig image y-coordinate using l-value in pixels 
		pigImgElem.src = "pics/pig.png";					// Get file source location for pig image
		pigImgElem.style.visibility = "visible";			// Make new pig visible
		
		// Finishing
		pigTimerRef = setTimeout(newPig, pigDuration);		// Set pig timer to 2 seconds (pigDuration is static value) to call this function again to spawn a new pig
		pigNr++;											// New pig spawned, add one to current pig counter
		pigNrElem.innerHTML = pigNr;						// Add one to output message for amount of pigs passed
		catchedPig = false;									// New spawned pig has not been hit yet
	}
	else stopGame();										// Call to end the game when 10 pigs did pass
	
} // End newPig



function checkHit() {   // Check if the car hit a pig
	
	// Checking conditions
	if (catchedPig)											// If pig already got hit, stop here!
		return;
	
	// Local variables
	var cT;													// Car top (x)
	var cL;													// Car left (y)
	var pT;													// Pig top (x)
	var pL;													// Pig left (y)
	
	// Reading and parsing coordinates for car and pig as whole integer values
	cT = parseInt(carImgElem.style.top);
	cL = parseInt(carImgElem.style.left);
	pT = parseInt(pigImgElem.style.top);
	pL = parseInt(pigImgElem.style.left);
	
	// Checking for collision with pig, use a math calculation to check if car sprite touches pig sprite, continue if so
	if (cL+cSize-10 >= pL && cL+10 <= pL+pSize && cT+cSize-10 >= pT && cT+10 <= pT+pSize) {
		clearTimeout(pigTimerRef);							// Stop the pig timer
		pigImgElem.src = "pics/smack.png";					// Replace current pig image with a smack text image
		pigTimerRef = setTimeout(newPig, pigDuration);		// Restart pig timer to 2 seconds and spawn new pig
		hitCounter++;										// Increase current amount of pigs hit with one
		hitCounterElem.innerHTML = hitCounter;				// Add one to output message for hitted pigs
		catchedPig = true;									// Current pig is hitted to prevent calling this function again too fast
	}
	
} // End checkHit
