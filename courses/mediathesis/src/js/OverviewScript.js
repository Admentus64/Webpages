// JavaScript Document
// Author: Robert Willem Hallink

var OverviewScript = {   // Start Static Class: OverviewScript
    
    // Class Functions
    
    // Functions to run when the webpage is loaded (all HTML-code is executed). Initialize global variables and relates functions to buttons
    init: function() {   // Start Function: init
        
        // Set the value for each drop-down menu to the retreived database information thanks to PHP
        $("#presetMenu").val($('#presetMenu').attr('data-val'));
        $("#difficultyMenu").val($('#difficultyMenu').attr('data-val'));
        
    }, // End Function: init
    
}; // End Static Class: OverviewScript



Event.add(window, "load", OverviewScript.init);						// Active function init when the page is loaded