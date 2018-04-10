function Application() {   // Start Dynamic Parent Class: Application
    
    // Public Variables
    this.windowElem = null;                                                             // The main window of the application that hold all content
    this.menubarElem = null;                                                            // The menubar of the application which is used to either the application or drag the main window with
    this.toolbarElem = null;                                                            // A subpart of the menubar which is used for additional buttons
    this.toolbarCounterElem = null;                                                     // A subpart of the menubar and the toolbar which is used to display a counter
    this.contentElem = null;                                                            // Part of the main window where the content is listed (such as the actual clock or the several dice)
    this.timer = null;
    
    
    
    // Local Variables
    var self = this;                                                                    // Refer to the class object itself (the keyword this will if called within a function refer to the function instead)
    
    
    
    // Public Functions
    
    // Function which is used to initialize a new instance of an application (currently either clock or dice). This function contains shared code for calling a new instance of an application
    this.init = function(windowElemDiv, menubarElemDiv) {   // Start Function: init
        
        this.windowElem = this.createElement("div", windowElemDiv, Main.pageContent);   // Set the main window of the application
        this.menubarElem = this.createElement("div", menubarElemDiv, this.windowElem);  // Set the menubar within the application for removing the application and dragging it around
        
        this.createElement("div", "close", this.menubarElem);                           // Add an close button to the menubar for removing (closing) the application
        Event.add(this.menubarElem.childNodes[0], "click", this.close);                 // Link the add close button from the menubar to call the function to remove (close) the application
        
        this.windowElem.style.position = 'absolute';                                    // Set each application with a absolute position of 0, 0
        this.windowElem.style.left = 0 + "px";
        this.windowElem.style.top = 0 + "px";
        
        Main.drag.add(this.windowElem, this.menubarElem);                               // Make every application draggable (through the menubar) to linking it with the drag object instance (which the Main class created)
        
    }; // End Function: init
    
    // Function used to convert a digit in string form to text in string form
    this.convertDigitToText = function(digit) {   // Start Function: translateCounterNumber
        
        if (typeof digit === "string") {                                                // First check if the passed digit is in string form, if it is an integer just skip to execute the core of this function
            if (isNaN(digit))                                                           // Check if the passed digit is indeed a digit (the passed digit could be in string form), if so end here and return "zero" (which is default)
                return "zero";
            digit = parseInt(digit);                                                    // Convert the passed digit from string to integer
        }
        
        switch (digit) {                                                                // Go through each possible value, which is between 0 and 9, the default case (which should not be needed) be will used as the value 0
            case 1: return "one";                                                       // Convert the value as a number to text format
            case 2: return "two";
            case 3: return "three";
            case 4: return "four";
            case 5: return "five";
            case 6: return "six";
            case 7: return "seven";
            case 8: return "eight";
            case 9: return "nine";
            case 0: return "zero";
            default: return "zero";
        }
        
    }; // // End Function: translateCounterNumber
    
    // Function used with common code when creating and appending new HTML code into the page
    this.createElement = function(tag, className, parent) {   // Start Function: createElement
        
        var elem = document.createElement(tag);
        if (className !== null)
            elem.className = className;
        if (parent !== null)
            parent.appendChild(elem);
        return elem;
        
    }; // End Function: createElement
    
    // Function used when clossing an application window, thus removing any references and the HTML code related to the specific removed application window
    this.close = function() {   // Start Function: close
        
        if (self.timer !== null)                                                        // Clear the timer if it is set as a variable (we would only set it as a timer variable or no variable at all)
            clearInterval(self.timer);
        
        Main.clickSnd.play();                                                           // Play a sound since a button is pressed
        Main.pageContent.removeChild(self.windowElem);                                  // Remove the application (either dice or clock) from the page
        self = null;                                                                    // Set the class object to null to delete it
        
    }; // End Function: close
    
} // End Dynamic Parent Child: Application