// JavaScript Document
// Author: Robert Willem Hallink

var GameScript = {   // Start Static Class: GameScript
    
    // Class Variables
    bricks: {                                                     // The list with the bricks
        "Array" : [],
        "Amount" : 0,
        "Rows" : 0,
        "Columns" : 0 },
    
    timeouts: {
        "refillBricks" : null,
        "next" : null,
        "timePlayed" : null },
    
    bricksDiv: null,                                                // The HTML section where all bricks should be added
    timersDiv: null,                                                // The HTML section where all timers should be added
    
    infoElem: {                                                     // The HTML elements presenting player statistics
        "preset" : null,
        "basic" : null,
        "more" : null,
        "points" : null,
        "skips" : null,
        "timePlayed" : null,
        "goodSets" : null,
        "badSets" : null,
        "button" : null, },  
    
    msgElem: null,                                                  // The HTML element for presenting a message to the user
    
    clickSnd: null,                                                 // The sound when pressing buttons
    couples: [],                                                    // The array to contain all the linked memory game bricks (two bricks with the same image)
    imageList: [],                                                  // The array to contain all used images for the bricks within a given game                    
    totalImages: 53,                                                // The amount of brick images there are in total to choose from
    firstTime: true,                                                // If the game is being ran for the first time since the page has loaded
    hasSkipped: false,                                              // If the player has skipped at least once
    stopSwapping: false,                                            // If swapping currently isn't allowed during animations and such
    
    clocks: {                                                       // Clock and clock limits
        "shortClock" : null,
        "longClock" : null,
        "startingTime" : 45,
        "bonusTime" : 10,
        "bigBonusTime" : 20,
        "totalTime" : 2 * 60 },                                     // Set the time limit to 2 minutes
    
    presets: [
        "Easier",
        "Harder",
        "Choices",
        "Static Time",
        "Audiovisual"],
    
    
    
    // Getters
    getSetting: function(id) { return document.getElementById(id).value; },
    getPreset: function() { return GameScript.presets[0]; },
    
    
    
    // Setters
    setSetting: function(id, val, add, isInt) {
        
        var oldValue = document.getElementById(id).value;
        var newValue = val;
        
        if (typeof isInt !== 'undefined')
            if (isInt)
                oldValue = parseInt(oldValue);
        
        if (typeof add !== 'undefined')
            if (add) {
                oldValue += newValue;
                newValue = oldValue;
            }
            
        document.getElementById(id).value = newValue;
        
    },
    
    
    
    // Class Functions
    
    // Functions to run when the webpage is loaded (all HTML-code is executed). Initialize global variables and relates functions to buttons
    init: function() {   // Start Function: init
        
        // Shuffle the presets and add the Default preset to always be the first one
        GameScript.presets = GameScript.shuffle(GameScript.presets);
        GameScript.presets.unshift("Default");
        
        // Intialize objects
        
        // Link to HTML elements
        GameScript.pageContent = document.getElementById("wrapper");
        GameScript.bricksDiv = document.getElementById("bricks");
        GameScript.msgElem = document.getElementById("message");
        GameScript.timersDiv = document.getElementById("timers");
        
        GameScript.infoElem.preset = document.getElementById("presetTitleInfo");
        GameScript.infoElem.basic = document.getElementById("basicInfo");
        GameScript.infoElem.more = document.getElementById("moreInfo");
        GameScript.infoElem.points = document.getElementById("pointsInfo");
        GameScript.infoElem.skips = document.getElementById("skipsInfo");
        GameScript.infoElem.timePlayed = document.getElementById("timePlayedInfo");
        GameScript.infoElem.goodSets = document.getElementById("goodSetsInfo");
        GameScript.infoElem.badSets = document.getElementById("badSetsInfo");
        GameScript.infoElem.button = document.getElementById("extendUserInfoBtn");
        Event.add(GameScript.infoElem.button, "click", GameScript.checkMoreInfo);           // Add an event to allow to extend the score statistics window (of course also allow it to make it smaller again)
        
        // Add a click sound for every button
        var buttons = document.getElementsByTagName("button");
        for (var i=0; i<buttons.length; i++)
            Event.add(buttons[i], "click", GameScript.clickButtonSound);
        
        // Initialize the clocks, game & audio manager
        GameScript.clocks.shortClock = GameScript.setClock("Time to Swap:");
        GameScript.clocks.longClock = GameScript.setClock("Total Time Left:", false);
        GameScript.clocks.shortClock.setMaxTime(45);
        PlayTheGame.init();
        AudioManager.init();
        
        // Disable right-click context window, because it will be used for the Skip function
        if (document.addEventListener)
            document.addEventListener('contextmenu', function(e) { e.preventDefault(); }, false);           // IE >= 9; other browsers
        else document.attachEvent('oncontextmenu', function() { window.event.returnValue = false; } );      // IE < 9
        
    }, // End Function: init
    
    
    
    // Add a timer application with a time
    setClock: function(description, activate) {   // Start Method: setClock
        
        // Create a new TimerApplication object instance, no need to keep track of it (it can delete itself from within)
        var timer = new TimerApplication(GameScript.timersDiv, description);
        if (typeof activate !== "undefined")
            if (activate)
                timer.deactivate();
        return timer;
        
    }, // End Method: setClock
    
    
    
    // Check if the info window must be extended
    checkMoreInfo: function() {   // Start Function: checkMoreInfo
        
        // If the score window is not extended then extend it, otherwise make it small again
        if (GameScript.infoElem.more.style.display === "block") {
            GameScript.infoElem.more.style.display = "none";
            GameScript.infoElem.button.innerHTML = "Show More";
        }
        else {
            GameScript.infoElem.more.style.display = "block";
            GameScript.infoElem.button.innerHTML = "Show Less";
        }
        
    }, // End Function: checkMoreInfo
    
    
    
    // Add new bricks (or reduce when selecting a lower value)
    addBricks: function() {   // Start Function: addBrickTiles
        
        var i, brick, count = 0, div;                                                   // Reset and initialize these local variables
        GameScript.couples = [];                                                        // Empty the list that links memory game bricks which are coupled (two bricks having the same image)
        GameScript.randomizeBrickImages(GameScript.bricks.Amount);
        
        for (i=0; i<GameScript.bricks.Amount/2; i++)                                    // Fill the couples list with half the amount of used bricks with the value 0
            GameScript.couples.push(0);
        while (GameScript.bricks.Array.length > 0) {                                    // Remove all existing bricks from both the code and HTML, if they exist at all
            brick = GameScript.bricks.Array.pop();
            brick.remove();
        } 
        while (GameScript.bricksDiv.firstChild)                                         // Empty the bricks section
            GameScript.bricksDiv.removeChild(GameScript.bricksDiv.firstChild);
        
        for (i=0; i<GameScript.bricks.Amount; i++) {                                    // Add the amount of requested bricks
            if (i % GameScript.bricks.Columns === 0) {
                    div = document.createElement("div");
                    div.className = "bricksRow";
                    GameScript.bricksDiv.appendChild(div);
            }
            GameScript.bricks.Array.push(new Brick(div));
            GameScript.setBrickSize(GameScript.bricks.Array.length-1);
        }
        
        while (count !== GameScript.bricks.Amount) {                                    // Continue this loop as long the count value has not reached the amount of requested bricks (aka, end when all bricks have been set with an image)
            rand = Math.floor((Math.random() * GameScript.bricks.Array.length));        // Choose a random value between 0 and the amount of available bricks
            brick = GameScript.bricks.Array[rand];                                      // Use the random value to pick a brick in the list with the bricks
            if (brick.getImage() === null) {                                            // If the brick has not been set with a image yet, set an image for it and increase the count value with one
                brick.setImage();
                count++;
            }
        }
        
    }, // End Function: addBrickTiles
    
    
    
    // Adjust the size of the bricks relative to the current difficulty level
    setBrickSize: function(i) {   // Start Function: setBrickSize
        
        switch (Statistics.getLevel()) {
            case 0:
                GameScript.bricks.Array[i].setImageWidth(7);
                GameScript.bricks.Array[i].setImageHeight(19);
                break;
            case 1:
                GameScript.bricks.Array[i].setImageWidth(7);
                GameScript.bricks.Array[i].setImageHeight(19);
                break;
            case 2:
                GameScript.bricks.Array[i].setImageWidth(7);
                GameScript.bricks.Array[i].setImageHeight(19);
                break;
            case 3:
                GameScript.bricks.Array[i].setImageWidth(7);
                GameScript.bricks.Array[i].setImageHeight(19);
                break;
            case 4:
                GameScript.bricks.Array[i].setImageWidth(5.75);
                GameScript.bricks.Array[i].setImageHeight(19);
                break;
            case 5:
                GameScript.bricks.Array[i].setImageWidth(5);
                GameScript.bricks.Array[i].setImageHeight(15);
                break;
            case 6:
                GameScript.bricks.Array[i].setImageWidth(4.5);
                GameScript.bricks.Array[i].setImageHeight(12.25);
                break;
            case 7:
                GameScript.bricks.Array[i].setImageWidth(4.5);
                GameScript.bricks.Array[i].setImageHeight(12.25);
                break;
        }
        
    }, // End Function: setBrickSize
    
    
    
    // Randomize the images used to assign to the memory game bricks
    randomizeBrickImages: function(selectedBricks) {   // Start Function: randomizeBricks
        
        GameScript.imageList = [];                                                              // Reset the array that holds all the brick image numbers that should be used
        var image;                                                                              // Declare the image to be put into the image list
        
        while (GameScript.imageList.length !== selectedBricks/2) {                              // Keep running this loop until the array is filled to half the amount of used memory game bricks on the page
            var rand = Math.floor(Math.random() * GameScript.totalImages);                      // Choose a random integer value between the first and last available image
            if (GameScript.imageList.map(function(e) { return e.index; }).indexOf(rand) < 0) {  // Check if the random value does not exist in the array, if so add it to the array
                image = { "index" : rand, "value" : (Math.ceil((rand+1) / 4)) };                  // Initialize the image to be put into the image list with the random value and a score matching the card index
                GameScript.imageList.push(image);                                               // Add the image into the image list
            }
        }
        
    }, // End Function: randomizeBricks
    
    
    
    // Force the game to end because the timer ran out
    stopGameByTimer: function() {   // Start Function: stopGameByTimer
        
        AudioManager.playSound(AudioManager.timeOverSnd);
        PlayTheGame.stop();
        
    }, // End Function: stopGameByTimer
    
    
    
    // Function to calculate a value as rounded, resetting it to 0 if below it
    calcPosRoundVal: function(a) {   // Start Function: calcPosRoundVal
        
        a = Math.floor(a);                                          // Round the provided value so it becomes a whole number
        if (a < 0)                                                  // If the number is negative, send back 0 as an answer
           return 0;
        return a;                                                   // Answer the call with the rounded value if not already send back as 0
        
    }, // End Function: calcPosRoundVal
    
    
    
    throwBricksAway: function() {   // Start Function: throwBricksAway
        
        if (!GameScript.checkForEmptyLine())
            return;
        
        GameScript.clocks.shortClock.addTime(GameScript.clocks.bigBonusTime);
        GameScript.stopSwapping = true;
        
        var points = 0, i;
        
        if (GameScript.getPreset() === "Choices") {
            points = GameScript.bricks.Amount * 3;
            GameScript.clocks.shortClock.addTime(GameScript.clocks.bigBonusTime);
        }
        else {
            for (i=0; i<GameScript.bricks.Array.length; i++)
                if (GameScript.bricks.Array[i].isComplete())
                    points += 3;
        }
        
        Statistics.setPoints(points, true);
        GameScript.infoElem.points.innerHTML = Statistics.getPoints();
        
        if (GameScript.getPreset() === "Audiovisual")
            GameScript.refillBricks();
        else {
            AudioManager.playSound(AudioManager.completeRowSnd);
            GameScript.timeouts.refillBricks = setTimeout(GameScript.refillBricks, 2000);
            for (i=0; i<GameScript.bricks.Array.length; i++)
                if (!GameScript.bricks.Array[i].isComplete() || GameScript.bricks.Array[i].isSkipped())
                    GameScript.bricks.Array[i].fall();
        }
        
    }, // End Function: throwBricksAway
    
    
    
    refillBricks: function() {   // Start Function: refillBricks
        
        Statistics.setFieldClears(true);
        AudioManager.playSound(AudioManager.refillSnd);
        GameScript.increaseLevel();
        GameScript.addBricks();
        GameScript.swap = new Array(null, null);
        GameScript.swappedBricks = 0;
        GameScript.hasSkipped = false;
        GameScript.stopSwapping = false;
        
        if (GameScript.getPreset() !== "Harder")
            Statistics.setMaxSkips(true);
        
        if (GameScript.getPreset() === "Choices")
            GameScript.infoElem.skips.innerHTML = "0/1";
        else GameScript.infoElem.skips.innerHTML = Statistics.getUsedSkips() + "/" + Statistics.getMaxSkips();
        
        PlayTheGame.startViewingCards();
        
    }, // End Function: refillBricks
    
    
    
    checkForEmptyLine: function() {   // Start Function: checkForEmptyRow
        
        var currentRow = 0, currentColumn = 0, currentBrick = 0, currentCount = 0;
        
        // Choices Preset
        if (GameScript.getPreset() === "Choices") {
            for (var i=0; i<GameScript.bricks.Amount; i++)
                if (GameScript.bricks.Array[i].isComplete())
                    currentCount++;
            if (currentCount >= GameScript.bricks.Rows * 1.5)
                return true;
            return false;
        }
        
        // Empty Row
        for (currentRow=0; currentRow<GameScript.bricks.Rows; currentRow++) {
            currentCount = 0;
            for (currentColumn=0; currentColumn<GameScript.bricks.Columns; currentColumn++) {
                if (GameScript.bricks.Array[currentBrick].isComplete())
                    currentCount++;
                if (currentCount === GameScript.bricks.Columns)
                    return true;
                currentBrick++;
            }
        }
        
        // Empty Column
        for (currentColumn=0; currentColumn<GameScript.bricks.Columns; currentColumn++) {
            currentCount = 0;
            for (currentRow=0; currentRow<GameScript.bricks.Rows; currentRow++) {
                currentBrick = currentColumn + (currentRow * GameScript.bricks.Columns);
                if (GameScript.bricks.Array[currentBrick].isComplete())
                    currentCount++;
                if (currentCount === GameScript.bricks.Rows)
                    return true;
            }
        }
        
        return false;
        
    }, // Start Function: checkForEmptyRow
    
    
    
    increaseLevel: function() {   // Start Function: increaseLevel
        
        // Return when it's too soon to advance to the next difficulty level
        if (Statistics.getFieldClears() % 2 !== 0 && GameScript.getPreset() === "Easier")
            return;
        if (Statistics.getFieldClears() % 2 !== 1 && GameScript.getPreset() !== "Easier" && GameScript.getPreset() !== "Harder")
            return;
        
        // Increase the difficulty level with one and prevent it from getting too high when needed
        Statistics.setLevel(true);
        if (GameScript.getPreset() === "Easier" && Statistics.getLevel() === 6)
            Statistics.setLevel(5);
        if (GameScript.getPreset() !== "Harder" && Statistics.getLevel() === 7)
            Statistics.setLevel(6);
        
        GameScript.setSetting("level", Statistics.getLevel(), false, true);
        GameScript.setupLevel();
        
    }, // End Function: increaseLevel
    
    
    
    setupLevel: function() {   // Start Function: setupLevel
        
        // Go through each possible difficulty level setting and change the value for the amount of bricks to use and the time limit to reflect that difficulty level setting
        switch (Statistics.getLevel()) {
            case 0:
                GameScript.bricks.Amount = 8;
                GameScript.bricks.Rows = 4;
                GameScript.bricks.Columns = 2;
                GameScript.clocks.bonusTime = 5;
                GameScript.clocks.bigBonusTime = 10;
                GameScript.bricksDiv.style.width = "30%";
                break;
            case 1:
                GameScript.bricks.Amount = 12;
                GameScript.bricks.Rows = 4;
                GameScript.bricks.Columns = 3;
                GameScript.clocks.bonusTime = 5;
                GameScript.clocks.bigBonusTime = 10;
                GameScript.bricksDiv.style.width = "30%";
                break;
            case 2:
                GameScript.bricks.Amount = 16;
                GameScript.bricks.Rows = 4;
                GameScript.bricks.Columns = 4;
                GameScript.clocks.bonusTime = 5;
                GameScript.clocks.bigBonusTime = 10;
                GameScript.bricksDiv.style.width = "40%";
                break;
            case 3:
                GameScript.bricks.Amount = 20;
                GameScript.bricks.Rows = 4;
                GameScript.bricks.Columns = 5;
                GameScript.clocks.bonusTime = 5;
                GameScript.clocks.bigBonusTime = 10;
                GameScript.bricksDiv.style.width = "40%";
                break;
            case 4:
                GameScript.bricks.Amount = 24;
                GameScript.bricks.Rows = 4;
                GameScript.bricks.Columns = 6;
                GameScript.clocks.bonusTime = 5;
                GameScript.clocks.bigBonusTime = 10;
                GameScript.bricksDiv.style.width = "50%";
                break;
            case 5:
                GameScript.bricks.Amount = 30;
                GameScript.bricks.Rows = 5;
                GameScript.bricks.Columns = 6;
                GameScript.clocks.bonusTime = 5;
                GameScript.clocks.bigBonusTime = 10;
                GameScript.bricksDiv.style.width = "50%";
                break;
            case 6:
                GameScript.bricks.Amount = 36;
                GameScript.bricks.Rows = GameScript.bricks.Columns = 6;
                GameScript.clocks.bonusTime = 5;
                GameScript.clocks.bigBonusTime = 10;
                GameScript.bricksDiv.style.width = "50%";
                break;
            case 7:
                GameScript.bricks.Amount = 42;
                GameScript.bricks.Rows = 6;
                GameScript.bricks.Columns = 7;
                GameScript.clocks.bonusTime = 5;
                GameScript.clocks.bigBonusTime = 10;
                GameScript.bricksDiv.style.width = "50%";
                break;
        }
        
        if (GameScript.getPreset() === "Easier") {
            GameScript.clocks.bonusTime += 1;
            GameScript.clocks.bigBonusTime += 2;
            GameScript.clocks.startingTime = 40;
            GameScript.clocks.shortClock.setMaxTime(50);
        }
        else if (GameScript.getPreset() === "Harder") {
            GameScript.clocks.bonusTime -= 1;
            GameScript.clocks.bigBonusTime -= 2;
            GameScript.clocks.startingTime = 30;
            GameScript.clocks.shortClock.setMaxTime(40);
        }
        else {
            GameScript.clocks.startingTime = 35;
            GameScript.clocks.shortClock.setMaxTime(45);
        }
        
        GameScript.setSetting("bonusTime", GameScript.clocks.bonusTime + " seconds");
        GameScript.setSetting("amountOfMemoryCards", GameScript.bricks.Amount);
        
    }, // End Function: setupLevel
    
    
    
    setMessage: function(str) {   // Start Function: setMessage
        
        GameScript.msgElem.innerHTML = str;
        
        if (str === "")
            GameScript.msgElem.style.display = "none";
        else GameScript.msgElem.style.display = "block";
        
    }, // End Function: setMessage
    
    
    
    countTimePlayed: function() {   // Start Function: countTimePlayed
        
        if (GameScript.infoElem.timePlayed.innerHTML === "99:59")
            return;
        
        Statistics.time++;
        var str = "", minutes = Math.floor(Statistics.time / 60), seconds = Statistics.time % 60;
        
        if (minutes < 10)
            str += "0";
        str += minutes + ":";
        if (seconds < 10)
            str += "0";
        str += seconds;
        GameScript.infoElem.timePlayed.innerHTML = str;
        
    }, // End Function: countTimePlayed
    
    
    
    shuffle: function(array) {   // Start Function: shuffle
        var i, j, x;
        for (i = array.length-1; i>0; i--) {
            j = Math.floor(Math.random() * (i+1));
            x = array[i];
            array[i] = array[j];
            array[j] = x;
        }
        return array;
    }, /// End Function: shuffle
    
    
    
    clickButtonSound: function()                                    { AudioManager.playSound(AudioManager.clickSnd); },    // Function: clickButtonSound   (Play a button clicking sound)
    
}; // End Static Class: GameScript



Event.add(window, "load", GameScript.init);							// Active function init when the page is loaded