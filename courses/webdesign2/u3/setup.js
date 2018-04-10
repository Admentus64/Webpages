// JavaScript Document

// Functions related to the game, but not to direct button presses and primary page load core elements
function addBrickTiles(nrOfBricks) {   // Add new brick tiles (or reduce when selecting a lower value)
    
    // If selected amount of brick tiles is less than current amount of brick tiles, reset to original 4x4 brick tiles code
    if (nrOfBricks < bricksElem.length)
        document.getElementById("bricks").innerHTML = bricksHTMLCopy;
    
    // If selected amount of brick tiles is more than current amount of brick tiles, reset the current brick tiles
    // Ending a game does not reset brick tiles. Playing a new round does. Button is available when game is ended.
    var i;
    if (nrOfBricks > bricksElem.length) {
        for (i=0; i<bricksElem.length; i++) {               // Go through each current avaible brick tile
            bricksElem[i].className = "brickBack";          // Place the brick on the back again
            bricksElem[i].src = "pics/backside.png";        // Use the standard image for the back again
        }
    }
    
    // If selected amount of brick tiles is not equal to current amount of brick tiles, add the missing tiles
    // Choosing a lower value resets brick tiles code, so tiles can be missing if not 4x4 is selected
    if (nrOfBricks < bricksElem.length || nrOfBricks > bricksElem.length) {
        var newCode;                                        // Temporary string to fill with new code in document
        var i;
        for (i=bricksElem.length; i<nrOfBricks; i++) {      // Add brick code for each missing brick (atleast 16 tiles already exist at this point)
            newCode = "<img src=\"pics/backside.png\" alt=\"spelBricka\" class=\"brickBack\"> \n";
            document.getElementById("bricks").innerHTML += newCode;                         // Add the new code to bricks in document
        }
        bricksElem = document.getElementById("bricks").getElementsByTagName("img");     // Relink bricks in document again
    }
    
} // End addBrickTiles



function setNrOfBrickTiles(str) {   // Read data to setup the amount of brick tiles
    
    var width = str.substring(0, 1);                        // Read the width from the provided string
    var height = str.substring(2, 3);                       // Read the height from the provided string
    
    // More bricks require that the web page is adjusted to present it properly, so adjust the style
    document.getElementById("bricks").style.width = width * 70 + "px";
    addBrickTiles(height * width);                          // Now call function to add brick tiles
    
} // End setNrOfBrickTiles



function setBricks(nrOfBricks) {   // Assign an invisble array with values to link with the visible pressable bricks
    
    // Local variables
    var haveTwo = [];                                       // Array containing information to determine how the bricks array is set up
    var imgList = [];                                       // Array containing references to images using only as many as needed
    var r, i;                                               // Random value and loop counter
    var brickSets = nrOfBricks / 2;                         // Static value, half as large as the amount of bricks
    bricks = [];                                            // Reset the bricks array before filling it
    
    for (i=0; i<brickSets; i++) {                           // Run as many times as there are available brick sets (set is 2 bricks)
        do {                                                // Atleast run once and keep running as long current element already exists in array
            r = Math.floor(21 * Math.random());             // 22 available images, so select a random value between 0 and 21
        } while (imgList.indexOf(r) != -1);                 // imgList contains random whole numbers between 0 and 21, as are file names of the images
        imgList.push(r);                                    // Random value is new in array, so add it to imgList array
        haveTwo.push(0);                                    // Also add a 0 value to haveTwo array each round in the loop, unrelated to first array
    }
    
    for (i=0; i<nrOfBricks; i++) {                          // Link each invisible brick to a clickable brick
        do {                                                // Run atleast once
            // Choose a random value from imgList which contain image file name number
            r = imgList[Math.floor(Math.random() * imgList.length)];
        } while (haveTwo[imgList.indexOf(r)] == 2);         // Each image must and can only exist 2 times, so make sure that happens
        bricks.push(r);                                     // Link an image to a brick tile (the calculations are when pressing the brick, not now)
        haveTwo[imgList.indexOf(r)]++;                      // haveTwo must know an image is used, each image must and can only exist 2 times
    }
    
    shuffle(bricks);                                        // Randomize the bricks, value are random but position is not
    
} // End setBricks



function shuffle(array) {   // Fisher Yates shuffle method from wikipedia
    
    var counter = array.length;
    var temp, index;
    
    while (counter > 0) {                                   // While there are elements in the array
        index = Math.floor(Math.random() * counter);        // Pick a random index
        counter--;                                          // Decrease counter by 1
        temp = array[counter];                              // And swap the last element with it
        array[counter] = array[index];
        array[index] = temp;
    }
    
    return array;
    
} // End shuffle



function endGame() {   // Preforms activities to end the current round, resetting for new round and updating scores
    
    // Reset the buttons back to the no-active-game state
    startGameBtnElem.disabled = nrOfBricksMenuElem.disabled = false;
    nextBtnElem.disabled = true;
    
    // Calculate score from current round, update global counted values
    var score = calcPosRoundVal(20 - (swapsCount - bricks.length/2) * 1.2);
    scoreCount += score;                                    // Update global score with current score from round
    gameCount++;                                            // Add 1 extra game to count
    meanCount = calcPosRoundVal(scoreCount / gameCount);    // Recalculate average score based on amount of games
    
    // Present results in a message and update the counted value for the info window message
    msgElem.innerHTML = "Du löste det på " + swapsCount + " vändor, så det blir " + score + " poäng.";
    userTotPointsElem.innerHTML = scoreCount;
    if (window.location.href.contains("#")) {               // If extended info window is active, update extra counted value messages too
        userCountGamesElem.innerHTML = gameCount;
        userMeanPoints.innerHTML = meanCount;
    }
    
    saveCounts();                                           // Save the current score and amount of games in a cookie
    
    // Delink the fuction call when clicking on each brick
    // Game is ended, no need for bricks to preform stuff
    var i;
    for (i=0; i<bricks.length; i++)
        removeListener(bricksElem[i], "click", swapBrick);
    
} // End endGame



function calcPosRoundVal(a) {   // Function to calculate a value as rounded, resetting it to 0 if below it
    
    a = Math.floor(a);                                      // Round the provided value so it becomes a whole number
    if (a < 0)                                              // If the number is negative, send back 0 as an answer
        return 0;
    return a;                                               // Answer the call with the rounded value if not already send back as 0
    
}



function swapThemAll() {   // Cheating method for testing purposes, if you need to know if all bricks are correctly assigned
    
    // Activating cheat mode
    for (var i=0; i<bricks.length; i++) {                   // Cheat mode swaps all bricks, but can not determine if the user did win
        var curr = bricksElem[i];
        for (var j=0; j<bricks.length; j++)
            if (curr == bricksElem[j]) {
                curr.src = "pics/" + bricks[j] + ".png";
                curr.className = "brickFront";
                break
            }
    }
    
    // Let the game know that the user won, skippping the check if the user indeed won
    swapsCount = 10;                                        // Just send back a static value to test results with
    endGame();                                              // Just for knowing how ending a game quickly works out
    
} // End swapThemAll - The program does not support winning or score when using this method