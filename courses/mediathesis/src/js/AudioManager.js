// JavaScript Document
// Author: Robert Willem Hallink

var AudioManager = {   // Start Dynamic Class: AudioManager
    
    // Class Variables
    enabled: true,
    
    music: new MusicTrack("src/mp3/Siesta.mp3"),
    
    clickSnd: new Audio("src/wav/click.wav"),                         // Set an audio sound for clickSnd
    completeRowSnd: new Audio("src/wav/completeRow.wav"),
    failedSetSnd: new Audio("src/wav/failedSet.wav"),
    goodSetSnd: new Audio("src/wav/goodSet.wav"),
    readySnd: new Audio("src/wav/ready.wav"),
    refillSnd: new Audio("src/wav/refill.wav"),
    swapSnd: new Audio("src/wav/swap.wav"),
    timeOverSnd: new Audio("src/wav/timeOver.wav"),
    
    
    
    // Class Functions
    
    // Load the list with all available music tracks, fill it with filename paths and load the first music track for use
    init: function() {   // Start Function: init
        
        AudioManager.clickSnd.volume = 1.0;
        AudioManager.completeRowSnd.volume = 1.0;
        AudioManager.failedSetSnd.volume = 0.5;
        AudioManager.goodSetSnd.volume = 1.0;
        AudioManager.readySnd.volume = 1.0;
        AudioManager.refillSnd.volume = 1.0;
        AudioManager.swapSnd.volume = 1.0;
        AudioManager.timeOverSnd.volume = 1.0;
        
    }, // End Function: init
    
    disable: function() {   // Start Function: disable
        
        AudioManager.enabled = false;
        AudioManager.music.stop();
        
    }, // End Function: disable
    
    enable: function() {   // Start Function: enable
        
        AudioManager.enabled = true;
        AudioManager.music.play(0.2);
        
    }, // End Function: enable
    
    playMusic: function() {   // Start Function: playMusic
        
        if (AudioManager.enabled)
            AudioManager.music.play(0.2);
        
    }, // End Function: playMusic
    
    stopMusic: function() {   // Start Function: stopMusic
        
        if (AudioManager.enabled)
            AudioManager.music.stop();
        
    }, // Start Function: stopMusic
    
    playSound: function(snd, start) {   // Start Function: playSound
        
        if (AudioManager.enabled)
            snd.play();
        if (start > 0)
            snd.currentTime = start;
        
    }, // End Function: playSound
    
    
    
}; // End Dynamic Class: AudioManager