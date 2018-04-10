function ClockApplication() {   // Start Dynamic Child Class: CLockApplication
    
    // Call Parent Class
    Application.call(this);
    
    
    
    // Private Variables
    var self = this;                                                                    // Refer to the class object itself (the keyword this will if called within a function refer to the function instead)
    var hourElem = null;                                                                // The tag element containing both hour digits on the clock
    var minuteElem = null;                                                              // The tag element containing both minute digits on the clock
    var secondElem = null;                                                              // The tag element containing both second digits on the clock
    
    
    
    // Public Functions
    
    // Function which is used to initialize a new instance of the clock application
    this.init = function() {   // Start Function: init
        
        ClockApplication.prototype.init.call(this, "clock-window-wrapper", "clock-menubar-wrapper");                                // Call the init function from the parent class shared code between classes
        this.contentElem = this.createElement("div", null, this.createElement("div", "clock-content-wrapper", this.windowElem));    // Set the window within the application to contain a digital clock
        
        // Append time elements to the clock digit wrapper
        hourElem = this.createElement("ul", null, this.createElement("div", "clock-digit-wrapper hour", this.contentElem));         // Apply the hour section into the digital clock window
        minuteElem = this.createElement("ul", null, this.createElement("div", "clock-digit-wrapper minute", this.contentElem));     // Apply the minute section into the digital clock window
        secondElem = this.createElement("ul", null, this.createElement("div", "clock-digit-wrapper second", this.contentElem));     // Apply the second section into the digital clock window
        
        // Append digits to the clock (2 hour digits, 2 minute digits & 2 second digits)
        this.createElement("li", "clock-digit-one", hourElem);                          // First hour digit
        this.createElement("li", "clock-digit-three", hourElem);                        // Second hour digit
        this.createElement("li", "clock-digit-three", minuteElem);                      // First minute digit
        this.createElement("li", "clock-digit-seven", minuteElem);                      // Second minute digit
        this.createElement("li", "clock-digit-zero", secondElem);                       // First second digit
        this.createElement("li", "clock-digit-zero", secondElem);                       // Second second digit
        
        this.sync();                                                                    // Do a sync with the clock (call a function to do so)
        
    }; // End Function: init
    
    this.sync = function() {   // Start Function: sync
        
        var date = new Date();                                                          // Get the current date
        var milliseconds = date.getMilliseconds();                                      // Get the current amount of milliseconds (which is between 0 and 999)
        setTimeout(executeSync, 1000 - milliseconds);                                   // The timer to update the clock every second is activated when the system time is at exactly 0 milliseconds (new clocks will update at exactly the same time)
        update();                                                                       // Update the timer on the clock (call a function to do so)
        
    }; // End Function: sync
    
    
    
    // Private Functions
    var update = function() {   // Start Function: update
        
        var date = new Date();                                                          // Get the current date
        var seconds = splitTime(date.getSeconds());                                     // Get the current amount of seconds (which is between 0 and 59) and split both digits
        var minutes = splitTime(date.getMinutes());                                     // Get the current amount of minutes (which is between 0 and 59) and split both digits
        var hours = splitTime(date.getHours());                                         // Get the current amount of hours (which is between 0 and 23) and split both digits
        
        for (var i=0; i<2; i++) {                                                       // Run this seconds two times, one time for each digit (for seconds, minutes and hours)
            secondElem.childNodes[i].className = "clock-digit-" + self.convertDigitToText(seconds[i]);      // Convert and translate each digit (which is a string) into the class name for each second digit on the clock
            minuteElem.childNodes[i].className = "clock-digit-" + self.convertDigitToText(minutes[i]);      // Convert and translate each digit (which is a string) into the class name for each minute digit on the clock
            hourElem.childNodes[i].className = "clock-digit-" + self.convertDigitToText(hours[i]);          // Convert and translate each digit (which is a string) into the class name for each hour digit on the clock
        }
        
    }; // End Function: update
    
    var splitTime = function(timeUnit) {   // Start Function: splitTime
        
        if (timeUnit >= 10)                                                             // If more than 10 of a time unit have passed, convert both digits into an array of two elements as a string
            return String(timeUnit).split('');
        return ["0", String(timeUnit)];                                                 // If not, create a new array of two elements as a string, the first being 0 and the second the value of the time unit
        
    }; // End Function: splitTime
    
    var executeSync = function() {   // Start Function: executeSync
        
        clearInterval(self.timer);                                                      // First reset the timer to ensure it only is used once
        self.timer = setInterval(update, 1000);                                         // Set the timer to be activated every one second (= 1000 ms) and keep repeating so until otherwise told
        update();                                                                       // Update the timer on the clock (call a function to do so)
        
    }; // End Function: executeSync
    
    
    
    // Public Commands
    this.init();                                                                        // Initialize the ClockApplication by calling the init function
    
} // End Dynamic Child Class: ClockApplication



// Initialize Class with Parent Class
ClockApplication.prototype = new Application();
ClockApplication.prototype.constructor = ClockApplication;