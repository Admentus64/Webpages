// JavaScript Document

// Functions related to pressing (clicking) on buttons or other objects
function startGame() {   // When pressing the "Starta spelet" button the game should start, thus run the setup
    
    // Resetting global variables with each new game
    swap1 = null;                                            // Set both swap values to null
    swap2 = null;
    swapsCount = 0;                                         // Set these values to 0
    swappedBricks = 0;
    
    // Disable all buttons for now
    startGameBtnElem.disabled = nrOfBricksMenuElem.disabled = nextBtnElem.disabled = true;
    
    // Reset score and amount of swaps messages
    msgElem.innerHTML = null;                               // Remove the score message for now
    turnNrElem.innerHTML = 0;                               // Each game starts at 0 used swaps
    
    setBricks(bricksElem.length);                           // Call this function to assign brick values to link with each brick in the HTML code
    
    // Prepare and reset the bricks
    var i;
    for (i=0; i<bricksElem.length; i++) {                   // Go through each brick within the HTML code
        bricksElem[i].className = "brickBack";              // Reset class HTML value to brickBack
        bricksElem[i].src = "pics/backside.png";            // Reset image HTML value to the backside picture
        addListener(bricksElem[i], "click", swapBrick);     // Refer each brick to a function when clicking on, so the bricks can be swapped
    }
    
    //swapThemAll();                                        // Include cheat mode here if needed for proper brick assignment testing
    
} // End startGame



function clickNrOfBrickTiles() {
    
    setNrOfBrickTiles(this.innerHTML);                      // Set a new amount of brick tiles using the text value of the pressed button
    saveBricksMenu();                                       // Save the selected amount of brick tiles in a cookie
    
} // End checkNrOfBrickTiles



function swapBrick() {   // Turn a brick when clicking on it
    
    // No need to continue if Next button is available or the pressed brick is not on the back
    if (!nextBtnElem.disabled || this.className != "brickBack")
        return;
    
    // Time to check which brick tiles are swapped
    // The importants tasks here:
    // Swap the pressed brick tile and reveal the image
    // Store a refer to the pressed brick tile for later, up to two stored values
    var i;
    for (i=0; i<bricks.length; i++)                         // Go through each available brick tiles
        if (this == bricksElem[i]) {                        // Loop is used to determine the pressed brick tile, so continue if pressed brick tile is found
            if (swap1 == null)                              // If no brick tile is swapped so far, use the first swap value
                swap1 = i;                                  // Assign swap with the index position value of the pressed brick tile
            else swap2 = i;                                 // Assign value to second swap value instead (the second swapped brick tile)
            this.src = "pics/" + bricks[i] + ".png";        // Reveal the correct image for the pressed tile button
            this.className = "brickFront";                  // Also set pressed brick tile to be swapped
            break;                                          // No need to check further brick tiles when having the correct tile found
        }
    
    // Return to the game if either one of the swap values remain with the default null value
    if (swap1 == null || swap2 == null)
        return;
    
    // Both swap values must be assigned if so far, thus prepare to be able to check the swaps
    nextBtnElem.disabled = false;                           // Enable the Next button to compare the swapped bricks
    swapsCount++;                                           // Two brick tiles did swap, so count it as one new swap
    turnNrElem.innerHTML = swapsCount;                      // Update the message to show the new preformed swap count
    swappedBricks += 2;                                     // Both bricks are now swapped, thus add it to the count
    
    // End the game when all bricks are swapped (amount of swapped bricks is thus equal to the amount of total bricks)
    if (swappedBricks == bricks.length)
        endGame();
    
} // End swapBrick



function checkSwaps() {   // Check the values of both swapped bricks on the screen when pressing the "Nästa" button
    
    // Compare the current swapped bricks if both images are the same
    if (bricks[swap1] == bricks[swap2]) {                   // Use both swap index values to acces the swapped "invisible" bricks
        // Both images are the same, access and change "visible" brick tiles using the "invisble" bricks with the swap index value
        // Both brick tiles are set be to empty and use a picture that is empty
        bricksElem[swap1].src = "pics/empty.png";
        bricksElem[swap2].src = "pics/empty.png";
        bricksElem[swap1].className = "brickEmpty";
        bricksElem[swap2].className = "brickEmpty";
    }
    else {                                                  // Both swapped brick are not the same
        // Both brick tiles are set to be on the back again and use the default back picture again
        bricksElem[swap1].src = "pics/backside.png";
        bricksElem[swap2].src = "pics/backside.png";
        bricksElem[swap1].className = "brickBack";
        bricksElem[swap2].className = "brickBack";
        swappedBricks -= 2;                                 // The swapped bricks were not uncorrect, so remove them from the count
    }
    
    swap1 = null;                                           // Check is preformed, reset the swap values
    swap2 = null;
    nextBtnElem.disabled = true;                            // Also disable the Next button
    
} // End checkSwaps



function clickCheckMoreInfo() {   // When clicking on the extended window info, preform a check
    
    // Extend info window if current url does not contain: #
    // This function is called before the # is added to the URL when clicking the link
    timerRef = setTimeout(checkMoreInfo, 10);              // Run function after 10 ms to ensure the hyperlink is opened before the call
    
} // End checkMoreInfoOnClick