// JavaScript Document
// Author: Robert Willem Hallink

function Brick() {   // Start Dynamic Class: Brick
    
    // Public Attributes
    this.brickElem = null;                                          // The HTML element of the brick
    this.image = null;                                              // The front image for the brick
    this.swapped = false;                                           // Keep track if the brick has been swapped to the front
    this.complete = false;                                          // Keep track if the brick has been successfully swapped with a different brick with the same image
    
    
    
    // Private Attributes
    var self = this;                                                // Refer to the class object itself (the keyword this will if called within a function refer to the function instead)
    const imgPath = "src/img/brick/";                               // Static link to the path where all images are found
    const backsideImg = "backside/backside";                        // Static filename of the backside image
    const emptyImg = "empty/empty";                                 // Static filename of the empty image
    const imgExt = ".png";                                          // Static file extension name for using PNG images
    
    
    
    // Public Methods
    
    // Method which is used to initialize a new instance of a memory card brick
    this.init = function() {   // Start Method: init
        
        self.brickElem = self.createElement("img", "brickBack", GameScript.bricksDiv);
        self.brickElem.alt = "spelbricka";
        self.reset();
        
    }; // End Method: init
    
    // Set an image for the brick
    this.setImage = function() {   // Start Method: setImage
        
        var valid = false;                                          // No image has been found yet which is usable
        var rand;                                                   // A random integer value
        do {                                                        // Keep assigning a random value as long that value has not been used twice yet throughout the game
            rand = Math.floor((Math.random() * GameScript.couples.length));
            if (GameScript.couples[rand] !== 2)
                valid = true;                                       // A suitable random value has been found to link to an image, the loop can end now
        } while(!valid);
        GameScript.couples[rand]++;                                 // The current random number is now in use, only two of each number can exist during a given game, use that value to assign the image for the brick
        self.image = imgPath + GameScript.brickImages[rand] + imgExt;
        
    }; // Stop Method: setImage
    
    // Method used to inject a brick into the HTML code so it becomes usable
    this.createElement = function(tag, className, parent) {   // Start Function: createElement
        
        var elem = document.createElement(tag);
        if (className !== null)
            elem.className = className;
        if (parent !== null)
            parent.appendChild(elem);
        return elem;
        
    }; // End Function: createElement
    
    // Reset the brick, place and show it on the back again
    this.reset = function() {   // Start Method: reset
        
        self.brickElem.className = "brickBack";
        self.brickElem.src = imgPath + backsideImg + imgExt;
        self.swapped = false;
        self.complete = false;
        Event.add(self.brickElem, "click", self.swap);
        
    }; // Stop Method: reset
    
    // Return the brick to the back again, implying it has been swapped with a different bick with a different image
    this.back = function() {   // Start Method: back
        
        self.brickElem.className = "brickBack";
        self.brickElem.src = imgPath + backsideImg + imgExt;
        self.swapped = false;
        
    }; // Stop Method: back
    
    // Make the brick show an empty image, implying it has been sucessully swapped with a different brick with the same image
    this.empty = function() {   // Start Method: empty
        
        self.brickElem.className = "brickEmpty";
        self.brickElem.src = imgPath + emptyImg + imgExt;
        self.swapped = false;
        self.complete = true;
        
    }; // Stop Method: empty
    
    // Remove the brick from the HTML code, including events and variables
    this.remove = function(elem) {   // Start Method: remove
        
        elem.removeChild(self.brickElem);
        Event.remove(self.brickElem, "click", self.swap);
        self = null;
        
    }; // Stop Method: remove
    
    // Method to swap the brick to the front, showing it's image
    this.swap = function() {   // Start Method: swap
        
        // Stop this method if two bricks or this brick already have been swapped or if this brick has been completed
        if (!PlayTheGame.nextBtn.disabled || self.swapped || self.complete)
           return;
        
        // Stop this method if a timer is used and the timer has reached zero
        if (GameScript.timerApp !== null)
            if (!GameScript.timerApp.isActive())
                return;
        
        // Change the brick to display the front image
        self.brickElem.className = "brickFront";
        self.brickElem.src = self.image;
        self.swapped = true;
        
        // Keep track which bricks have been swapped, only two can be swapped at once
        if (GameScript.swap[0] === null)
            GameScript.swap[0] = self.image;
        else GameScript.swap[1] = self.image;
        
        // Stop this method if no two bricks have been swapped, so only continue when two bricks have been swapped
        if (GameScript.swap[0] === null || GameScript.swap[1] === null)
            return;
        
        // Enable the next button, add one to the amount of swaps, update the swaps counter and keep tracked of the amount of swapped bricks
        PlayTheGame.nextBtn.disabled = false;
        GameScript.swapsCount++;
        GameScript.turnNrElem.value = GameScript.swapsCount;
        GameScript.swappedBricks += 2;
        
        // If all bricks are swapped, call the function to end the game
        if (GameScript.swappedBricks == GameScript.bricks.length)
            GameScript.endGame();
            
    }; // Stop Method: swap
    
    this.getImage = function()                                      { return self.image; };     // Method: getImage     (return the image of the brick)
    this.removeImage = function()                                   { self.image = null; };     // Method: removeImage  (remove the image of the brick, setting it to null)
    this.isSwapped = function()                                     { return self.swapped; };   // Method: isSwapped    (return true if the brick is swapped, otherwise return false)
    
    
    
    // Public Commands
    this.init();                                                    // Initialize a new object instance by calling the init function
    
} // End Dynamic Class: Brick