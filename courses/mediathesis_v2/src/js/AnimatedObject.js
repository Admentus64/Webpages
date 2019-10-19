// JavaScript Document
// Author: Robert Willem Hallink

function AnimatedObject(elem) {   // Start Dynamic Class: AnimatedObject
    
    // Private Attributes
    var self = this;                                                // Refer to the class object itself (the keyword this will if called within a function refer to the function instead)
    
    // Moving
    var element = elem;
    var moveInterval = null;
    var facingLeft = false;
    var inverted = false;
    var speed = 0;
    var maxDistance = 0;
    var position = 0;
    
    
    
    // Public Methods
    
    // Setup to move the object
    this.moveLeft = function(inv, pause, s, max) {   // Start Method: move
        
        facingLeft = false;
        inverted = inv;
        speed = s;
        maxDistance = max;
        
        if (inverted)
            elem.style.transform = "scaleX(-1)";
        else elem.style.transform = "scaleX(1)";
        
        self.stopMoving();
        moveInterval = setInterval(doMoveLeft, pause);
        
    }; // Stop Method: move
    
    this.stopMoving = function() {   // Start Method: stopMoving
        
        if (moveInterval !== null)
            clearInterval(moveInterval);
            
    }; // End Method: stopMoving
    
    
    
    // Private Methods
    
    // Move the object
    var doMoveLeft = function() {   // Start Method: doMove
        
        position += speed * (facingLeft ? -1:1);
        
        if (position >= maxDistance) {
            facingLeft = true;
            element.style.paddingRight = "0%";
            if (element.style.transform === "scaleX(1)")
                element.style.transform = "scaleX(-1)";
            else element.style.transform = "scaleX(1)";
        }
        else if (position <= 0) {
            facingLeft = false;
            element.style.paddingLeft = "0%";
            if (element.style.transform === "scaleX(1)")
                element.style.transform = "scaleX(-1)";
            else element.style.transform = "scaleX(1)";
        }
        
        if (inverted) {
            if (facingLeft)
                element.style.paddingLeft = position + "%";
            else element.style.paddingRight = position + "%";
        }
        else {
            if (facingLeft)
                element.style.paddingRight = position + "%";
            else element.style.paddingLeft = position + "%";
        }
        
    }; // End Method: doMove
    
} // End Dynamic Class: AnimatedObject