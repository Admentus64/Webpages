// JavaScript Document
// Author: Robert Willem Hallink

function TimerApplication(clickSnd, pageContent, description) {   // Start Dynamic Child Class: TimerApplication
    
    // Call Parent Class
    Application.call(this);
    
    
    
    // Private Attributes
    var self = this;                                                // Refer to the class object itself (the keyword this will if called within a function refer to the function instead)
    var minuteElem = null;                                          // The tag element containing both minute digits on the clock
    var secondElem = null;                                          // The tag element containing both second digits on the clock
    var time = 0;                                                   // The time to keep track of
    var highestTime = 0;                                            // The highest amount of time that has been available
    var maxTime = 0;
    var timer = null;                                               // The timer that is used to countdown each second
    
    
    
    // Public Methods
    
    // Method which is used to initialize a new instance of the timer application
    this.init = function() {   // Start Method: init
        
        TimerApplication.prototype.init.call(self, "clock-window-wrapper", pageContent, description);   // Call the init function from the parent class shared code between classes
        self.contentElem = self.createElement("div", null, self.createElement("div", "clock-content-wrapper", self.windowElem));    // Set the window within the application to contain a digital clock
        
        // Append time elements to the clock digit wrapper
        minuteElem = self.createElement("ul", null, self.createElement("div", "clock-digit-wrapper minute", self.contentElem));     // Apply the minute section into the digital clock window
        secondElem = self.createElement("ul", null, self.createElement("div", "clock-digit-wrapper second", self.contentElem));     // Apply the second section into the digital clock window
        
        // Append digits to the clock (2 minute digits & 2 second digits)
        self.createElement("li", "clock-digit-zero", minuteElem);       // First minute digit
        self.createElement("li", "clock-digit-zero", minuteElem);       // Second minute digit
        self.createElement("li", "clock-digit-zero", secondElem);       // First second digit
        self.createElement("li", "clock-digit-zero", secondElem);       // Second second digit
        
        self.reset();
        
    }; // End Method: init
    
    // Set the timer to display 00:00:00
    this.reset = function() {   // Start Method: reset
        
        if (!self.isActivated())
            return;
        
        time = highestTime = 0;
        setClockDigits();
        
    }; // End Method: reset
    
    // Set the timer to display the requested time in seconds, which is translated in the format xx:xx:xx
    this.setCountdown = function(t) {   // Start Method: setCountdown
        
        if (!self.isActivated())
            return;
        
        time = highestTime = t;
        setClockDigits();
        
    }; // End Method: setCountdown
    
    this.addTime = function(t) {   // Start Method: addTime
        
        if (t <= 0 || !self.isActivated())
            return;
        
        time += t;
        if (time > highestTime)
            highestTime = time;
        if (maxTime > 0 && time > maxTime)
            time = maxTime;
        setClockDigits();
        
    }; // End Method: addTime
    
    this.setMaxTime = function(t) {   // Start Method: setMaxTime
        
        if (t <= 0)
            return;
        
        maxTime = t;
        
    }; // End Method: setMaxTime
    
    // Stop the timer from counting down if it is running
    this.stop = function() {   // Start Method: stop
        
        if (!self.isActivated())
            return;
        
        if (timer !== null) {                                       // Clear the timer if it is set as a variable (we would only set it as a timer variable or no variable at all)
            clearInterval(timer);
            timer = null;
        }
        
    }; // End Method: stop
    
    // Start the timer to counting down if it is not running
    this.start = function() {   // Start Method: start
        
        if (!self.isActivated())
            return;
        
        if (timer === null)
            timer = setInterval(update, 1000);
        
    }; // End Method: start
    
    // Deactivate the timer
    this.deactivate = function() {   // Start Method: deactivate
        
        self.stop();
        self.span.style.display = "none";
        
    }; // End Method: deactivate
    
    this.activate = function()                                      { self.span.style.display = "block"; };               // Method: activate             (Activate the timer)
    this.getRemainingTime = function()                              { return convertTimeToString(time); };                      // Method: getRemainingTime     (Get the remaining timer from the timer)
    this.getHighestTime = function()                                { return convertTimeToString(highestTime); };               // Method: getHighestTime       (Get the highest amount of time the timer had)
    this.isRunning = function()                                     { return (timer !== null); };                               // Method: isRunning            (Return true if the timer is active, otherwise return false)
    this.isActivated = function()                                   { return (self.span.style.display !== "none"); };     // Method: isActivated          (Return true if the timer is activated, otherwise return false)
    
    
    
    // Private Methods
    
    // Method to update the timer to decrease one second and to reflect that on the display
    var convertTimeToString = function(t) {
        
        var str = "", minutes = Math.floor(t / 60), seconds = t % 60;
        
        if (minutes < 10)
            str += "0";
        str += minutes + ":";
        if (seconds < 10)
            str += "0";
        str += seconds;
        return str;
        
    };
    
    var update = function() {   // Start Method: update
        
        time--;
        
        if (time <= 0) {
            GameScript.stopGameByTimer();
            self.stop();
        }
        
        setClockDigits();
        
    }; // End Method: update
    
    // Update the clock to display the current time left being counted
    var setClockDigits = function() {   // Start Method: setClockDigits
        
        var minutes = splitTime(Math.floor(time / 60));                   // Get the current amount of minutes (which is between 0 and 59) and split both digits
        var seconds = splitTime(time % 60);                         // Get the current amount of seconds (which is between 0 and 59) and split both digits
        
        for (var i=0; i<2; i++) {                                   // Run this seconds two times, one time for each digit (for seconds and minutes)
            minuteElem.childNodes[i].className = "clock-digit-" + self.convertDigitToText(minutes[i]);    // Convert and translate each digit (which is a string) into the class name for each minute digit on the clock
            secondElem.childNodes[i].className = "clock-digit-" + self.convertDigitToText(seconds[i]);    // Convert and translate each digit (which is a string) into the class name for each second digit on the clock
        }
        
    }; // End Method: setClockDigits
    
    // Split and convert an integer (either seconds or minutes) into a string. Two digits remains two characters, but one digits becomes two characters (an 0 is added)
    var splitTime = function(timeUnit) {   // Start Method: splitTime
        
        if (timeUnit >= 10)                                         // If more than 10 of a time unit have passed, convert both digits into an array of two elements as a string
            return String(timeUnit).split('');
        return ["0", String(timeUnit)];                             // If not, create a new array of two elements as a string, the first being 0 and the second the value of the time unit
        
    }; // End Method: splitTime
    
    var close = function() { self.stop(); };   // Method: close     (Close this instance, stop the timer)
    
        
    
    // Public Commands
    this.init();                                                    // Initialize a new object instance by calling the init function
    
} // End Dynamic Child Class: TimerApplication



// Initialize Class with Parent Class
TimerApplication.prototype = new Application();
TimerApplication.prototype.constructor = TimerApplication;