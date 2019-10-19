function Application() {   // Start Dynamic Parent Class: Application
    
    // Public Attributes
    this.windowElem = null;                                         // The main window of the application that hold all content
    this.contentElem = null;                                        // Part of the main window where the content is listed (such as the actual clock or the several dice)
    this.pageContent = null;                                        // The part of the page where the application is attached too
    this.span = null;
    
    
    
    // Private Attributes
    var self = this;                                                // Refer to the class object itself (the keyword this will if called within a function refer to the function instead)
    
    
    
    // Public Methods
    
    // Method which is used to initialize a new instance of an application (currently either clock or dice). This function contains shared code for calling a new instance of an application
    this.init = function(windowElemDiv, pageContent, description) {   // Start Method: init
        
        this.pageContent = pageContent;
        this.span = document.createElement("span");
        pageContent.appendChild(this.span);
        this.addTextDescription(this.span, description);
        this.windowElem = self.createElement("div", windowElemDiv, this.span); // Set the main window of the application
        
    }; // End Method: init
    
    // Method used to convert a digit in string form to text in string form
    this.convertDigitToText = function(digit) {   // Start Method: convertDigitToText
        
        if (typeof digit === "string") {                            // First check if the passed digit is in string form, if it is an integer just skip to execute the core of this function
            if (isNaN(digit))                                       // Check if the passed digit is indeed a digit (the passed digit could be in string form), if so end here and return "zero" (which is default)
                return "zero";
            digit = parseInt(digit);                                // Convert the passed digit from string to integer
        }
        
        switch (digit) {                                            // Go through each possible value, which is between 0 and 9, the default case (which should not be needed) be will used as the value 0
            case 1: return "one";                                   // Convert the value as a number to text format
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
        
    }; // // End Method: convertDigitToText
    
    // Method used with common code when creating and appending new HTML code into the page
    this.createElement = function(tag, className, parent) {   // Start Method: createElement
        
        var elem = document.createElement(tag);
        if (className !== null)
            elem.className = className;
        if (parent !== null)
            parent.appendChild(elem);
        return elem;
        
    }; // End Method: createElement
    
    this.addTextDescription = function(parent, text) {   // Start Method: addTextDescription
        
        var elem = document.createElement("p");
        elem.style.fontWeight = "bold";
        var node = document.createTextNode(text);
        elem.appendChild(node);
        parent.appendChild(elem);
        
    }; // End Method: addToHTML
    
    // Method used when clossing an application window, thus removing any references and the HTML code related to the specific removed application window
    this.close = function() {   // Start Method: close
        
        self.pageContent.removeChild(self.windowElem);              // Remove the application (either dice or clock) from the page
        self = null;                                                // Set the class object to null to delete it
        
    }; // End Method: close
    
} // End Dynamic Parent Child: Application