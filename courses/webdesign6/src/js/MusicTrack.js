// JavaScript Document
// Author: Robert Willem Hallink

function MusicTrack(path) {   // Start Dynamic Class: MusicTrack
    
    // Local Attributes
    var track = null;                                               // The audio object
    // var time = null;                                             // The total duration of the music track
    // var name = null;                                             // The name of the music track
    var self = this;                                                // Refer to the class object itself (the keyword this will if called within a function refer to the function instead)
    
    
    
    // Public Methods
    
    // Method to start playing the music track if not already playing
    this.play = function() {   // Start Method: play
        
        if (track.paused)
            track.play();
        
    }; // End Method: play
    
    // Method to stop playing the music track if playing
    this.pause = function() {   // Start Method: pause
        
        if (!track.paused)
            track.pause();
        
    }; // End Method: pause
    
    // Method to restart and replay the music track from the start
    this.restart = function() {   // Start Method: restart
        
        track.currentTime = 0;
        self.play();
        
    }; // End Method: restart
    
    // Method to stop and reset the music track to the start
    this.stop = function() {   // Start Method: stop
        
        track.currentTime = 0;
        self.pause();
        
    }; // End Method: stop
    
    this.getPath = function()                                       { return path; };               // Method: getPath      (return the provided file path of the music track file)
    this.isPlaying = function()                                     { return !track.paused; };      // Method: isPlaying    (return true if the music track is currently playing, otherwise return false)
    
    
    
    // Private Methods
    
    // Method which is used to initialize a new instance of a music track
    var init = function() {   // Start Method: init
        
        track = new Audio(path);
        track.loop = true;
        
    }; // End Method: init
    
    
    
    // Private Commands
    init();                                                         // Initialize a new object instance by calling the init function
    
} // End Dynamic Class: MusicTrack