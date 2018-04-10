// JavaScript Document
// Author: Group 10

var Index = {   // Start Static Class: Index
    
    // Class Variables
    suggestionsElem: undefined,
    listOfSuggestions: ["Borgholmsslott", "Sightseeing Kalmarflundran", "Skärgårdsdagen på Händelöp", "Skärgårdsfestivalen"],
    
    
    
    // Class Methods
    init: function() {   // Start Method: init
        
        Index.suggestionsElem = document.getElementById("activitySuggestions"); // Link to HTML code
        Payload.setFilters();                                                   // Prepare the filters in order to allow activities
        
        // Go through all database to retrieve activities
        Ajax.request("database", [Payload.load, Index.recommend, SlideShow.setBigImageEvent], false, true);
        Ajax.request("&controller=location&method=getall", [Payload.load, Index.recommend, SlideShow.setBigImageEvent], false, true);
        
    }, // End Method: init
    
    recommend: function() {   // Start Method: recommend
        
        Index.suggestionsElem.innerHTML = "";                                           // Reset the suggestions column
        
        var bestListSize = Payload.activities.length / 4;                               // Only suggest the top 25% rated activities
        var arr = [];                                                                   // Store the current suggested activities ID:s
        
        // Retrieve the predefined suggestions and add them to the list of suggestions if found
        for (var i=0; i<Payload.activities.length; i++)                                 // Go through all activities
            for (var j=0; j<Index.listOfSuggestions.length; j++)                        // Go through all predefined suggestions
                if (Payload.activities[i].name === Index.listOfSuggestions[j]) {        // If the activities list contains one of the predefined suggestions then add it to the suggestions list
                    arr.push(Payload.activities[i].id);
                    Index.recommendActivity(Payload.activities[i]);
                    
                }
        
        if (bestListSize < 4)                                                           // Make sure there are at least 4 available suggestions, otherwise just stop here
            return;
        
        // Randomly choose suggestions
        Payload.activities.sort(Payload.dynamicSort("-rating"));                        // Start by sorting all activities on the highest rating to the lowest rating
        while (arr.length != 4) {                                                       // Continue as long there are not four suggestions already
            var rand = Math.floor(Math.random() * bestListSize);                        // Select a random number between 0 and the top 25% of the activities list
            if (arr.indexOf(Payload.activities[rand].id) === -1) {                      // If the randomly chosen suggestion from the activities list is not present already then add it
                arr.push(Payload.activities[rand].id);
                Index.recommendActivity(Payload.activities[rand]);
            }
        }
        
    }, // End Method: recommend
    
    recommendActivity: function(activity) {   // Start Method: recommendActivity
        
        // Elements
        var div = document.createElement("div");
        
        // Append
        Index.suggestionsElem.appendChild(div);
        div.appendChild(activity.img);                                  // Image
        div.appendChild(activity.hTag);                                 // Title + City
        
        Event.add(activity.img, "click", activity.clickReadMoreBtn);    // Go to activity when clicking on the image
        
    }, // End Method: recommendActivity
    
}; // End Static Class: Index



Event.add(window, "load", Index.init);						    // Active function init when the page is loaded