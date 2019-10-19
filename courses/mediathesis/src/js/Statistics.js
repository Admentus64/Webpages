// JavaScript Document
// Author: Robert Willem Hallink

var Statistics = {   // Start Static Class: Statistics
    
    // Class Variables
    preset: [],
    rating: [],
    points: [],
    goodSets: [],
    failedSets: [],
    difficulty: [],
    finalDifficulty: [],
    timeHighest: [],
    timePlayed: [],
    
    time: 0,
    rounds: 0,
    timestamp: "2000-01-01 00:00:00",
    
    
    
    // Getters
    getPreset: function() { return Statistics.preset[Statistics.preset.length-1]; },
    getRating: function() { return Statistics.rating[Statistics.rating.length-1]; },
    getPoints: function() { return Statistics.points[Statistics.points.length-1]; },
    getGoodSets: function() { return Statistics.goodSets[Statistics.goodSets.length-1]; },
    getFailedSets: function() { return Statistics.failedSets[Statistics.failedSets.length-1]; },
    getDifficulty: function() { return Statistics.difficulty[Statistics.difficulty.length-1]; },
    getFinalDifficulty: function() { return Statistics.finalDifficulty[Statistics.finalDifficulty.length-1]; },
    getTimeHighest: function() { return Statistics.timeHighest[Statistics.timeHighest.length-1]; },
    getTimePlayed: function() { return Statistics.timePlayed[Statistics.timePlayed.length-1]; },
    
    
    
    // Setters
    setPreset: function(val) {
        Statistics.preset[Statistics.preset.length-1] = val;
        return Statistics.getPreset();
    },
    
    setRating: function(val) {
        Statistics.rating[Statistics.rating.length-1] = val;
        return Statistics.getRating();
    },
    
    setPoints: function(val, addition) {
        if (val === true)
            Statistics.points[Statistics.points.length-1]++;
        else {
            if (addition === true)
                Statistics.points[Statistics.points.length-1] += val;
            else Statistics.points[Statistics.points.length-1] = val;
        }
        return Statistics.getPoints();
    },
    
    setGoodSets: function(val) {
        if (val === true)
            Statistics.goodSets[Statistics.goodSets.length-1]++;
        else Statistics.goodSets[Statistics.goodSets.length-1] = val;
        return Statistics.getGoodSets();
    },
    
    setFailedSets: function(val) {
        if (val === true)
            Statistics.failedSets[Statistics.failedSets.length-1]++;
        else Statistics.failedSets[Statistics.failedSets.length-1] = val;
        return Statistics.getFailedSets();
    },
    
    setDifficulty: function(val) {
        Statistics.difficulty[Statistics.difficulty.length-1] = val;
        return Statistics.getDifficulty();
    },
    
    setFinalDifficulty: function(val) {
        Statistics.finalDifficulty[Statistics.finalDifficulty.length-1] = val;
        return Statistics.getFinalDifficulty();
    },
    
    setTimeHighest: function(val) {
        Statistics.timeHighest[Statistics.timeHighest.length-1] = val;
        return Statistics.getTimeHighest();
    },
    
    setTimePlayed: function(val) {
        Statistics.timePlayed[Statistics.timePlayed.length-1] = val;
        return Statistics.getTimePlayed();
    },
    
    
    
    // Class Functions
    startNewRound: function() {   // Start Function: startNewRound
        
        Statistics.preset.push("");
        Statistics.rating.push(0);
        Statistics.points.push(0);
        Statistics.goodSets.push(0);
        Statistics.failedSets.push(0);
        Statistics.difficulty.push(GameScript.difficulty);
        Statistics.finalDifficulty.push("");
        Statistics.timeHighest.push("");
        Statistics.timePlayed.push("");
        
        Statistics.rounds++;
        
    }, // End Function: startNewRound
    
    endRound: function() {   // Start Function: endRound
        
        Statistics.setPreset(GameScript.getPreset());
        Statistics.setFinalDifficulty(GameScript.difficulty);
        Statistics.setTimeHighest(GameScript.clocks.shortClock.getHighestTime());
        Statistics.setTimePlayed(GameScript.infoElem.timePlayed.innerHTML);
        
    }, // End Function: endRound
    
    endExperiment: function() {   // Start Function: endExperiment
        
        //GameScript.setMessage("The expirement has concluded.<br>Thank you for participating.<br>Your statistics has been submitted.");
        PlayTheGame.finishedDiv.style.display = "Block";
        Statistics.timeStamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
        
        $.post("endExperiment.php", {
            message: Statistics.writeEmail(),
            preset: Statistics.preset,
            rating: Statistics.rating,
            points: Statistics.points,
            goodSets: Statistics.goodSets,
            failedSets: Statistics.failedSets,
            difficulty: Statistics.difficulty,
            finalDifficulty: Statistics.finalDifficulty,
            timeHighest: Statistics.timeHighest,
            timePlayed: Statistics.timePlayed,
            timeStamp: Statistics.timeStamp
        });
        
    }, // End Function: endExperiment
    
    writeEmail: function() {   // Start Function: writeEmail
        
        var message = "<b>Date & Time:</b>" + "<br>" + Statistics.timeStamp + "<br>";
        
        for (var i=0; i<Statistics.rounds; i++) {            
            message += "<br><br><b>Preset:</b><br>" + Statistics.preset[i] + "<br><br>";
            message += "<table border='1px solid black' width=50%>";
            message += "<tr><th>Rating</th><td align='center'>" + Statistics.rating[i] + "</td></tr>";
            message += "<tr><th>Points</th><td align='center'>" + Statistics.points[i] + "</td></tr>";
            message += "<tr><th>Pairs Correct</th><td align='center'>" + Statistics.goodSets[i] + "</td></tr>";
            message += "<tr><th>Pairs Wrong</th><td align='center'>" + Statistics.failedSets[i] + "</td></tr>";
            message += "<tr><th>Starting Difficulty</th><td align='center'>" + Statistics.difficulty[i] + "</td></tr>";
            message += "<tr><th>Final Difficulty</th><td align='center'>" + Statistics.finalDifficulty[i] + "</td></tr>";
            message += "<tr><th>Highest Time Remaining</th><td align='center'>" + Statistics.timeHighest[i] + "</td></tr>";
            message += "<tr><th>Time Played</th><td align='center'>" + Statistics.timePlayed[i] + "</td></tr>";
            message += "</table>";
        }
        
        return message;
        
    }, // End Function: writeEmail

}; // End Static Class: Statistics