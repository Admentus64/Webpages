// JavaScript Document
// Author: Robert Willem Hallink

var ExperimentScript = {   // Start Static Class: ExperimentScript
    
    // Class Functions
    
    // Functions to run when the webpage is loaded (all HTML-code is executed). Initialize global variables and relates functions to buttons
    init: function() {   // Start Function: init
        
        ExperimentScript.resetTestBtn = document.getElementsByName("resetTest")[0];
        Event.add(ExperimentScript.resetTestBtn, "click", ExperimentScript.resetTest);
        
    }, // End Function: init
    
    resetTest: function() {   // Start Function: resetTest
        
        Cookie.erase("resume");
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
        
    }, // End Function: resetTest
    
}; // End Static Class: ExperimentScript



Event.add(window, "load", ExperimentScript.init);				        // Active function init when the page is loaded