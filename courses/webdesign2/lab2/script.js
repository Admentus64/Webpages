// JavaScript

// Global variables
var inputElem;                                  			// Input value for bars
var msgElem;                                    			// Reference to the message id, used to print out a message
var fruitNames;                                 			// Names for different sorts of fruits
var fruitNr;                                    			// Used as an index value for fruitNames
var selFruitsElem;											// Reference to the selectedFruits id, used to print out fruit images



// Functions
function init() {   // Initialization function, setups the whole page
	
	// Refer input element to buttons variables
	inputElem = [];                             			// Create a new array, with one entry for each input bar
    inputElem[1] = document.getElementById("input1");
    inputElem[2] = document.getElementById("input2");
    inputElem[3] = document.getElementById("input3");
    
	// Initialize fruitNames with a set of names and reset fruitNr to value 0
    fruitNames = ["ingen frukt", "äpple", "banan", "citron","apelsin", "päron"];
    fruitNr = 0;
	
	// Refer document elements to variables
    selFruitsElem = document.getElementById("selectedFruits");	// The global fruit image list, that prints out all selected fruit images
    msgElem = document.getElementById("message");				// The message to be printed and updated
	
	// Link each button to call a function
    document.getElementById("btn1").onclick = showFruit;
    document.getElementById("btn2").onclick = checkName;
    document.getElementById("btn3").onclick = addFruits;
	
} // End init
window.onload = init;                           			// Call init function when page is loaded



function showFruit() {   // Function for showing a fruit image
	
    //  Local variables
    var nr;                                     			// Number
    var fruitUrl;                              	 			// String containing a folder link to an image
    
	// Code to present a fruit image in the image box
    nr = getNr(1, 5);                           			// Call function getNr to read nr
    if (nr != null) {                           			// nr needs to have a value in order to continue
        fruitUrl = "pics/fruit" + nr + ".jpg";  			// Change the current link to the new selected fruit image
        document.getElementById("fruitImg").src = fruitUrl;	// Change image by reading the fruitUrl
        fruitNr = nr;										// Store the local fruit index number into the global fruit index number
    }
	
} // End showFruit



function checkName() {   // Function for checking the name of the fruit image
	
    // Local variables
    var name;                                   			// Name for fruit
    
    // Checking for correct conditions
    if (fruitNr == 0) {                         			// The starting value for fruitNr cannot be 0, which is changed as soon an image is chosen, if so end this method and write an error
        msgElem.innerHTML = "Du måste först välja en frukt.";
        return;
    }
    
    // Read input
    name = inputElem[2].value;                  			// Read name
    
    // Checking for fruit name within input
    if ((fruitNames[fruitNr]) == name)         	 			// Check if the name of the provided input is the same as the array value for that fruit
        msgElem.innerHTML = "Rätt namn";        			// It is either correct or wrong, print that message!
    else msgElem.innerHTML = "Fel namn";
	
} // End checkName



function getNr(elemNr, high) {   // Function to read nr as an integer from a input bar
	
    // Local variables
    var nr;                                     			// The amount of fruit
    
    // Read input
    nr = Number(inputElem[elemNr].value);       			// Read nr
    
    // Checking for wrong input
    if (isNaN(nr)) {                            			// If input is not a number, then stop this function and write an error         
        msgElem.innerHTML = "Du måste skriva ett tal med siffror.";
        return null;
    }
    if (nr < 1 || nr > high) {                  			// If input value is not between 1 and high, then stop this function and write an error
        msgElem.innerHTML = "Du måste skriva ett siffra mellan 1 och " + high + ".";
        return null; 
    }
    
    // Parsing
    nr = parseInt(nr);                          			// Convert nr to a whole integer value
    inputElem[elemNr].value = nr;               			// Apply this also to the input field
    
    return nr;                                  			// End function by sending nr value

} // End getNr



function addFruits() {   // Function to add fruit images 
	
    // local variables
    var amount;												// The amount of images of a fruit sort to add to the image list
    var imgList;											// Contains images to be added into the global image list
    
    // Checking for correct conditions
    if (fruitNr == 0) {                         			// The starting value for fruitNr cannot be 0, which is changed as soon an image is chosen
        msgElem.innerHTML = "Du måste först välja en frukt.";
        return;												// End this function as fruitNr was 0, an error message is also printed
    }
    
	// The code to add the fruit image(s) into the global image list
    amount = getNr(3, 9);									// Call function getNr to read amount
    if (amount != null) {                       			// amount needs to have a value in order to continue
        imgList = "";										// Reset imgList with an empty text line
        for (i=0; i<amount; i++)							// Add the provided amount of images in the local image list
            imgList += "<img src='pics/fruit" + fruitNr + ".jpg' alt='frukt'>";
        selFruitsElem.innerHTML += imgList;					// Add all images into the global image list, making them visible
    }
	
} // End addFruits