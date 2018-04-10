// JavaScript Document
// Author: Robert Willem Hallink

var GameScript = {   // Start Static Class: GameScript
    
    // Class Variables
    bricks: null,                                                   // The list with the bricks                                          
    swapsCount: 0,                                                  // The amount of swaps being kept track of
    totalPoints: 0,                                                 // The amount of total points
    gamesCount: 0,                                                  // The amount of games played
                                          
    bricksDiv: null,                                                // The HTML section where all bricks should be added
    currentSettings: null,                                          // The HTML section where the difficulty settings are shown
    extendUserInfoBtn: null,                                        // The button to display more of the score statistics
    
    totalPointsInfoElem: null,                                      // The HTML element for presenting the total points
    gamesCountInfoElem: null,                                       // The HTML element for presenting the amount of games being played
    averagePointsInfoElem: null,                                    // The HTML element for presenting the average amount of points
    userInfoElem: null,                                             // The HTML section where the score statistics are shown
    userMoreInfoElem: null,                                         // The HTML section where the additional score statistics are shown and hidden
    turnNrElem: null,                                               // The HTML element that shows the amount of swaps being taken
    msgElem: null,                                                  // The HTML element for presenting a message to the user
    
    clickSnd: null,                                                 // The sound when pressing buttons
    drag: null,                                                     // The object to link with each application so that dragging the window of an application works
    couples: null,                                                  // The array to contain all the linked memory game bricks (two bricks with the same image)
    brickImages: null,                                              // The array to contain all used images for the bricks within a given game
    totalBrickImages: 0,                                            // The amount of brick images there are in total to choose from
    time: 0,                                                        // The time limit
    timerApp: null,                                                 // The timer
    firstTime: true,                                                // If the game is being ran for the first time since the page has loaded
    
    
    
    // Class Functions
    
    // Functions to run when the webpage is loaded (all HTML-code is executed). Initialize global variables and relates functions to buttons
    init: function() {   // Start Function: init
        
        // Local variables
        var i;
        
        // Intialize objects
        GameScript.clickSnd = new Audio("src/wav/add.wav");                                   // Set an audio sound for clickSnd
        GameScript.drag = new DragnDrop();                                                    // Initialize a new DragNDrop object instance for drag
        
        // Link to HTML elements
        GameScript.pageContent = document.getElementById("wrapper");
        GameScript.extendUserInfoBtn = document.getElementById("extendUserInfoBtn");
        GameScript.bricksDiv = document.getElementById("bricks");
        GameScript.currentSettings = document.getElementById("currentSettings").getElementsByTagName("input");
        GameScript.turnNrElem = document.getElementById("turnNr");
        GameScript.msgElem = document.getElementById("message");
        GameScript.totalPointsInfoElem = document.getElementById("totalPointsInfo");
        GameScript.gamesCountInfoElem = document.getElementById("gamesCountInfo");
        GameScript.averagePointsInfoElem = document.getElementById("averagePointsInfo");
        GameScript.userInfoElem = document.getElementById("userInfo");
        GameScript.userMoreInfoElem = document.getElementById("userMoreInfo");
        
        // Add an event to allow to extend the score statistics window (of course also allow it to make it smaller again)
        Event.add(GameScript.extendUserInfoBtn, "click", GameScript.checkMoreInfo);
        
        for (i=0; i<GameScript.currentSettings.length; i++)
            GameScript.currentSettings[i].innerHTML += GameScript.currentSettings[i].value;
        
        // Initialize the game
        //GameScript.totalBrickImages = GameScript.countFiles("src/img/brick/");    // Use a function that get the amount of totalBrick images to avoid hardcoding
        //alert(GameScript.totalBrickImages);                                       // For debugging
        GameScript.totalBrickImages = 21;                                           // Hardcoded value
        GameScript.checkDifficulty();
        GameScript.bricks = [];
        GameScript.addBricks(GameScript.currentSettings[0].value);
        
        // Retreive the score statistics
        GameScript.totalPoints = GameScript.retreiveCount(GameScript.totalPointsInfoElem);
        GameScript.gamesCount = GameScript.retreiveCount(GameScript.gamesCountInfoElem);
        GameScript.averagePoints = GameScript.retreiveCount(GameScript.averagePointsInfoElem);
        
        // Show a message if there is a message stored in the local storage and then remove it from the local storage
        if (localStorage.getItem("msgElem") !== null) {
            GameScript.msgElem.innerHTML = localStorage.getItem("msgElem");
            localStorage.removeItem("msgElem");
        }
        
        // Add a click sound for every button
        var buttons = document.getElementsByTagName("button");
        for (i=0; i<buttons.length; i++)
            Event.add(buttons[i], "click", GameScript.clickButtonSound);
        
        // Create a new TimerApplication object instance if there is a time limit, no need to keep track of it (it can delete itself from within)
        if (GameScript.time !== 0)
            GameScript.timerApp = new TimerApplication(GameScript.clickSnd, GameScript.pageContent, GameScript.drag);
        
        // Initialize the other static script files
        PlayTheGame.init();
        MusicPlayer.init();
        
        //GameScript.getAmountOfImages();
        //getImages();
        
    }, // End Function: init
    
    
    
    // Function to check and prepare conditions for certain difficulty settings
    checkDifficulty: function() {   // Start Function: checkDifficulty
        
        var difficulty = GameScript.currentSettings[2].value;       // Read the current difficulty setting
        switch (difficulty) {                                       // Go through each possible difficulty setting and change the value for the amount of bricks to use and the time limit to reflect that difficulty setting
            case "Very Easy":
                GameScript.currentSettings[0].value = 16;
                GameScript.currentSettings[1].value = 2;
                break;
            case "Easy":
                GameScript.currentSettings[0].value = 20;
                GameScript.currentSettings[1].value = 3;
                break;
            case "Medium":
                GameScript.currentSettings[0].value = 24;
                GameScript.currentSettings[1].value = 4;
                break;
            case "Hard":
                GameScript.currentSettings[0].value = 30;
                GameScript.currentSettings[1].value = 5;
                break;
            case "Very Hard":
                GameScript.currentSettings[0].value = 36;
                GameScript.currentSettings[1].value = 6;
                break;
        }
        
        var duration = parseInt(GameScript.currentSettings[1].value);   // Get the time limit as an integer                  
        GameScript.time = (duration * 60);                              // Converts the time limit into seconds (the menu states minutes)
        
        if (GameScript.currentSettings[1].value === "0")            // If there is no time limit then state the time limit is unlimites, otherwise state the time limit is in minutes or just a single minute
            GameScript.currentSettings[1].value = "Unlimited";
        else if (GameScript.currentSettings[1].value === "1")
            GameScript.currentSettings[1].value += " minute";
        else GameScript.currentSettings[1].value += " minutes";
        
    }, // End Function: checkDifficulty
    
    
    
    // Retreive a score statistics value from HTML code and return that value as an integer
    retreiveCount: function(html) {   // Start Function: retreiveCount
        
        if (html.innerHTML === null)
            return 0;
        return parseInt(html.innerHTML);
        
    }, // End Function: retreiveCount
    
    
    
    // Go to the PHP page which will update the database with the score statistics
    goToStoreDatabase: function() {   // Start Function: goToStoreDatabase
        
        var totalPoints = GameScript.totalPoints;
        var gamesCount = GameScript.gamesCount;
        location.href= "store.php?totalpoints=" + totalPoints + "&gamescount=" + gamesCount;
        
    }, // End Function: goToStoreDatabase
    
    
    
    // Check if the info window must be extended
    checkMoreInfo: function() {   // Start Function: checkMoreInfo
        
        // If the score window is not extended then extend it, otherwise make it small again
        if (GameScript.userMoreInfoElem.style.display === "block") {
            GameScript.userMoreInfoElem.style.display = "none";
            GameScript.extendUserInfoBtn.innerHTML = "Show More";
        }
        else {
            GameScript.userMoreInfoElem.style.display = "block";
            GameScript.extendUserInfoBtn.innerHTML = "Show Less";
        }
        
    }, // End Function: checkMoreInfo
    
    
    
    // Add new bricks (or reduce when selecting a lower value)
    addBricks: function(selectedBricks) {   // Start Function: addBrickTiles
        
        selectedBricks = parseInt(selectedBricks);                  // Ensure this variable is read as an integer, not a string
        var i, brick, count = 0;                                    // Reset and initialize these local variables
        GameScript.couples = [];                                    // Empty the list that links memory game bricks which are coupled (two bricks having the same image)
        GameScript.randomizeBrickImages(selectedBricks);
        
        // More bricks require that the web page is adjusted to present it properly, so adjust the style
        if (selectedBricks <= 20)
            document.getElementById("bricks").style.width = (selectedBricks / 4) * 70 + "px";
        else document.getElementById("bricks").style.width = 6 * 70 + "px";
        
        for (i=0; i<selectedBricks/2; i++)                          // Fill the couples list with half the amount of used bricks with the value 0
            GameScript.couples.push(0);
        while (GameScript.bricks.length > 0) {                      // Remove all existing bricks from both the code and HTML, if they exist at all
            brick = GameScript.bricks.pop();
            brick.remove(GameScript.bricksDiv);
        }
        for (i=0; i<selectedBricks; i++)                            // Add the amount of requested bricks
           GameScript.bricks.push(new Brick());
        
        while (count !== selectedBricks) {                                  // Continue this loop as long the count value has not reached the amount of requested bricks (aka, end when all bricks have been set with an image)
            rand = Math.floor((Math.random() * GameScript.bricks.length));  // Choose a random value between 0 and the amount of available bricks
            brick = GameScript.bricks[rand];                                // Use the random value to pick a brick in the list with the bricks
            if (brick.getImage() === null) {                                // If the brick has not been set with a image yet, set an image for it and increase the count value with one
                brick.setImage();
                count++;
            }
        }
    
    }, // End Function: addBrickTiles
    
    
    
    // Randomize the images used to assign to the memory game bricks
    randomizeBrickImages: function(selectedBricks) {   // Start Function: randomizeBricks
        
        GameScript.brickImages = [];                              // Reset the array that holds all the brick image numbers that should be used
        
        while (GameScript.brickImages.length !== selectedBricks/2) {                // Keep running this loop until the array is filled to half the amount of used memory game bricks on the page
            var rand = Math.floor(Math.random() * GameScript.totalBrickImages);     // Choose a random integer value between the first and last available image
            if (GameScript.brickImages.indexOf(rand) < 0)                           // Check if the random value does not exist in the array, if so add it to the array
                GameScript.brickImages.push(rand);
        }
        
    },
    
    
    
    // Preforms activities to end the current round, resetting for new round and updating scores
    endGame: function() {
        
        PlayTheGame.stop();
        
        // Calculate score from current round and update the score statistics values
        var score = GameScript.calcPosRoundVal(20 - (GameScript.swapsCount - GameScript.bricks.length/2) * 1.2);
        if (GameScript.timerApp !== null)
            score += GameScript.calcPosRoundVal((GameScript.time - GameScript.timerApp.getRemainingTime()) / (GameScript.time / 20));
        GameScript.totalPoints += score;                            // Update global score with current score from round
        GameScript.gamesCount++;                                    // Add 1 extra game to count
        
        // Present results in a message and update the counted value for the info window message
        if (GameScript.swapsCount === 1)
         localStorage.setItem("msgElem", "You solved it with " + GameScript.swapsCount + " swap, so you earned " + score + " points.");
        else localStorage.setItem("msgElem", "You solved it with " + GameScript.swapsCount + " swaps, so you earned " + score + " points.");
        
        GameScript.goToStoreDatabase();
        
    }, // End endGame
    
    
    
    // Force the game to end because the timer ran out
    stopGameByTimer: function() {   // Start Function: stopGameByTimer
        
        PlayTheGame.stop();
        GameScript.msgElem.innerHTML =  "The timer ran out! You lost.";
        
    }, // End Function: stopGameByTimer
    
    
    
    // Function to calculate a value as rounded, resetting it to 0 if below it
    calcPosRoundVal: function(a) {   // Start Function: calcPosRoundVal
        
        a = Math.floor(a);                                          // Round the provided value so it becomes a whole number
        if (a < 0)                                                  // If the number is negative, send back 0 as an answer
           return 0;
        return a;                                                   // Answer the call with the rounded value if not already send back as 0
        
    }, // End Function: calcPosRoundVal
    
    
    
    // jQuery based function that uses AJAX to count the amount of images in a folder
    countFiles: function(path) {   // Start Function: getAmountOfImages
        
        // Code based on the following suggestion from: http://stackoverflow.com/questions/29232134/how-to-get-the-count-of-file-in-a-directory-using-jquery
        // The code actually works, in the current situation it shows that 21 files exists in the folder that contain the brick images
        
        $.ajax({                                                    // Use jQuery to run AJAX
            url: path,                                              // Get to the folder that contains files
            success: function(data) {                               // If the folder can be sucessfully accessed
                // Local Variables
                var parser = new DOMParser();
                var doc = parser.parseFromString(data, "text/html");
                var fileCount = 0;
                var rows = doc.querySelector("table").querySelectorAll("tr");
                
                // Go through each file in the folder and count it
                for (var i=0;i<rows.length;i++)
                    if (rows[i].children[3])
                        if (parseInt(rows[i].children[3].innerText) > 0)
                            fileCount++;
                
                //return fileCount;                                 // Should be preferable to return an integer value instead
                GameScript.totalBrickImages = fileCount;            // Should be decoupled with the GameScript class itself
            }
        });
        
        //return 0;                                                 // In case AJAX could not be accessed successfully
        
    },   // End Function: getAmountOfImages
    
    
    
    clickButtonSound: function()                                    { GameScript.clickSnd.play(); },    // Function: clickButtonSound   (Play a button clicking sound)
    
    
}; // End Static Class: GameScript



Event.add(window, "load", GameScript.init);							// Active function init when the page is loaded