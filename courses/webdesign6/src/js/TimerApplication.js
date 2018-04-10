// JavaScript Document
// Author: Robert Willem Hallink

function TimerApplication(clickSnd, pageContent, drag) {   // Start Dynamic Child Class: TimerApplication
    
    // Call Parent Class
    Application.call(this);
    
    
    
    // Private Attributes
    var self = this;                                                // Refer to the class object itself (the keyword this will if called within a function refer to the function instead)
    var hourElem = null;                                            // The tag element containing both hour digits on the clock
    var minuteElem = null;                                          // The tag element containing both minute digits on the clock
    var secondElem = null;                                          // The tag element containing both second digits on the clock
    var hours = 0;                                                  // The amount of hours to keep track of
    var minutes = 0;                                                // The amount of minutes to keep track of
    var seconds = 0;                                                // The amount of seconds to keep track of
    var timer = null;                                               // The timer that is used to countdown each second
    
    
    
    // Public Methods
    
    // Method which is used to initialize a new instance of the timer application
    this.init = function() {   // Start Method: init
        
        TimerApplication.prototype.init.call(self, "clock-window-wrapper", "clock-menubar-wrapper", clickSnd, pageContent, drag);   // Call the init function from the parent class shared code between classes
        self.contentElem = self.createElement("div", null, self.createElement("div", "clock-content-wrapper", self.windowElem));    // Set the window within the application to contain a digital clock
        
        // Append time elements to the clock digit wrapper
        hourElem = self.createElement("ul", null, self.createElement("div", "clock-digit-wrapper hour", self.contentElem));         // Apply the hour section into the digital clock window
        minuteElem = self.createElement("ul", null, self.createElement("div", "clock-digit-wrapper minute", self.contentElem));     // Apply the minute section into the digital clock window
        secondElem = self.createElement("ul", null, self.createElement("div", "clock-digit-wrapper second", self.contentElem));     // Apply the second section into the digital clock window
        
        // Append digits to the clock (2 hour digits, 2 minute digits & 2 second digits)
        self.createElement("li", "clock-digit-one", hourElem);          // First hour digit
        self.createElement("li", "clock-digit-three", hourElem);        // Second hour digit
        self.createElement("li", "clock-digit-three", minuteElem);      // First minute digit
        self.createElement("li", "clock-digit-seven", minuteElem);      // Second minute digit
        self.createElement("li", "clock-digit-zero", secondElem);       // First second digit
        self.createElement("li", "clock-digit-zero", secondElem);       // Second second digit
        
        // Add a button to close the application and events for doing so, but for this project there is no need to close an Timer Application by the user
        //self.createElement("div", "close", self.menubarElem);
        //Event.add(self.menubarElem.childNodes[0], "click", self.close);
        //Event.add(self.menubarElem.childNodes[0], "click", close);
        
        self.reset();
        
    }; // End Method: init
    
    // Set the timer to display 00:00:00
    this.reset = function() {   // Start Method: reset
        
        seconds = minutes = hours = 0;
        setClockDigits();
        
    }; // End Method: reset
    
    // Set the timer to display the requested time in seconds, which is translated in the format xx:xx:xx
    this.setCountdown = function(time) {   // Start Method: setCountdown
        
        self.reset();
        seconds = time;
        while (seconds > 59) {                                      // Every 60 seconds is converted into 1 minute
            seconds = seconds - 60;
            minutes++;
        }
        while (minutes > 59) {                                      // Every 60 minutes is converted into 1 hour
            minutes = minutes - 60;
            hours++;
        }
        setClockDigits();
        
    }; // End Method: setCountdown
    
    // Stop the timer from counting down if it is running
    this.stop = function() {   // Start Method: stop
        
        if (timer !== null) {                                       // Clear the timer if it is set as a variable (we would only set it as a timer variable or no variable at all)
            clearInterval(timer);
            timer = null;
        }
        
    }; // End Method: stop
    
    // Start the timer to counting down if it is not running
    this.start = function() {   // Start Method: start
        
        if (timer === null)
            timer = setInterval(update, 1000);
        
    }; // End Method: start
    
    this.getRemainingTime = function()                              { return seconds + (60 * minutes) + (60 * 60 * hours); };   // Method: getRemainingTime     (Get the remaining timer on the timer in seconds)
    this.isActive = function()                                      { return (timer !== null); };                               // Method: isActive             (Return true if the timer is active, otherwise return false)
    
    
    
    // Private Methods
    
    // Method to update the timer to decrease one second and to reflect that on the display
    var update = function() {   // Start Method: update
        
        seconds--;                                                  // Decrease with one second
        if (seconds === -1) {                                       // If the seconds are below 0 then decrease 1 minute instead and add 59 seconds again
            seconds = 59;
            minutes--;
        }
        if (minutes === -1) {                                       // If the minutes are below 0 then decrease 1 hour instead and add 59 minutes again
            minutes = 59;
            hours--;
        }
        
        if (seconds === 0 && minutes === 0 && hours === 0) {        // If the timer reaches 00:00:00 then stop the timer from updating and call the function to end the game
            GameScript.stopGameByTimer();
            self.stop();
        }
        
        setClockDigits();
        
    }; // End Method: update
    
    // Update the clock to display the current time left being counted
    var setClockDigits = function() {   // Start Method: setClockDigits
        
        var s = splitTime(seconds);                                 // Get the current amount of seconds (which is between 0 and 59) and split both digits
        var m = splitTime(minutes);                                 // Get the current amount of minutes (which is between 0 and 59) and split both digits
        var h = splitTime(hours);                                   // Get the current amount of hours (which is between 0 and 23) and split both digits
        
        for (var i=0; i<2; i++) {                                   // Run this seconds two times, one time for each digit (for seconds, minutes and hours)
            secondElem.childNodes[i].className = "clock-digit-" + self.convertDigitToText(s[i]);    // Convert and translate each digit (which is a string) into the class name for each second digit on the clock
            minuteElem.childNodes[i].className = "clock-digit-" + self.convertDigitToText(m[i]);    // Convert and translate each digit (which is a string) into the class name for each minute digit on the clock
            hourElem.childNodes[i].className = "clock-digit-" + self.convertDigitToText(h[i]);      // Convert and translate each digit (which is a string) into the class name for each hour digit on the clock
        }
        
    }; // End Method: setClockDigits
    
    // Split and convert an integer (either seconds, minutes or hours) into a string. Two digits remains two characters, but one digits becomes two characters (an 0 is added)
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