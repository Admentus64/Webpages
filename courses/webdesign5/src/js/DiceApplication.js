function DiceApplication() {   // Start Dynamic Child Class: DiceApplication
    
    // Call Parent Class
    Application.call(this);
    
    
    
    // Private Variables
    var self = this;                                                                    // Refer to the class object itself (the keyword this will if called within a function refer to the function instead)
    var diceList = [];                                                                  // Contains all dice within the content part of the window
    var maxDice = 40;                                                                   // Set a limit on the amount of dice the content part of the window can hold (a larger amount requires a larger window)
    var numOfDice = 0;                                                                  // The current number of dice to keep track of which are shown in the content part of the window
    
    
    
    // Public Functions
    
    // Function which is used to initialize a new instance of the dice application
    this.init = function() {   // Start Function: init
        
        ClockApplication.prototype.init.call(this, "dice-window-wrapper", "dice-menubar-wrapper");                              // Call the init function from the parent class shared code between classes
        this.toolbarElem = this.createElement("ul", null, this.createElement("div", "dice-toolbar-wrapper", this.windowElem));  // Set the toolbar within the application to hold additional buttons and the counter
        this.contentElem = this.createElement("ul", null, this.createElement("div", "dice-content-wrapper", this.windowElem));  // Set the window within the application to contain all dice
        
        this.createElement("li", "add", this.toolbarElem);                              // Add an add dice button to the toolbar
        this.createElement("li", "remove", this.toolbarElem);                           // Add an remove dice button to the toolbar
        this.createElement("li", "roll", this.toolbarElem);                             // Add an roll dice button to the toolbar
        
        this.toolbarCounterElem = this.createElement("ul", "dice-toolbar-counter-wrapper", this.createElement("li", null, this.toolbarElem));   // Set the toolbar counter within the application to hold the score counter
        for (var i=0; i<5; i++)                                                         // Add five digits to counter for the toolbar counter
            this.createElement("li", "zero", this.toolbarCounterElem);
        
        Event.add(this.toolbarElem.childNodes[0], "click", this.addDice);               // Link the add dice button from the toolbar to call the function to add a new dice
        Event.add(this.toolbarElem.childNodes[1], "click", this.removeDice);            // Link the remove dice button from the toolbar to call the function to remove the last dice
        Event.add(this.toolbarElem.childNodes[2], "click", this.rollDice);              // Link the roll dice button from the toolbar to call the function to roll all dice                     
        
    }; // End Function: init
    
    // Add a new dice in the content part of the application
    this.addDice = function() {   // Start Function: addDice
        
        Main.clickSnd.play();                                                           // Play for sound for clicking a button
        
        if (numOfDice >= maxDice)                                                       // Check if the amount of current dice is not at the allowed limit yet, if so stop here
            return;
        
        var dice = new Dice(self);                                                      // Initialize a new Dice object instance
        diceList.push(dice);                                                            // Push the newly initialized Dice object instance into the list that holds all dice
        numOfDice++;                                                                    // Increase the track counter for the number of dice by one
        self.updateCounter();                                                           // Update the score to be presented in the toolbar counter (call function calcScore)
        
    }; // End Function: addDice
    
    // Remove the last dice in the content part of the application
    this.removeDice = function() {   // Start Function: removeDice
        
        Main.clickSnd.play();                                                           // Play for sound for clicking a button
        
        if (numOfDice === 0)                                                            // Check if the list that holds all dice is not empty, if so stop here
            return;
        
        var dice = diceList.pop();                                                      // Remove the last dice from the list that holds all dice
        dice.remove();                                                                  // Remove the HTML code of the removed dice so it is no longer seen
        numOfDice--;                                                                    // Decrease the track counter for the number of dice by one
        self.updateCounter();                                                           // Update the score to be presented in the toolbar counter (call function calcScore)
        
    }; // End Function: removeDice
    
    // Roll over all dice in the content part of the application
    this.rollDice = function() {   // Start Function: rollDice
        
        Main.clickSnd.play();                                                           // Play for sound for clicking a button
        
        if (numOfDice === 0)                                                            // Check if the list that holds all dice is not empty, if so stop here
            return;
        
        for (var i=0; i<numOfDice; i++)                                                 // Roll every dice again, get the value from that roll and add it to the score
            diceList[i].roll();
        
        self.updateCounter();                                                           // Update the score to be presented in the toolbar counter (call function calcScore)
        
    }; // End Function: rollDice
    
    // Update the score presented in the toolbar counter
    this.updateCounter = function() {   // Start Function: calcScore
        
        var score = updateScore();                                                      // The value to converted into a list of digits for the score counter to present
        var list = String(score).split('');                                             // Split the number into an array, each digit in the number will be it's own element as a string
        
        var length = this.toolbarCounterElem.childNodes.length;
        for (var i=length-1; i>0; i--) {                                                // Run 5 times, since the toolbar counter contains five digits, each run will cover the next digit
            if (list.length !== 0)                                                      // As long the list with digits is not empty remove the last digit from the list and set the current counter digit equal to the removed digit
               this.toolbarCounterElem.childNodes[i].className = self.convertDigitToText(list.pop());   
            else if (list.length === 0)                                                 // If the list with digits is empty set the current counter digit equal to zero
                this.toolbarCounterElem.childNodes[i].className = "zero";
        }
        
    }; // End Function: calcScore
    
    
    
    // Private Functions
    
    // Go through every dice that application has to get their value in order to get a combined score value
    var updateScore = function() {   // Start Function: updateScore
        
        var score = 0;                                                                  // Start with an empty score
        for (var i=0; i<numOfDice; i++)                                                 // Go through each dice in the list that holds all dice and get the value from each dice and add it to the score
            score += diceList[i].getValue();
        return score;                                                                   // Return the score
        
    }; // End Function: updateScore
    
    
    
    // Public Commands
    this.init();                                                                        // Initialize the DiceApplication by calling the init function
    
} // End Dynamic Child Class: DiceApplication



// Initialize Class with Parent Class
DiceApplication.prototype = new Application();
DiceApplication.prototype.constructor = DiceApplication;