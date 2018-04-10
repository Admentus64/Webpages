// JavaScript Document

// Global variables
var bricks;                                                 // Array that contains brick image values which are linked to the HTML bricks
var swap1, swap2;                                           // The current swapped cards, which are an index reference to the bricks array (only 2 can be swapped at any time)
var swapsCount, scoreCount, gameCount, meanCount;           // Counter values, for the current amount of swaps brick sets, total score, total amount of games and average score
var swappedBricks;                                          // Local value used each round to know how many cards have been swapped in order to end the game

var bricksElem, bricksHTMLCopy;                             // Reference to document containing the bricks as an array
var nrOfBricksMenuElem, nrOfBricksMenuBtn;                  // Reference to document brick size menu and buttons
var startGameBtnElem, nextBtnElem;                          // Reference to document buttons
var turnNrElem, msgElem;                                    // Reference to document messages

var userTotPointsElem, userCountGamesElem, userMeanPointsElem;        // Reference to document messages for the counted values
var userInfoElem, userMoreInfoElem;                                   // Reference to document info window
var timerRef;                                                         // Timer to call functions after a few miliseconds to avoid code sequence overlapping



// Functions to run when the webpage is loaded (all HTML-code is executed)
function init() {   // Initialize global variables and relates functions to buttons
    
    // Refer to the bricks as an array and create a backup copy of it
    bricksElem = document.getElementById("bricks").getElementsByTagName("img");
    bricksHTMLCopy = document.getElementById("bricks").innerHTML.slice(0);
    
    // Refer to the buttons and menu's
    nrOfBricksMenuElem = document.getElementById("nrOfBricksMenu");
    nrOfBricksMenuBtn = document.getElementById("nrOfBricksMenu").getElementsByTagName("option");
    startGameBtnElem = document.getElementById("startGameBtn");
    nextBtnElem = document.getElementById("nextBtn");
    
    // Refer to the output messages
    turnNrElem = document.getElementById("turnNr");
    msgElem = document.getElementById("message");
    
    // Refer to the messages that track counted values
    userTotPointsElem = document.getElementById("userTotPoints");
    userCountGamesElem = document.getElementById("userCountGames");
    userMeanPointsElem = document.getElementById("userMeanPoints");
    
    // Refer to the info windows
    userInfoElem = document.getElementById("userInfo");
    userMoreInfoElem = document.getElementById("userMoreInfo");
    
    // Reset all buttons to no-active-game state
    startGameBtnElem.disabled = nrOfBricksMenuElem.disabled = false;
    nextBtnElem.disabled = true;
    
    // Prepare the global initialization
    readCounts();                                           // Check if cookie contains counted values, otherwise reset these to 0
    readBricksMenu();                                       // Check if cookie contains last amount of bricks, otherwise use default
    checkMoreInfo();                                        // Check if extended info window should be active on page load
    timerRef = null;                                        // Start the webpage with an empty timer
    
    // Link refered variables to functions when clicking on (for example button or brick)
    for (i=0; i<nrOfBricksMenuBtn.length; i++)
        addListener(nrOfBricksMenuBtn[i], "click", clickNrOfBrickTiles);
    addListener(startGameBtnElem, "click", startGame);
    addListener(nextBtnElem, "click", checkSwaps);
    addListener(userInfoElem, "click", clickCheckMoreInfo)
    
} // End init
addListener(window, "load", init);							// Active function init when the page is loaded



function checkMoreInfo() {   // Check if the info window must be extended
    
    // The timer used when clicking on the info window should be cleansed if not so already
    if (timerRef != null)
        clearTimeout(timerRef);
    
    // Start with checking if the current URL contains # or not depending on how this function is called
    if (window.location.href.indexOf("#") > -1) {
        // Active the extended info window
        userMoreInfoElem.style.display = "block";                                   // Open the extended info window
        userInfoElem.innerHTML = userInfoElem.innerHTML.slice(0, 235);              // Remove last part of the user info in the document
        userInfoElem.innerHTML += "<p><a href=\"index.htm\">Visa mindre</a></p>";   // Replace removed part with new link going back to main page showing new link text
        
        // NOTE: Going back to the main game page resets the game, thus all code is reloaded and initialized again
        // Thus no need for keeping track of old document values
        
        // Rerefer the messages for counted values, as changing the document delinked the references
        userTotPointsElem = document.getElementById("userTotPoints");
        userCountGamesElem = document.getElementById("userCountGames");
        userMeanPointsElem = document.getElementById("userMeanPoints");
        
        // Show the additional counted values for the messages that shows them in the extended info window
        userCountGamesElem.innerHTML = gameCount;
        userMeanPointsElem.innerHTML = meanCount;
    }
    
} // End checkMoreInfo