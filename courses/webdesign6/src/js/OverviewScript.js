// JavaScript Document
// Author: Robert Willem Hallink

var OverviewScript = {   // Start Static Class: OverviewScript
    
    // Class Functions
    
    // Functions to run when the webpage is loaded (all HTML-code is executed). Initialize global variables and relates functions to buttons
    init: function() {   // Start Function: init
        
        // Set the value for each drop-down menu to the retreived database information thanks to PHP
        $("#amountOfMemoryCardsMenu").val($("#amountOfMemoryCardsMenu").attr("data-val"));
		$("#timeLimitMenu").val($("#timeLimitMenu").attr("data-val"));
		$("#difficultyMenu").val($('#difficultyMenu').attr('data-val'));
		
        // Disable the settings for custom difficulty menu if the diffculty is not set at "Custom"
		if ($("#difficultyMenu").val() !== "Custom") {
			$("#amountOfMemoryCardsMenu").prop("disabled", true);
			$("#timeLimitMenu").prop("disabled", true);
			$("#setCustomDifficulty").prop("disabled", true);
            $("#customDifficultyMessage").html("You can only customize the difficulty settings yourself on the Custom difficulty setting.");
		}
        
    }, // End Function: init
    
}; // End Static Class: OverviewScript



Event.add(window, "load", OverviewScript.init);						// Active function init when the page is loaded