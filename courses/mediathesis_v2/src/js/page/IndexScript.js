// JavaScript Document
// Author: Robert Willem Hallink

var IndexScript = {   // Start Static Class: IndexScript
    
    // Class Functions
    
    // Functions to run when the webpage is loaded (all HTML-code is executed). Initialize global variables and relates functions to buttons
    init: function() {   // Start Function: init
        
        Event.add(document.getElementById("runTestBtn"), "click", function() { location.href = "game.html"; } );
        Event.add(document.getElementById("resetTestBtn"), "click", IndexScript.resetTest);
        Event.add(document.getElementById("surveyBtn"), "click", function() { location.href = "survey.html"; } );
        
        Cookie.set("started", "0", 10);
        
    }, // End Function: init
    
    resetTest: function() {   // Start Function: resetTest
        
        Cookie.erase("started");
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
        
    }, // End Function: resetTest
    
}; // End Static Class: IndexScript



Event.add(window, "load", IndexScript.init);						// Active function init when the page is loaded