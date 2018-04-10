// JavaScript Document

// Functions related to saving and reading data from cookies, includes safewall when cookies are not available
function saveCounts() {   // Save current global score and amount of games played in a cookie
    
    // Store the global score and amount of played games in a cookie
    var cookieValue = scoreCount + "#" + gameCount;
    setCookie("counts", cookieValue);
    
} // End saveCounts



function saveBricksMenu() {
    
    // Store the selected brick tiles option and amount of bricks in a cookie
    var BricksMenuValue = null;                             // Start with using an error proof static value
    var i;
    for (i=0; i<nrOfBricksMenuElem.length; i++) {           // Go through each available option for choosing brick tiles
        if (nrOfBricksMenuElem[i].selected) {               // When having the current option, get text value and option index
            BricksMenuValue = nrOfBricksMenuElem[i].innerHTML;
            BricksMenuValue += "#" + i;
            break;                                          // No need to check next options if current option is found
        }
    }
    setCookie("nrOfBricksMenu", BricksMenuValue);           // Now store the text value and option index in a cookie
    
} // End saveBricksMenu


function readCounts() {   // Use last chosen amount of tracked counted values, if not able to do so use default
    
    // Check if a cookie exists to recall to counted values from last time
    var cookieValue = getCookie("counts");                  // Read counted values from cookie
    if (cookieValue == null) {                              // Use default 0 values if cookie does not exist (or corrupt?)
        scoreCount = 0;
        gameCount = 0;
        meanCount = 0;
    }
    else {
		var cookieArr = cookieValue.split("#");                 // Current cookievalue is not usable so split it
        scoreCount = parseInt(cookieArr[0]);                    // Use first splitted value to get the global score count
        gameCount = parseInt(cookieArr[1]);                     // Use second splitted value to get the amount of played games
        meanCount = calcPosRoundVal(scoreCount / gameCount);    // No need to store average score in a cookie, previous values can calculate that
	}
    userTotPointsElem.innerHTML = scoreCount;               // Update the global score in the info window
    
} // End readCounts


function readBricksMenu() {   // Use last chosen amount of brick tiles, if not able to do so use default
    
    // Check if a cookie exists to recall the chosen option for the amount of brick tiles from last time
    var cookieValue = getCookie("nrOfBricksMenu");          // Read brick tiles from cookie
    if (cookieValue == null) {                              // Use default 4x4 brick tiles if cookie does not exist (or corrupt?)
        setNrOfBrickTiles("4x4");
        nrOfBricksMenuElem[0].selected = true;
    }
    else {
        setNrOfBrickTiles(cookieValue);                     // Use cookieValue to setup the last chosen amount of brick tiles
        var index = cookieValue.substring(4, 5);            // Get index value from cookie to pass to next line to know the correct brick tiles button
        nrOfBricksMenuElem[index].selected = true;          // Also select the brick tiles option that is equal to the amount of brick tiles
    }
    
} // End readBricksMenu