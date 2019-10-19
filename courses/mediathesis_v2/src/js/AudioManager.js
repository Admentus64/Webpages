// JavaScript Document
// Author: Robert Willem Hallink

var AudioManager = {   // Start Dynamic Class: AudioManager
    
    // Class Variables
    enabled: true,
    
    music: {
        "track" : null,
        "volume" : null,
        "length" : null,
        "timer" : null,
        "number" : null,
        "tracks" : [    "src/mp3/Computer.mp3",
                        "src/mp3/ItFeelsGoodToBeAlive.mp3",
                        "src/mp3/MariachiBanditsOfGatlingGunRidge.mp3",
                        "src/mp3/OldWhiteEye.mp3",
                        "src/mp3/Siesta.mp3" ],
        "volumes" : [0.6, 0.6, 0.6, 0.4, 0.3 ],
        "lengths" : [242, 220, 421, 283, 139] },
    
    // Set audio sounds for effects
    badSet1Snd: new Audio("src/wav/badSet1.wav"),
    badSet2Snd: new Audio("src/wav/badSet2.wav"),
    badSetHighValueSnd: new Audio("src/wav/badSetHighValue.wav"),
    badSetJokerSnd: new Audio("src/wav/badSetJoker.wav"),
    clickSnd: new Audio("src/wav/click.wav"),                         
    completeRowSnd: new Audio("src/wav/completeRow.wav"),
    goodSetSnd: new Audio("src/wav/goodSet.wav"),
    goodSetHighValueSnd: new Audio("src/wav/goodSetHighValue.wav"),
    goodSetJokerSnd: new Audio("src/wav/goodSetJoker.wav"),
    readySnd: new Audio("src/wav/ready.wav"),
    refillSnd: new Audio("src/wav/refill.wav"),
    skipSnd: new Audio("src/wav/skip.wav"),
    swapSnd: new Audio("src/wav/swap.wav"),
    timeOverSnd: new Audio("src/wav/timeOver.wav"),
    
    
    
    // Class Functions
    
    // Load the list with all available music tracks, fill it with filename paths and load the first music track for use
    init: function() {   // Start Function: init
        
        AudioManager.badSet1Snd.volume = 0.5;
        AudioManager.badSet2Snd.volume = 0.5;
        AudioManager.badSetHighValueSnd.volume = 0.5;
        AudioManager.badSetJokerSnd.volume = 0.5;
        AudioManager.clickSnd.volume = 1.0;
        AudioManager.completeRowSnd.volume = 1.0;
        AudioManager.goodSetSnd.volume = 1.0;
        AudioManager.goodSetHighValueSnd.volume = 0.7;
        AudioManager.goodSetJokerSnd.volume = 0.8;
        AudioManager.readySnd.volume = 1.0;
        AudioManager.refillSnd.volume = 1.0;
        AudioManager.skipSnd.volume = 0.5;
        AudioManager.swapSnd.volume = 1.0;
        AudioManager.timeOverSnd.volume = 1.0;
        
    }, // End Function: init
    
    disable: function() {   // Start Function: disable
        
        AudioManager.stopMusic();
        AudioManager.enabled = false;
        
    }, // End Function: disable
    
    enable: function() {   // Start Function: enable
        
        AudioManager.enabled = true;
        AudioManager.playMusic();
        
    }, // End Function: enable
    
    playMusic: function() {   // Start Function: playMusic
        
        if (AudioManager.enabled) {
            AudioManager.randomizeMusic();
            AudioManager.music.track.play(AudioManager.music.volume);
            AudioManager.music.timer = setTimeout(AudioManager.playMusic, AudioManager.music.length * 1000);
        }
        
    }, // End Function: playMusic
    
    stopMusic: function() {   // Start Function: stopMusic
        
        if (AudioManager.enabled && AudioManager.music.track !== null) {
            AudioManager.music.track.stop();
            clearTimeout(AudioManager.music.timer);
        }
        
    }, // Start Function: stopMusic
    
    randomizeMusic: function() {   // Start Function: randomizeMusic
        
        if (!AudioManager.enabled)
            return;
        
        AudioManager.stopMusic();
        
        var lastNumber = AudioManager.music.number;
        
        do {
            AudioManager.music.number = Math.floor(Math.random() * 5);
        } while (AudioManager.music.number === lastNumber);
        
        AudioManager.music.track = new MusicTrack(AudioManager.music.tracks[AudioManager.music.number]);
        AudioManager.music.volume = AudioManager.music.volumes[AudioManager.music.number];
        AudioManager.music.length = AudioManager.music.lengths[AudioManager.music.number];
        
    }, // Stop Function: randomizeMusic
    
    playSound: function(snd, start) {   // Start Function: playSound
        
        if (AudioManager.enabled)
            snd.play();
        if (start > 0)
            snd.currentTime = start;
        
    }, // End Function: playSound
    
    
    
}; // End Dynamic Class: AudioManager