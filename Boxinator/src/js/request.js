// JavaScript Document
// Author: Robert Willem Hallink

function Request(info) {   // Start Dynamic Class: Request
    
    // Private Variables
    const READY_STATE = 4;
    const STATUS      = 200;
    
    
    
    // Public Methods
    
    // Method used to run asynchronous commands, mostly from the database
    this.run = function(str, func, reset) {   // Start Method: run
        
        // Initalize the HTTP Request
        var xhr;
        if (window.XMLHttpRequest)
            xhr = new XMLHttpRequest();
        else xhr = new ActiveXObject("Microsoft.XMLHTTP");
        
        // Set an event for the HTTP Request
        xhr.onreadystatechange = function () { execute(this, xhr, func, reset); };
        
        // Run AJAX under POST, and include the "q" parameter by default
        xhr.open("POST", "src/php/commands.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("q=" + str);
        
    }; // End Method: run
    
    
    
    // Private Methods
    
    // Method that is used execute the code when the HTTP Request is called upon
    var execute = function(self, xhr, func, reset) {   // Start Method: execute
        
        // Prepare AJAX
        if (xhr.readyState !== READY_STATE || xhr.status !== STATUS) // readyState 4 means the request is done and status 200 is a successful return
            return;
        
        // Request is fully loaded and ready to interpret
        index = self.responseText.indexOf("[end-info]");
        if (index === -1)
            index = self.responseText.length;
        if (reset)
            info.innerHTML = self.responseText.substring(0, index);
        else info.innerHTML += self.responseText.substring(0, index);
          
        // Run function if included as parameter
        if (func !== null && func !== undefined) {
            index = self.responseText.indexOf("[end-info]");
            if (index >= 0)
                index += 10;
            func(self.responseText.substring(index));
        }
        
    }; // Start Method: execute
    
} // End Dynamic Class: Request