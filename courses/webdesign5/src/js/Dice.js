function Dice(app) {   // Start Dynamic Class: Dice
    
    // Private Variables
    var self = this;                                                                    // Refer to the class object itself (the keyword this will if called within a function refer to the function instead)
    var application = app;                                                              // Refer to the application that added the dice
    var value = 0;                                                                      // The value of the dice as an integer value
    var dice = null;                                                                    // The dice tag element
    
    
    
    // Public Functions
    
    // Function which is used to initialize a new dice when added in a linked dice application window
    this.init = function() {   // Start Function: init
        
        dice = document.createElement("li");                                            // Create a new tag element for the dice
        application.contentElem.appendChild(dice);                                      // Apply the dice to the passed window that holds all dice
        this.roll();                                                                    // Call the function to roll the dice (give the dice a value and present it graphically)
        Event.add(dice, "click", rollOnClick);                                          // Link the dice to call the function to roll that dice when clicked on
        
    }; // End Function: init
    
    // Set the value of a dice
    this.setValue = function(val) {   // Start Function: set
        
        if (val < 1 || val > 6)                                                         // Check if the passed value is between 1 and 6, otherwise just end the call
            return;
        
        value = val;                                                                    // Set the value equal to the passed value
        dice.className = valueToClassName(val);                                         // Set the class name of the dice tag element equal to the value, but first convert the value into an usable format
        return val;                                                                     // Return the new value of the dice, it is not required to be used but function calls might make use of it in some cases
        
    }; // End Function: set
    
    this.roll = function()          { return self.setValue(Math.floor(Math.random() * 6 + 1)); };   // Function: roll     (roll the dice and call the function setValue by setting a random integer value between 1 and 6)
    this.remove = function()        { application.contentElem.removeChild(dice); };                 // Function: remove   (remove the dice tag element from the window that holds all dice)
    this.getValue = function()      { return value; };                                              // Function: getValue (retrieve and send back the value of the dice)
    
    
    
    // Private Functions
    
    // Return a suitable class variable name for the passed value
    var valueToClassName = function(val) {   // Start Function: valueToClassName
        
        switch (val) {                                                                  // Go through each possible value, which is between 1 and 6, the default case (which should not be needed) be will used as the value 1
            case 1: return "dice dice-side-one";                                        // Convert the integer value as a string that starts with "dice dice-side-" while the number is added at the end as a string as text
            case 2: return "dice dice-side-two";
            case 3: return "dice dice-side-three";
            case 4: return "dice dice-side-four";
            case 5: return "dice dice-side-five";
            case 6: return "dice dice-side-six";
            default: return "dice dice-side-one";
        }
        
    }; // End Function: valueToClassName
    
    // Function to be called when pressing the dice in the application that holds that dice, a modified version of the roll function is used to ensure the same value is not set again
    var rollOnClick = function() {   // Start Function: rollOnClick
        
        Main.clickSnd.play();                                                           // Play for sound for clicking a dice
        var currValue = value;                                                          // Get the current value before the reroll
        while (currValue === value)                                                     // As long the current value is equal to the new value, keep rolling the dice
            self.roll();
        application.updateCounter();                                                    // Call the application that holds this dice to update the counter
        
    }; // End Function: rollOnClick
    
    
    
    // Public Commands
    this.init();                                                                        // Initialize the Dice by calling the init function
    
}   // End Dynamic Class: Dice