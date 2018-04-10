// JavaScript Document
// Author: Robert Willem Hallink

var MusicPlayer = {   // Start Static Class: MusicPlayer
    
    // Class Variables
    playBtn: null,                                                  // The Play / Pause button for playing or pausing music
    restartBtn: null,                                               // The Restart button for restarting the music track
    nextBtn: null,                                                  // The Next button to play the next music track
    previousBtn: null,                                              // The Previous button to play the previous music track
    trackNr: null,                                                  // Keep track of the current music track in the music list (as an index number) which is in use
    track: null,                                                    // The current music track in use
    list: null,                                                     // The list containing all filename paths for the music tracks
    
    
    
    // Class Functions
    
    // Functions to run when the webpage is loaded (all HTML-code is executed). Initialize global variables and relates functions to buttons
    init: function() {   // Start Function: init
        
        // Link to HTML elements
        MusicPlayer.playBtn = document.getElementById("playMusicBtn");
        MusicPlayer.restartBtn = document.getElementById("restartMusicBtn");
        MusicPlayer.nextBtn = document.getElementById("nextMusicBtn");
        MusicPlayer.previousBtn = document.getElementById("previousMusicBtn");
        
        // Add events for all the available buttons
        Event.add(MusicPlayer.playBtn, "click", MusicPlayer.play);
        Event.add(MusicPlayer.restartBtn, "click", MusicPlayer.restart);
        Event.add(MusicPlayer.nextBtn, "click", MusicPlayer.playNext);
        Event.add(MusicPlayer.previousBtn, "click", MusicPlayer.playPrevious);
        
        // Load the list with music
        MusicPlayer.loadList();
        
    }, // End Function: init
    
    
    
    // Load the list with all available music tracks, fill it with filename paths and load the first music track for use
    loadList: function() {   // Start Function: loadList
        
        MusicPlayer.list = [];
        MusicPlayer.trackNr = 0;
        MusicPlayer.list.push("src/mp3/Siesta.mp3");
        MusicPlayer.list.push("src/mp3/Second Encounter.mp3");
        MusicPlayer.track = new MusicTrack(MusicPlayer.list[MusicPlayer.trackNr]);
        
    }, // End Function: loadList
    
    
    
    // Play or pause the current music track in use
    play: function() {   // Start Function: play
        
        if (!MusicPlayer.track.isPlaying()) {                       // If the current music track is not playing then play it
            MusicPlayer.track.play();
            MusicPlayer.playBtn.innerHTML = "Pause";
        }
        else {                                                      // Otherwise it must be playing so stop playing it
            MusicPlayer.track.pause();
            MusicPlayer.playBtn.innerHTML = "Play";
        }
        
    }, // End Function: play
    
    
    
    // Restart the current music track in use, which causes it to play again from the start
    restart: function() {   // Start Function: restart
        
        MusicPlayer.track.restart();
        MusicPlayer.playBtn.innerHTML = "Pause";
        
    }, // End Function: restart
    
    
    
    // Stop the current music track in use, load the next music track in the music list and play that from the start
    playNext: function() {   // Start Function: playNext
        
        if (MusicPlayer.trackNr < MusicPlayer.list.length-1)        // Get the next available music track filename path from the music list, if it is already the last song then go to the first song again
            MusicPlayer.trackNr++;
        else MusicPlayer.trackNr = 0;
        MusicPlayer.track.stop();                                   // Stop the current music track from playing, replace it with the next music track and play that instead
        MusicPlayer.track = new MusicTrack(MusicPlayer.list[MusicPlayer.trackNr]);
        MusicPlayer.play();
        
    }, // End Function: playNextTrack
    
    
    
    // Stop the current music track in use, load the previous music track in the music list and play that from the start
    playPrevious: function() {   // Start Function: playPrevious
        
        if (MusicPlayer.trackNr > 0)                        // Get the previous available music track filename path from the music list, if it is already the first song then go to the last song again
            MusicPlayer.trackNr--;
        else MusicPlayer.trackNr = MusicPlayer.list.length-1;
        MusicPlayer.track.stop();                           // Stop the current music track from playing, replace it with the previous music track and play that instead
        MusicPlayer.track = new MusicTrack(MusicPlayer.list[MusicPlayer.trackNr]);
        MusicPlayer.play();
        
    }, // End Function: playPrevious
    
}; // End Static Class: MusicPlayer