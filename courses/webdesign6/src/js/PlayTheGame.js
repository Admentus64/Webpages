// JavaScript Document
// Author: Robert Willem Hallink

var PlayTheGame = {   // Start Static Class: PlayTheGame
    
    // Class Variables
    nextBtn: null,                                                  // The Next button to proceed when two cards have been swapped
    startBtn: null,                                                 // The Start / Stop button to start a new game or to stop a started game
    restartBtn: null,                                               // The Restart button for starting a new game without needing press the Stop button to stop it first
    pauseBtn: null,                                                 // The Pause button to pause the game when a timer is being used
    
    
    
    // Class Functions
    
    // Functions to run when the webpage is loaded (all HTML-code is executed). Initialize global variables and relates functions to buttons
    init: function() {   // Start Function: init
        
        // Link to HTML elements
        PlayTheGame.nextBtn = document.getElementById("nextBtn");
        PlayTheGame.startBtn = document.getElementById("startBtn");
        PlayTheGame.restartBtn = document.getElementById("restartBtn");
        PlayTheGame.pauseBtn = document.getElementById("pauseBtn");
        
        // Disable the Next, Restart and Pause button by default (since loading the memory game page does not start the actual game yet)
        PlayTheGame.nextBtn.disabled = PlayTheGame.restartBtn.disabled = PlayTheGame.pauseBtn.disabled = true;
        
        // Add events for the available buttons
        Event.add(PlayTheGame.nextBtn, "click", PlayTheGame.next);
        Event.add(PlayTheGame.startBtn, "click", PlayTheGame.start);
        Event.add(PlayTheGame.restartBtn, "click", PlayTheGame.restart);
        
        // Remove the Pause button is there is no time limit, otherwise also add an event for that button
        if (GameScript.timerApp === null)
            $(PlayTheGame.pauseBtn).remove();
        else Event.add(PlayTheGame.pauseBtn, "click", PlayTheGame.pause);
        
        
    }, // End Function: init
    
    
    
    // When pressing the "Start" button the game should start, thus run the setup
    start: function() {   // Start Function: startGame
        
        // If the game is started for the first time since loading the page then there is no need to reset the bricks, otherwise reset the bricks
        if (!GameScript.firstTime)
            GameScript.addBricks(GameScript.currentSettings[0].value);
        else GameScript.firstTime = false;
        
        // Resetting global variables with each new game
        GameScript.swap = new Array(null, null);
        GameScript.swapsCount = GameScript.swappedBricks = 0;       // Set these values to 0
        
        // Disable all buttons for now
        PlayTheGame.nextBtn.disabled = true;
        PlayTheGame.restartBtn.disabled = PlayTheGame.pauseBtn.disabled = false;
        PlayTheGame.pauseBtn.innerHTML = "Pause";
        Event.remove(PlayTheGame.startBtn, "click", PlayTheGame.start);
        Event.add(PlayTheGame.startBtn, "click", PlayTheGame.stop);
        PlayTheGame.startBtn.innerHTML = "Stop";
        
        // If the timer is used and there is a time limit, then set the countdown and start the timer
        if (GameScript.timerApp !== null && GameScript.time !== 0) {
            GameScript.timerApp.setCountdown(GameScript.time);
            GameScript.timerApp.start();
        }
        
        // Reset score and amount of swaps messages
        GameScript.msgElem.value =  0;                              // Remove the score message for now
        GameScript.turnNrElem.value = 0;                            // Each game starts at 0 used swaps
        
        // Prepare and reset the bricks
        for (var i=0; i<GameScript.bricks.length; i++)
            GameScript.bricks[i].reset();
        
    }, // End startGame
    
    
    
    // Function to stop the game when pressing the button for it
    stop: function() {   // Start Function: stopGame
        
        if (GameScript.timerApp !== null)                           // If there is a timer then stop the timer from counting down
            GameScript.timerApp.stop();
        
        // Disable the Next, Restart and Pause buttons, prevent the Start button from ending a game and allow it to start a new game again
        PlayTheGame.nextBtn.disabled = PlayTheGame.restartBtn.disabled = PlayTheGame.pauseBtn.disabled = true;
        Event.remove(PlayTheGame.startBtn, "click", PlayTheGame.stop);
        Event.add(PlayTheGame.startBtn, "click", PlayTheGame.start);
        PlayTheGame.startBtn.innerHTML = "Start";
        PlayTheGame.pauseBtn.innerHTML = "Pause";
        
    }, // End Function: stopGame
    
    
    
    // Function to pause the game when pressing the button for it
    pause: function() {   // Start Function: pauseGame
        
        if (GameScript.timerApp === null)                           // Stop this function if there is no timer in use
            return;
        
        if (GameScript.timerApp.isActive()) {                       // If the timer is counting down then pause it, otherwise continue the timer to count down again
            GameScript.timerApp.stop();
            PlayTheGame.pauseBtn.innerHTML = "Resume";
        }
        else {
            GameScript.timerApp.start();
            PlayTheGame.pauseBtn.innerHTML = "Pause";
        }
        
    }, // End Function: pauseGame
    
    
    
    // Function to restart the game when pressing the button for it
    restart: function() {   // Start Function: restartGame
        
        PlayTheGame.stop();                                         // Stop the game first
        PlayTheGame.start();                                        // Then start it again
        
    }, // End Function: restartGame
    
    
    
    // Check the values of both swapped bricks on the screen when pressing the "Next" button
    next: function() {   // Start Function: checkSwaps
        
        var i;
        
        // If both swapped bricks have the same image then empty both bricks from the field, otherwise just swap them on their back again
        if (GameScript.swap[0] === GameScript.swap[1]) {
          for (i=0; i<GameScript.bricks.length; i++)                // Go through each brick in the list of bricks and check if the current brick is swapped
              if (GameScript.bricks[i].isSwapped())
                  GameScript.bricks[i].empty();
        }
        else {
           for (i=0; i<GameScript.bricks.length; i++)               // Go through each brick in the list of bricks and check if the current brick is swapped
              if (GameScript.bricks[i].isSwapped())
                  GameScript.bricks[i].back();
          GameScript.swappedBricks -= 2;
        }
        
        GameScript.swap[0] = GameScript.swap[1] = null;             // Reset the swapped bricks being kept track of
        PlayTheGame.nextBtn.disabled = true;                        // Disable the Next button
        
    }, // End Function: checkSwaps

}; // End Static Class: PlayTheGame