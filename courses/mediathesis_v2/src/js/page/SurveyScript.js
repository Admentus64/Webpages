// JavaScript Document
// Author: Robert Willem Hallink

var SurveyScript = {   // Start Static Class: SurveyScript
    
    // Class Variables
    timeStamp: null,
    data: null,
    presets: null,
    
    statistics: {
        "preset" : [],
        "rating" : [],
        "points" : [],
        "highestFace" : [],
        "usedSkips" : [],
        "maxSkips" : [],
        "goodSets" : [],
        "badSets" : [],
        "fieldClears" : [],
        "level" : [],
        "pauses" : [],
        "shortClock" : [],
        "longClock" : [],
        "timePlayed" : [],
    },
    
    
    
    // Class Functions
    
    // Functions to run when the webpage is loaded (all HTML-code is executed). Initialize global variables and relates functions to buttons
    init: function() {   // Start Function: init
        
        if (Cookie.check("concluded", "0") || !Cookie.exists("concluded"))
            location.href = "index.html";
        
        document.getElementById("timeStampDate").innerHTML = Cookie.get("timeStamp").substr(0, 10);
        document.getElementById("timeStampTime").innerHTML = Cookie.get("timeStamp").substr(11);
        
        // Buttons
        //Event.add(document.getElementById("returnIndexBtn"), "click", function() { location.href = "index.html"; } );
        
        // Get survey data & questions
        SurveyScript.timeStamp = document.getElementById("timeStamp");
        SurveyScript.data = SurveyScript.getSurveyQuestions("surveyData");
        SurveyScript.presets = SurveyScript.getSurveyQuestions("surveyPresets");
        
        // Fill in survey data & questions
        SurveyScript.timeStamp.value = Cookie.get("timeStamp");
        SurveyScript.getData();
        SurveyScript.preparePresetsQuestions();
        SurveyScript.setPresetsRadioboxes();
        
    }, // End Function: init
    
    
    
    getData: function() {   // Start Function: getData
        
        SurveyScript.statistics.preset = Cookie.get("preset", true, false);
        SurveyScript.statistics.rating = Cookie.get("rating", true, false);
        SurveyScript.statistics.points = Cookie.get("points", true, true);
        SurveyScript.statistics.highestFace = Cookie.get("highestFace", true, true);
        SurveyScript.statistics.usedSkips = Cookie.get("usedSkips", true, true);
        SurveyScript.statistics.maxSkips = Cookie.get("maxSkips", true, true);
        SurveyScript.statistics.goodSets = Cookie.get("goodSets", true, true);
        SurveyScript.statistics.badSets = Cookie.get("badSets", true, true);
        SurveyScript.statistics.fieldClears = Cookie.get("fieldClears", true, false);
        SurveyScript.statistics.level = Cookie.get("level", true, false);
        SurveyScript.statistics.pauses = Cookie.get("pauses", true, true);
        SurveyScript.statistics.shortClock = Cookie.get("shortClock", true, false);
        SurveyScript.statistics.longClock = Cookie.get("longClock", true, false);
        SurveyScript.statistics.timePlayed = Cookie.get("timePlayed", true, false);
        
        for (var i=0; i<SurveyScript.data.length; i++) {
            SurveyScript.data[i][0].value = SurveyScript.statistics.preset[i];
            SurveyScript.data[i][1].value = SurveyScript.statistics.rating[i];
            SurveyScript.data[i][2].value = SurveyScript.statistics.points[i];
            SurveyScript.data[i][3].value = SurveyScript.statistics.highestFace[i];
            SurveyScript.data[i][4].value = SurveyScript.statistics.usedSkips[i];
            SurveyScript.data[i][5].value = SurveyScript.statistics.maxSkips[i];
            SurveyScript.data[i][6].value = SurveyScript.statistics.goodSets[i];
            SurveyScript.data[i][7].value = SurveyScript.statistics.badSets[i];
            SurveyScript.data[i][8].value = SurveyScript.statistics.fieldClears[i];
            SurveyScript.data[i][9].value = SurveyScript.statistics.level[i];
            SurveyScript.data[i][10].value = SurveyScript.statistics.pauses[i];
            SurveyScript.data[i][11].value = SurveyScript.statistics.shortClock[i];
            SurveyScript.data[i][12].value = SurveyScript.statistics.longClock[i];
            SurveyScript.data[i][13].value = SurveyScript.statistics.timePlayed[i];
        }
        
    }, // End Function: getData
    
    
    
    preparePresetsQuestions: function() {   // Start Function: preparePresetsCheckboxes
        
        var presetsQuestionTitles = document.getElementById("surveyPresets").getElementsByTagName("p");
        
        for (var i=0; i<presetsQuestionTitles.length; i++)
            presetsQuestionTitles[i].innerHTML += SurveyScript.statistics.rating[i] + "/10";
        
    },   // End Function: preparePresetQuestion
    
    
    
    setPresetsRadioboxes: function() {   // Start Function: setPresetsCheckboxes
        
        var preset, radiobox;
        for (var i=0; i<SurveyScript.presets.length; i++) {
            
            if (i === 0)
                preset = "Default";
            else if (i === 1)
                preset = "Easier";
            else if (i === 2)
                preset = "Harder";
            else if (i === 3)
                preset = "Choices";
            else if (i === 4)
                preset = "Static Time";
            else if (i === 5)
                preset = "Audiovisual";
                
            for (var j=0; j<SurveyScript.presets[i].length; j++) {
                
                if (j === 0)
                    radiobox = "fun";
                else if (j === 1)
                    radiobox = "innovative";
                else if (j === 2)
                    radiobox = "challenge";
                else if (j === 3)
                    radiobox = "understand";
                else if (j === 4)
                    radiobox = "choices";
                else if (j === 5)
                    radiobox = "time";
                else if (j === 6)
                    radiobox = "timer";
                
                SurveyScript.presets[i][j].value += Cookie.get("survey-" + preset + "-" + radiobox);
                SurveyScript.presets[i][j].name += SurveyScript.statistics.rating[i] + "/10";
            }
        }
    
	}, // End Function: setPresetsCheckboxes
    
    
    
    getSurveyQuestions: function(id) {   // Start Function: getSurveyQuestions
        
        var arr = new Array(document.getElementById(id).getElementsByTagName("div").length);
        for (var i=0; i<document.getElementById(id).getElementsByTagName("div").length; i++) {
            arr[i] = new Array(document.getElementById(id).getElementsByTagName("div")[i].getElementsByTagName("input").length);
            for (var j=0; j<document.getElementById(id).getElementsByTagName("div")[i].getElementsByTagName("input").length; j++)
                arr[i][j] = document.getElementById(id).getElementsByTagName("div")[i].getElementsByTagName("input")[j];
        }
        
        return arr;
        
    }, // End Function: getSurveyQuestions
    
}; // End Static Class: SurveyScript



Event.add(window, "load", SurveyScript.init);						// Active function init when the page is loaded