// JavaScript Document
// Author: Robert Willem Hallink

var PlayTheGame = {   // Start Static Class: PlayTheGame
    
    // Class Variables
    nextPresetBtn: null,
    pauseBtn: null,                                                 // The Pause button to pause the game when a timer is being used
    stopBtn: null,
    startBtn: null,
    rateBtn: null,
    
    instructionsDiv: null,
    instructionsText: null,
    finishedDiv: null,
    rateDiv: null,
    rateText: null,
    
    stars: null,
    
    firstCookieRound: true,
    
    
    
    // Class Functions
    
    // Functions to run when the webpage is loaded (all HTML-code is executed). Initialize global variables and relates functions to buttons
    init: function() {   // Start Function: init
        
        // Link to HTML elements
        PlayTheGame.nextPresetBtn = document.getElementById("nextPresetBtn");
        PlayTheGame.pauseBtn = document.getElementById("pauseBtn");
        PlayTheGame.stopBtn = document.getElementById("stopBtn");
        PlayTheGame.startBtn = document.getElementById("startBtn");
        PlayTheGame.rateBtn = document.getElementById("rateBtn");
        
        PlayTheGame.instructionsDiv = document.getElementById("instructions");
        PlayTheGame.instructionsText = document.getElementById("instructionsText");
        PlayTheGame.finishedDiv = document.getElementById("finished");
        PlayTheGame.rateDiv = document.getElementById("rate");
        PlayTheGame.rateText = document.getElementById("rateText");
        
        PlayTheGame.stars = document.getElementById("stars").getElementsByTagName("input");
        
        // Disable the Next, Restart and Pause button by default (since loading the memory game page does not start the actual game yet)
        PlayTheGame.pauseBtn.disabled = true;
        PlayTheGame.stopBtn.disabled = true;
        
        // Add events for the available buttons
        Event.add(PlayTheGame.nextPresetBtn, "click", PlayTheGame.nextPreset);
        Event.add(PlayTheGame.stopBtn, "click", PlayTheGame.stop);
        Event.add(PlayTheGame.startBtn, "click", PlayTheGame.start);
        Event.add(PlayTheGame.pauseBtn, "click", PlayTheGame.pause);
        Event.add(PlayTheGame.rateBtn, "click", PlayTheGame.rate);
        
        for (var i=0; i<PlayTheGame.stars.length; i++)
            Event.add(PlayTheGame.stars[i], "click", PlayTheGame.setStars);
        
        //for (var star of PlayTheGame.stars)
        //    Event.add(star, "click", PlayTheGame.setStars);
        
        if (Cookie.check("resume", "1")) {
            Statistics.rounds = Cookie.get("rounds", false, true);
            GameScript.presets = Cookie.get("presets", true, false);
            Statistics.preset = Cookie.get("preset", true, false);
            Statistics.rating = Cookie.get("rating", true, false);
            Statistics.points = Cookie.get("points", true, true);
            Statistics.goodSets = Cookie.get("goodSets", true, true);
            Statistics.failedSets = Cookie.get("failedSets", true, true);
            Statistics.difficulty = Cookie.get("difficulty", true, false);
            Statistics.finalDifficulty = Cookie.get("finalDifficulty", true, false);
            Statistics.timeHighest = Cookie.get("timeHighest", true, false);
            Statistics.timePlayed = Cookie.get("timePlayed", true, false);
        }
        
        PlayTheGame.nextPreset();
        
    }, // End Function: init
    
    
    
    // When pressing the "Next Preset" button, proceed to run the next preset
    nextPreset: function() {   // Start Function: nextPreset
        
        GameScript.setSetting("preset", GameScript.getPreset());
        PlayTheGame.instructionsDiv.style.display = "Block";
        PlayTheGame.nextPresetBtn.disabled = true;
        
        if (GameScript.getPreset() === "Easier")
            PlayTheGame.instructionsText.innerHTML = "<b>Preset: Easier</b><br><br>This round is made easier. You start with more time and can store more of it, the difficulty will start lower, rises slower and stops rising earier, there is more time to prepare each round and receive 1 extra second when clearing cards.";
        
        if (GameScript.getPreset() === "Harder")
            PlayTheGame.instructionsText.innerHTML = "<b>Preset: Harder</b><br><br>This round is made harder. You start with less time and can store less of it, the difficulty will start higher, rises faster and continues further, there is less time to prepare each round and receive 1 fewer second when clearing cards.";
        
        if (GameScript.getPreset() === "Choices")
            PlayTheGame.instructionsText.innerHTML = "<b>Preset: Choices</b><br><br>Choices have been removed in this round. All cards give the same amount of points and all cards need to be cleared rather than clearing one row.";
        
        if (GameScript.getPreset() === "Audiovisual")
            PlayTheGame.instructionsText.innerHTML = "<b>Preset: Audiovisual</b><br><br>This round has no sound, music or animation.";
        
        if (GameScript.getPreset() === "Static Time")
            PlayTheGame.instructionsText.innerHTML = "<b>Preset: Static Time</b><br><br>There is no timer this round that runs on a short notice and you can no longer gain extra time. You have 2 minutes to play. Try to come as far as you can, for a more relaxing time.";
         
        if (GameScript.getPreset() === "Default")
            PlayTheGame.instructionsText.innerHTML = "<b>Preset: Default</b><br><br>No rules have been changed this round.";
        
        if (GameScript.getPreset() === "Audiovisual") {
            AudioManager.disable();
            document.getElementsByTagName("Main")[0].style.backgroundColor = "#E5E5E5";
            
            PlayTheGame.nextPresetBtn = document.getElementById("nextPresetBtn");
            PlayTheGame.pauseBtn.style.border = PlayTheGame.stopBtn.style.border = PlayTheGame.nextPresetBtn.style.border = PlayTheGame.startBtn.style.border = "0";
            PlayTheGame.pauseBtn.style.borderRadius = PlayTheGame.stopBtn.style.borderRadius = PlayTheGame.nextPresetBtn.style.borderRadius = PlayTheGame.startBtn.style.borderRadius = "0";
            PlayTheGame.pauseBtn.style.backgroundColor = PlayTheGame.stopBtn.style.backgroundColor = PlayTheGame.nextPresetBtn.style.backgroundColor = PlayTheGame.startBtn.style.backgroundColor = "#FFFFFF";
        }
        else {
            AudioManager.enable();
            document.getElementsByTagName("Main")[0].removeAttribute("style");
            PlayTheGame.pauseBtn.removeAttribute("style");
            PlayTheGame.stopBtn.removeAttribute("style");
            PlayTheGame.nextPresetBtn.removeAttribute("style");
            PlayTheGame.startBtn.removeAttribute("style");
        }
        
        if (GameScript.getPreset() === "Easier")
            GameScript.difficulty = "Very Easy";
        else if (GameScript.getPreset() === "Harder")
            GameScript.difficulty = "Medium";
        else GameScript.difficulty = "Easy";
        GameScript.setSetting("difficulty", GameScript.difficulty);
        
        // Debug Only
        //GameScript.setSetting("difficulty", "Very Easy");
        
        GameScript.setDifficulty();
        GameScript.addBricks();
        
        GameScript.setSetting("progress", 7-GameScript.presets.length + "/6");
        
        if (GameScript.presets.length !== 6 && !PlayTheGame.firstCookieRound) {
            Cookie.set("resume", "1", 10);
            Cookie.set("rounds", Statistics.rounds, 10);
            Cookie.set("presets", GameScript.presets, 10);
            Cookie.set("preset", Statistics.preset, 10);
            Cookie.set("rating", Statistics.rating, 10);
            Cookie.set("points", Statistics.points, 10);
            Cookie.set("goodSets", Statistics.goodSets, 10);
            Cookie.set("failedSets", Statistics.failedSets, 10);
            Cookie.set("difficulty", Statistics.difficulty, 10);
            Cookie.set("finalDifficulty", Statistics.finalDifficulty, 10);
            Cookie.set("timeHighest", Statistics.timeHighest, 10);
            Cookie.set("timePlayed", Statistics.timePlayed, 10);
        }
        
        // Enable code for project
        //PlayTheGame.stopBtn.style.visibility = "hidden";
        
    }, // End Preset: nextPreset
    
    // When pressing the "Start" button the game should start, thus run the setup
    start: function() {   // Start Function: startGame
        
        PlayTheGame.instructionsDiv.style.display = "None";
        
        Statistics.startNewRound();
        
        // Resetting global variables with each new game
        GameScript.swap = new Array(null, null);
        GameScript.swappedBricks = 0;                               // Set value to 0
        
        // Disable all buttons for now
        PlayTheGame.pauseBtn.disabled = false;
        PlayTheGame.pauseBtn.innerHTML = "Pause";
        PlayTheGame.nextPresetBtn.disabled = true;
        PlayTheGame.stopBtn.disabled = false;
        
        GameScript.infoElem.points.innerHTML = Statistics.getPoints();
        GameScript.infoElem.goodSets.innerHTML = Statistics.getGoodSets();
        GameScript.infoElem.failedSets.innerHTML = Statistics.getFailedSets();
        
        GameScript.timeouts.timePlayed = setInterval(GameScript.countTimePlayed, 1000);
        
        GameScript.infoElem.timePlayed.innerHTML = "00:00";
        GameScript.setMessage("");
        
        // Start the appropriate timer
        if (GameScript.getPreset() === "Static Time") {
            GameScript.clocks.shortClock.deactivate();
            GameScript.clocks.longClock.activate();
            GameScript.clocks.longClock.setCountdown(GameScript.clocks.totalTime);
        }
        else {
            GameScript.clocks.shortClock.activate();
            GameScript.clocks.longClock.deactivate();
            GameScript.clocks.shortClock.setCountdown(GameScript.clocks.startingTime);
        }
        
        GameScript.clocks.shortClock.start();
        GameScript.clocks.longClock.start();
        PlayTheGame.startViewingCards();
        
    }, // End startGame
    
    
    
    // Function to stop the game when pressing the button for it
    stop: function() {   // Start Function: stopGame
        
        Statistics.endRound();
        if (!PlayTheGame.isRunning())
            GameScript.setMessage("");
        
        GameScript.clocks.shortClock.stop();                                            // Stop the timers
        GameScript.clocks.longClock.stop();
        
        // Disable the Next, Restart and Pause buttons, prevent the Start button from ending a game and allow it to start a new game again
        PlayTheGame.pauseBtn.disabled = true;
        PlayTheGame.pauseBtn.innerHTML = "Pause";
        PlayTheGame.stopBtn.disabled = true;
        
        if (GameScript.getPreset() === "Easier")
            PlayTheGame.rateText.innerHTML = "Please rate this preset: Easier";
        if (GameScript.getPreset() === "Harder")
            PlayTheGame.rateText.innerHTML = "Please rate this preset: Harder";
        if (GameScript.getPreset() === "Choices")
            PlayTheGame.rateText.innerHTML = "Please rate this preset: Choices";
        if (GameScript.getPreset() === "Audiovisual")
            PlayTheGame.rateText.innerHTML = "Please rate this preset: Audiovisual";
        if (GameScript.getPreset() === "Static Time")
            PlayTheGame.rateText.innerHTML = "Please rate this preset: Static Time";
        if (GameScript.getPreset() === "Default")
            PlayTheGame.rateText.innerHTML = "Please rate this preset: Default";
            
        PlayTheGame.rateDiv.style.display = "Block";
        rateBtn.disabled = true;
        
        clearTimeout(GameScript.timeouts.next);
        clearTimeout(GameScript.timeouts.refrillBricks);
        clearInterval(GameScript.timeouts.timePlayed);
        
        PlayTheGame.firstCookieRound = false;
        
    }, // End Function: stopGame
    
    rate: function() {   // Start Function: rate
        
        PlayTheGame.rateDiv.style.display = "None";
        
        GameScript.presets.shift();
        if (GameScript.presets.length !==  0)
            PlayTheGame.nextPresetBtn.disabled = false;
        else {
            Statistics.endExperiment();
            
            Cookie.erase("resume");
            Cookie.erase("rounds");
            Cookie.erase("presets");
            Cookie.erase("preset");
            Cookie.erase("rating");
            Cookie.erase("points");
            Cookie.erase("goodSets");
            Cookie.erase("failedSets");
            Cookie.erase("difficulty");
            Cookie.erase("finalDifficulty");
            Cookie.erase("timeHighest");
            Cookie.erase("timePlayed");
        }
        
        Statistics.time = 0;
        
        for (var i=0; i<PlayTheGame.stars.length; i++)
            PlayTheGame.stars[i].checked = false;
        
    }, // End Function: rate
    
    
    
    setStars: function() {   // Start Function: setStars
        
        Statistics.setRating(this.getAttribute("value"));
        rateBtn.disabled = false;
        
    }, // End Function: setStars
    
    
    
    // Function to pause the game when pressing the button for it
    pause: function() {   // Start Function: pauseGame
        
        if (PlayTheGame.isRunning()) {                              // Pause the game if it is running and pause the timer as well
            PlayTheGame.pauseBtn.innerHTML = "Resume";
            GameScript.setMessage("The game is paused!");
            GameScript.clocks.shortClock.stop();
            GameScript.clocks.longClock.stop();
            AudioManager.stopMusic();
            clearInterval(GameScript.timeouts.timePlayed);
        }
        else {                                                      // Otherwise resume the game again and resume the timer as well
            PlayTheGame.pauseBtn.innerHTML = "Pause";
            GameScript.setMessage("");
            GameScript.clocks.shortClock.start();
            GameScript.clocks.longClock.start();
            AudioManager.playMusic();
            GameScript.timeouts.timePlayed = setInterval(GameScript.countTimePlayed, 1000);
        }
        
    }, // End Function: pauseGame
    
    
    
    // Function to restart the game when pressing the button for it
    restart: function() {   // Start Function: restartGame
        
        PlayTheGame.stop();                                         // Stop the game first
        PlayTheGame.start();                                        // Then start it again
        
    }, // End Function: restartGame
    
    // Check the values of both swapped bricks on the screen when pressing the "Next" button
    next: function() {   // Start Function: checkSwaps
        
        var i, points = 0;
        
        // If both swapped bricks have the same image then empty both bricks from the field, otherwise just swap them on their back again
        if (GameScript.swap[0] === GameScript.swap[1]) {
            GameScript.clocks.shortClock.addTime(GameScript.clocks.bonusTime);
            for (i=0; i<GameScript.bricks.Array.length; i++) {               // Go through each brick in the list of bricks and check if the current brick is swapped
                if (GameScript.bricks.Array[i].isSwapped()) {
                    if (GameScript.getPreset() === "Choices")
                        points = 7;
                    else points = GameScript.bricks.Array[i].getValue();
                    GameScript.bricks.Array[i].empty();
                }
            }
            
            setTimeout(GameScript.throwBricksAway, 50);
            Statistics.setPoints(points, true);
            AudioManager.playSound(AudioManager.goodSetSnd);
            GameScript.infoElem.goodSets.innerHTML = Statistics.setGoodSets(true);
            GameScript.infoElem.points.innerHTML = Statistics.getPoints();
        }
        else {
           for (i=0; i<GameScript.bricks.Array.length; i++)               // Go through each brick in the list of bricks and check if the current brick is swapped
              if (GameScript.bricks.Array[i].isSwapped()) {
                  GameScript.bricks.Array[i].back();
                  if (GameScript.getPreset() !== "Audiovisual")
                    GameScript.bricks.Array[i].flash();
              }
          GameScript.swappedBricks -= 2;
          AudioManager.playSound(AudioManager.failedSetSnd);
          GameScript.infoElem.failedSets.innerHTML = Statistics.setFailedSets(true);
        }
        
        GameScript.swap[0] = GameScript.swap[1] = null;             // Reset the swapped bricks being kept track of
        //PlayTheGame.nextBtn.disabled = true;                      // Disable the Next button
        
    }, // End Function: checkSwaps
    
    startViewingCards: function() {   // Start Function: startViewingCards
        
        for (var i=0; i<GameScript.bricks.Array.length; i++)
            GameScript.bricks.Array[i].front();
        
        PlayTheGame.pauseBtn.disabled = true;
        GameScript.clocks.shortClock.stop();
        GameScript.clocks.longClock.stop();
        
        if (GameScript.getPreset() === "Easier") {
            setTimeout(PlayTheGame.endViewingCards, 7000);
            AudioManager.playSound(AudioManager.readySnd, 4);
        }
        else if (GameScript.getPreset() === "Harder") {
            setTimeout(PlayTheGame.endViewingCards, 3000);
            AudioManager.playSound(AudioManager.readySnd, 8);
        }
        else {
            setTimeout(PlayTheGame.endViewingCards, 5000);
            AudioManager.playSound(AudioManager.readySnd, 6);
        }
        
    }, // End Function: startViewingCards
    
    endViewingCards: function() {   // Start Function: endViewingCards
        
        for (var i=0; i<GameScript.bricks.Array.length; i++)
            GameScript.bricks.Array[i].back();
        
        PlayTheGame.pauseBtn.disabled = false;
        GameScript.clocks.shortClock.start();
        GameScript.clocks.longClock.start();
        
    }, // End Function: endViewingCards
    
    isRunning: function() {   // Start Function: isRunning
        if (PlayTheGame.pauseBtn.innerHTML === "Pause"  && !PlayTheGame.pauseBtn.disabled)
            return true;
        else return false;
    }, // End Function: isRunning
    
}; // End Static Class: PlayTheGame