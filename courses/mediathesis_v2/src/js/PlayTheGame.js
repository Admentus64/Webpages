// JavaScript Document
// Author: Robert Willem Hallink

var PlayTheGame = {   // Start Static Class: PlayTheGame
    
    // Class Variables
    nextPresetBtn: null,
    pauseBtn: null,                                                 // The Pause button to pause the game when a timer is being used
    quitBtn: null,
    startBtn: null,
    rateBtn: null,
    
    instructionsDiv: null,
    instructionsText: null,
    finishedDiv: null,
    rateDiv: null,
    
    radioboxes: null,
    stars: null,
    
    background: null,
    
    firstCookieRound: true,
    
    
    
    // Class Functions
    
    // Functions to run when the webpage is loaded (all HTML-code is executed). Initialize global variables and relates functions to buttons
    init: function() {   // Start Function: init
        
        if (Cookie.check("started", "1"))
            location.href = "index.html";
        Cookie.set("started", "1");
        
        // Link to HTML elements
        PlayTheGame.nextPresetBtn = document.getElementById("nextPresetBtn");
        PlayTheGame.pauseBtn = document.getElementById("pauseBtn");
        PlayTheGame.quitBtn = document.getElementById("quitBtn");
        PlayTheGame.startBtn = document.getElementById("startBtn");
        PlayTheGame.rateBtn = document.getElementById("rateBtn");
        
        PlayTheGame.instructionsDiv = document.getElementById("instructions");
        PlayTheGame.instructionsText = document.getElementById("instructionsText");
        PlayTheGame.finishedDiv = document.getElementById("finished");
        PlayTheGame.rateDiv = document.getElementById("rate");
        
        PlayTheGame.radioboxes = document.getElementById("radioboxes").getElementsByTagName("input");
        PlayTheGame.stars = document.getElementById("stars").getElementsByTagName("input");
        
        PlayTheGame.background = document.getElementById("background").getElementsByTagName("img");
        
        PlayTheGame.animateBackgroundObject(PlayTheGame.background[0], true, 100, 0.8, 50);
        PlayTheGame.animateBackgroundObject(PlayTheGame.background[1], false, 125, 1.5, 150);
        PlayTheGame.animateBackgroundObject(PlayTheGame.background[2], true, 135, 1.5, 60);
        
        // Disable the Next, Restart and Pause button by default (since loading the memory game page does not start the actual game yet)
        PlayTheGame.pauseBtn.disabled = true;
        
        // Add events for the available buttons
        Event.add(PlayTheGame.nextPresetBtn, "click", PlayTheGame.nextPreset);
        Event.add(PlayTheGame.quitBtn, "click", function() { location.href = "index.html"; } );
        Event.add(PlayTheGame.startBtn, "click", PlayTheGame.start);
        Event.add(PlayTheGame.pauseBtn, "click", PlayTheGame.pause);
        Event.add(PlayTheGame.rateBtn, "click", PlayTheGame.rate);
        
        var i;
        for (i=0; i<PlayTheGame.radioboxes.length; i++)
            Event.add(PlayTheGame.radioboxes[i], "click", PlayTheGame.setRadioboxes);
        for (i=0; i<PlayTheGame.stars.length; i++)
            Event.add(PlayTheGame.stars[i], "click", PlayTheGame.setStars);
        
        if (Cookie.check("concluded", "1")) {
            Cookie.erase("resume");
            Cookie.erase("concluded");
            Cookie.erase("rounds");
            Cookie.erase("presets");
            Cookie.erase("preset");
            Cookie.erase("rating");
            Cookie.erase("points");
            Cookie.erase("highestFace");
            Cookie.erase("usedSkips");
            Cookie.erase("maxSkips");
            Cookie.erase("goodSets");
            Cookie.erase("badSets");
            Cookie.erase("fieldClears");
            Cookie.erase("level");
            Cookie.erase("pauses");
            Cookie.erase("shortClock");
            Cookie.erase("longClock");
            Cookie.erase("timePlayed");
        }
        
        if (Cookie.check("resume", "1")) {
            Statistics.rounds = Cookie.get("rounds", false, true);
            GameScript.presets = Cookie.get("presets", true, false);
            Statistics.preset = Cookie.get("preset", true, false);
            Statistics.rating = Cookie.get("rating", true, false);
            Statistics.points = Cookie.get("points", true, true);
            Statistics.highestFace = Cookie.get("highestFace", true, true);
            Statistics.usedSkips = Cookie.get("usedSkips", true, true);
            Statistics.maxSkips = Cookie.get("maxSkips", true, true);
            Statistics.goodSets = Cookie.get("goodSets", true, true);
            Statistics.badSets = Cookie.get("badSets", true, true);
            Statistics.fieldClears = Cookie.get("fieldClears", true, false);
            Statistics.level = Cookie.get("level", true, false);
            Statistics.pauses = Cookie.get("pauses", true, true);
            Statistics.shortClock = Cookie.get("shortClock", true, false);
            Statistics.longClock = Cookie.get("longClock", true, false);
            Statistics.timePlayed = Cookie.get("timePlayed", true, false);
        }
        
        PlayTheGame.nextPreset();
        
    }, // End Function: init
    
    
    
    // When pressing the "Next Preset" button, proceed to run the next preset
    nextPreset: function() {   // Start Function: nextPreset
        
        Statistics.startNewRound();
        
        GameScript.setSetting("preset", GameScript.getPreset());
        GameScript.infoElem.preset.innerHTML = GameScript.getPreset();
        PlayTheGame.instructionsDiv.style.display = "Block";
        PlayTheGame.nextPresetBtn.disabled = true;
        
        document.getElementById("instructions").getElementsByClassName("presetTitle")[0].innerHTML = "Preset: " + GameScript.getPreset();
        GameScript.infoElem.skips.innerHTML = "0/1";
        
        PlayTheGame.descriptions();
        PlayTheGame.audiovisualEffects();
        
        // Set starting difficulty level
        if (GameScript.getPreset() === "Easier")
            Statistics.setLevel(1);
        else if (GameScript.getPreset() === "Harder")
            Statistics.setLevel(3);
        else Statistics.setLevel(2);
        //Statistics.setLevel(4);                                   // Debug Only
        GameScript.setSetting("level", Statistics.getLevel(), false, true);
        
        GameScript.setupLevel();
        GameScript.addBricks();
        GameScript.hasSkipped = false;
        
        GameScript.setSetting("progress", 7-GameScript.presets.length + "/6");
        
    }, // End Function: nextPreset
    
    
    
    // Descriptions for each new preset
    descriptions: function() {   // Start Function: descriptions
        
        // Preset descriptions
        if (GameScript.getPreset() === "Default") {
            PlayTheGame.instructionsText.innerHTML = `This preset round will be played without any changes.
            <br><br><b>Reminder</b>
            <br>Cards can be skipped using the Right-Mouse Button.`;
            document.getElementById("instructions").getElementsByTagName("img")[0].style.display = "Block";
        }
        else document.getElementById("instructions").getElementsByTagName("img")[0].style.display = "None";
        
        if (GameScript.getPreset() === "Easier") {
            PlayTheGame.instructionsText.innerHTML = `This preset round is easier.
            <ul>
                <li>Start with 40 seconds
                <li>Can store up to 50 seconds
                <li>Start with one 1 extra skip
                <li>Difficulty level starts and stays lower
                <li>The difficulty increases each two clears
                <li>7 seconds to prepare yourself
                <li>Receive 1 extra second when clearing cards
            </ul>`;
            GameScript.infoElem.skips.innerHTML = "0/2";
        }
        
        if (GameScript.getPreset() === "Harder") {
            PlayTheGame.instructionsText.innerHTML = `This preset round is harder.
            <ul>
                <li>Start with 30 seconds
                <li>Can store up to 40 seconds
                <li>Have a maximum of 3 skips total
                <li>Difficulty level starts and ends higher
                <li>The difficulty increases with each clear
                <li>3 seconds to prepare yourself
                <li>Receive 1 fewer second when clearing cards
            </ul>`;
            GameScript.infoElem.skips.innerHTML = "0/3";
        }
        
        if (GameScript.getPreset() === "Choices")
            PlayTheGame.instructionsText.innerHTML = `This preset round changes your choices.
            <ul>
                <li>All cards give the same amount of points
                <li>Clear cards in any order to proceed
                <li>Have only 1 skip with each new field of cards
            </ul>`;
        
        if (GameScript.getPreset() === "Static Time")
            PlayTheGame.instructionsText.innerHTML = "The timer that runs on a short notice has been removed and you can not earn any additional time this preset round.";
        
        if (GameScript.getPreset() === "Audiovisual")
            PlayTheGame.instructionsText.innerHTML = "This preset round has no sound, music or animation. The background has been removed and the cards have been simplified.";
        
    }, // End Function: descriptions
    
    
    
    // Remove and restore audiovisual effects
    audiovisualEffects: function() {   // Start Function: audiovisualEffects
        
        if (GameScript.getPreset() === "Audiovisual") {
            AudioManager.disable();
            document.getElementsByTagName("Main")[0].className = "no-animation";
            document.getElementById("background").style.display = "None";
            
            PlayTheGame.nextPresetBtn = document.getElementById("nextPresetBtn");
            PlayTheGame.pauseBtn.style.border = PlayTheGame.quitBtn.style.border = PlayTheGame.nextPresetBtn.style.border = PlayTheGame.startBtn.style.border = "0";
            PlayTheGame.pauseBtn.style.borderRadius = PlayTheGame.quitBtn.style.borderRadius = PlayTheGame.nextPresetBtn.style.borderRadius = PlayTheGame.startBtn.style.borderRadius = "0";
            PlayTheGame.pauseBtn.style.backgroundColor = PlayTheGame.quitBtn.style.backgroundColor = PlayTheGame.nextPresetBtn.style.backgroundColor = PlayTheGame.startBtn.style.backgroundColor = "#FFFFFF";
        }
        else {
            AudioManager.enable();
            document.getElementsByTagName("Main")[0].className = "animation";
            document.getElementById("background").removeAttribute("style");
            
            PlayTheGame.pauseBtn.removeAttribute("style");
            PlayTheGame.quitBtn.removeAttribute("style");
            PlayTheGame.nextPresetBtn.removeAttribute("style");
            PlayTheGame.startBtn.removeAttribute("style");
        }
        
    }, // End Function: audiovisualEffects
    
    
    
    // When pressing the "Start" button the game should start, thus run the setup
    start: function() {   // Start Function: startGame
        
        PlayTheGame.instructionsDiv.style.display = "None";
        
        // Resetting global variables with each new game
        GameScript.swap = new Array(null, null);
        GameScript.swappedBricks = 0;                               // Set value to 0
        GameScript.prepareNextRound = false;
        
        // Disable all buttons for now
        PlayTheGame.pauseBtn.disabled = false;
        PlayTheGame.pauseBtn.innerHTML = "Pause";
        PlayTheGame.nextPresetBtn.disabled = true;
        
        GameScript.infoElem.points.innerHTML = Statistics.getPoints();
        GameScript.infoElem.goodSets.innerHTML = Statistics.getGoodSets();
        GameScript.infoElem.badSets.innerHTML = Statistics.getBadSets();
        
        if (GameScript.getPreset() === "Easier")
            Statistics.setMaxSkips(2);
        else if (GameScript.getPreset() === "Harder")
            Statistics.setMaxSkips(3);
        else Statistics.setMaxSkips(1);
        
        GameScript.timeouts.timePlayed = setInterval(GameScript.countTimePlayed, 1000);
        
        GameScript.infoElem.timePlayed.innerHTML = "00:00";
        GameScript.setMessage("");
        
        // Start the appropriate timer
        if (GameScript.getPreset() === "Static Time")
            GameScript.clocks.shortClock.deactivate();
        else {
            GameScript.clocks.shortClock.activate();
            GameScript.clocks.shortClock.setCountdown(GameScript.clocks.startingTime);
        }
        
        GameScript.clocks.longClock.setCountdown(GameScript.clocks.totalTime);
        //GameScript.clocks.longClock.setCountdown(1);
        GameScript.clocks.shortClock.start();
        GameScript.clocks.longClock.start();
        PlayTheGame.startViewingCards();
        
    }, // End startGame
    
    
    
    // Function to stop the game
    stop: function() {   // Start Function: stop
        
        Statistics.endRound();
        if (!PlayTheGame.isRunning())
            GameScript.setMessage("");
        
        GameScript.clocks.shortClock.stop();                                            // Stop the timers
        GameScript.clocks.longClock.stop();
        
        // Disable the Next, Restart and Pause buttons, prevent the Start button from ending a game and allow it to start a new game again
        PlayTheGame.pauseBtn.disabled = true;
        PlayTheGame.pauseBtn.innerHTML = "Pause";
        
        document.getElementById("rate").getElementsByClassName("presetTitle")[0].innerHTML = "Preset: " + GameScript.getPreset();
        document.getElementById("earnedPoints").innerHTML = "You earned: " + Statistics.getPoints() + " points!";
        PlayTheGame.rateDiv.style.display = "Block";
        rateBtn.disabled = true;
        
        clearTimeout(GameScript.timeouts.next);
        clearTimeout(GameScript.timeouts.refrillBricks);
        clearInterval(GameScript.timeouts.timePlayed);
        
        PlayTheGame.firstCookieRound = false;
        
        for (var i=0; i<PlayTheGame.radioboxes.length; i++)
            if (i % 3 === 1) {
                PlayTheGame.radioboxes[i].checked = true;
                Cookie.set("survey-" + GameScript.getPreset() + "-" + PlayTheGame.radioboxes[i].name, PlayTheGame.radioboxes[i].value, 10);
            }
        
    }, // End Function: stop
    
    
    
    rate: function() {   // Start Function: rate
        
        PlayTheGame.rateDiv.style.display = "None";
        
        GameScript.presets.shift();
        
        // Save settings from the last preset
        Cookie.set("rounds", Statistics.rounds, 10);
        Cookie.set("presets", GameScript.presets, 10);
        Cookie.set("preset", Statistics.preset, 10);
        Cookie.set("rating", Statistics.rating, 10);
        Cookie.set("points", Statistics.points, 10);
        Cookie.set("highestFace", Statistics.highestFace, 10);
        Cookie.set("usedSkips", Statistics.usedSkips, 10);
        Cookie.set("maxSkips", Statistics.maxSkips, 10);
        Cookie.set("goodSets", Statistics.goodSets, 10);
        Cookie.set("badSets", Statistics.badSets, 10);
        Cookie.set("fieldClears", Statistics.fieldClears, 10);
        Cookie.set("level", Statistics.level, 10);
        Cookie.set("pauses", Statistics.pauses, 10);
        Cookie.set("shortClock", Statistics.shortClock, 10);
        Cookie.set("longClock", Statistics.longClock, 10);
        Cookie.set("timePlayed", Statistics.timePlayed, 10);
        
        if (GameScript.presets.length !==  0) {
            PlayTheGame.nextPresetBtn.disabled = false;
            Cookie.set("resume", "1", 10);
        }
        else Statistics.endExperiment();
        
        Statistics.time = 0;
        
        for (var i=0; i<PlayTheGame.stars.length; i++)
            PlayTheGame.stars[i].checked = false;
        
    }, // End Function: rate
    
    
    
    setStars: function() {   // Start Function: setStars
        
        Statistics.setRating(this.getAttribute("value"));
        rateBtn.disabled = false;
        
    }, // End Function: setStars
    
    
    
    setRadioboxes: function() {   // Start Function: setRadioboxes
        
        if (this.checked)
            Cookie.set("survey-" + GameScript.getPreset() + "-" + this.name, this.value, 10);
        
    }, // End Function: setRadioboxes
    
    
    
    // Function to pause the game when pressing the button for it
    pause: function() {   // Start Function: pauseGame
        
        if (PlayTheGame.isRunning()) {                              // Pause the game if it is running and pause the timer as well
            PlayTheGame.pauseBtn.innerHTML = "Resume";
            GameScript.setMessage("The game is paused!");
            GameScript.clocks.shortClock.stop();
            GameScript.clocks.longClock.stop();
            AudioManager.stopMusic();
            clearInterval(GameScript.timeouts.timePlayed);
            Statistics.setPauses(true);
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
            
            if (points > Statistics.getHighestFace())
                Statistics.setHighestFace(points);
            
            if (points <= 10)
                AudioManager.playSound(AudioManager.goodSetSnd);
            else if (points <= 13)
                AudioManager.playSound(AudioManager.goodSetHighValueSnd);
            else AudioManager.playSound(AudioManager.goodSetJokerSnd);
            
            GameScript.infoElem.goodSets.innerHTML = Statistics.setGoodSets(true);
            GameScript.infoElem.points.innerHTML = Statistics.getPoints();
        }
        else {
            for (i=0; i<GameScript.bricks.Array.length; i++)               // Go through each brick in the list of bricks and check if the current brick is swapped
            if (GameScript.bricks.Array[i].isSwapped()) {
                GameScript.bricks.Array[i].back();
                if (GameScript.bricks.Array[i].getValue() > points)
                    points = GameScript.bricks.Array[i].getValue();
                if (GameScript.getPreset() !== "Audiovisual")
                    GameScript.bricks.Array[i].flash();
            }
            GameScript.swappedBricks -= 2;
            
            if (points <= 10 && Math.floor(Math.random() * 2) === 0)
                AudioManager.playSound(AudioManager.badSet1Snd);
            else if (points <= 10)
                AudioManager.playSound(AudioManager.badSet2Snd);
            else if (points <= 13)
                AudioManager.playSound(AudioManager.badSetHighValueSnd);
            else AudioManager.playSound(AudioManager.badSetJokerSnd);
          
            GameScript.infoElem.badSets.innerHTML = Statistics.setBadSets(true);
        }
        
        GameScript.swap[0] = GameScript.swap[1] = null;             // Reset the swapped bricks being kept track of
        
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
    
    
    
    animateBackgroundObject: function(elem, facingLeft, pause, speed, maxDistance) {   // Start Function: animateBackgroundObject
        
        var animObj = new AnimatedObject(elem);
        animObj.moveLeft(facingLeft, pause, speed, maxDistance);
        
    }, // End Function: animateBackgroundObject
    
}; // End Static Class: PlayTheGame