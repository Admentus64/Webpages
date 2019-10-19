// JavaScript Document
// Author: Robert Willem Hallink

var Statistics = {   // Start Static Class: Statistics
    
    // Class Variables
    preset: [],
    rating: [],
    points: [],
    highestFace: [],
    usedSkips: [],
    maxSkips: [],
    goodSets: [],
    badSets: [],
    fieldClears: [],
    level: [],
    pauses: [],
    shortClock: [],
    longClock: [],
    timePlayed: [],
    
    time: 0,
    rounds: 0,
    timestamp: "2000-01-01 00:00:00",
    
    
    
    // Getters
    getPreset: function() { return Statistics.preset[Statistics.preset.length-1]; },
    getRating: function() { return Statistics.rating[Statistics.rating.length-1]; },
    getPoints: function() { return Statistics.points[Statistics.points.length-1]; },
    getHighestFace: function() { return Statistics.highestFace[Statistics.highestFace.length-1]; },
    getUsedSkips: function() { return Statistics.usedSkips[Statistics.usedSkips.length-1]; },
    getMaxSkips: function() { return Statistics.maxSkips[Statistics.maxSkips.length-1]; },
    getGoodSets: function() { return Statistics.goodSets[Statistics.goodSets.length-1]; },
    getBadSets: function() { return Statistics.badSets[Statistics.badSets.length-1]; },
    getFieldClears: function() { return Statistics.fieldClears[Statistics.fieldClears.length-1]; },
    getLevel: function() { return Statistics.level[Statistics.level.length-1]; },
    getPauses: function() { return Statistics.pauses[Statistics.pauses.length-1]; },
    getShortClock: function() { return Statistics.shortClock[Statistics.shortClock.length-1]; },
    getLongClock: function() { return Statistics.longClock[Statistics.longClock.length-1]; },
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
    
    setHighestFace: function(val) {
        Statistics.highestFace[Statistics.highestFace.length-1] = val;
        return Statistics.getHighestFace();
    },
    
    setUsedSkips: function(val) {
        if (val == true)
            Statistics.usedSkips[Statistics.usedSkips.length-1]++;
        else Statistics.usedSkips[Statistics.usedSkips.length-1] = val;
        return Statistics.getUsedSkips();
    },
    
    setMaxSkips: function(val, addition) {
        if (val === true)
            Statistics.maxSkips[Statistics.maxSkips.length-1]++;
        else {
            if (addition === true)
                Statistics.maxSkips[Statistics.maxSkips.length-1] += val;
            else Statistics.maxSkips[Statistics.maxSkips.length-1] = val;
        }
        return Statistics.getMaxSkips();
    },
    
    setGoodSets: function(val) {
        if (val === true)
            Statistics.goodSets[Statistics.goodSets.length-1]++;
        else Statistics.goodSets[Statistics.goodSets.length-1] = val;
        return Statistics.getGoodSets();
    },
    
    setBadSets: function(val) {
        if (val === true)
            Statistics.badSets[Statistics.badSets.length-1]++;
        else Statistics.badSets[Statistics.badSets.length-1] = val;
        return Statistics.getBadSets();
    },
    
    setFieldClears: function(val) {
        if (val == true)
            Statistics.fieldClears[Statistics.fieldClears.length-1]++;
        else Statistics.fieldClears[Statistics.fieldClears.length-1] = val;
        return Statistics.getFieldClears();
    },
    
    setLevel: function(val, addition) {
        if (val === true)
            Statistics.level[Statistics.level.length-1]++;
        else {
            if (addition === true)
                Statistics.level[Statistics.level.length-1] += val;
            else Statistics.level[Statistics.level.length-1] = val;
        }
        return Statistics.getLevel();
    },
    
    setPauses: function(val) {
        if (val == true)
            Statistics.pauses[Statistics.pauses.length-1]++;
        else Statistics.pauses[Statistics.pauses.length-1] = val;
        return Statistics.getPauses();
    },
    
    setShortClock: function(val) {
        Statistics.shortClock[Statistics.shortClock.length-1] = val;
        return Statistics.getShortClock();
    },
    
    setLongClock: function(val) {
        Statistics.longClock[Statistics.longClock.length-1] = val;
        return Statistics.getLongClock();
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
        Statistics.highestFace.push(0);
        Statistics.usedSkips.push(0);
        Statistics.maxSkips.push(0);
        Statistics.goodSets.push(0);
        Statistics.badSets.push(0);
        Statistics.fieldClears.push(0);
        Statistics.level.push(1);
        Statistics.pauses.push(0);
        Statistics.shortClock.push("");
        Statistics.longClock.push("");
        Statistics.timePlayed.push("");
        
        Statistics.rounds++;
        
    }, // End Function: startNewRound
    
    endRound: function() {   // Start Function: endRound
        
        Statistics.setPreset(GameScript.getPreset());
        Statistics.setShortClock(GameScript.clocks.shortClock.getRemainingTime());
        Statistics.setLongClock(GameScript.clocks.longClock.getRemainingTime());
        Statistics.setTimePlayed(GameScript.infoElem.timePlayed.innerHTML);
        
    }, // End Function: endRound
    
    endExperiment: function() {   // Start Function: endExperiment
        
        PlayTheGame.finishedDiv.style.display = "Block";
        Statistics.timeStamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
        
        Cookie.erase("started");
        Cookie.erase("resume");
        Cookie.set("concluded", "1", 10);
        
        Cookie.set("timeStamp", Statistics.timeStamp, 10);
        
        // Try running Ajax and PHP code for database support
        /*try {
            $.post("endExperiment.php", {
                message: Statistics.writeEmail(),
                preset: Statistics.preset,
                rating: Statistics.rating,
                points: Statistics.points,
                highestFace: Statistics.highestFace,
                usedSkips: Statistics.usedSkips,
                maxSkips: Statistics.maxSkips,
                goodSets: Statistics.goodSets,
                badSets: Statistics.badSets,
                fieldClears: Statistics.fieldClears,
                level: Statistics.level,
                pauses: Statistics.pauses,
                shortClock: Statistics.shortClock,
                longClock: Statistics.longClock,
                timePlayed: Statistics.timePlayed,
                timeStamp: Statistics.timeStamp
            });
        }
        catch(error) {
            console.error(error);
        }*/
        
        setTimeout(function() { location.href = "survey.html"; }, 5000);
        
    }, // End Function: endExperiment
    
    writeEmail: function() {   // Start Function: writeEmail
        
        var message = "<b>Date & Time:</b>" + "<br>" + Statistics.timeStamp + "<br>";
        
        for (var i=0; i<Statistics.rounds; i++) {            
            message += "<br><br><b>Preset:</b><br>" + Statistics.preset[i] + "<br><br>";
            message += "<table border='1px solid black' width=50%>";
            message += "<tr><th>Rating</th><td align='center'>" + Statistics.rating[i] + "</td></tr>";
            message += "<tr><th>Points</th><td align='center'>" + Statistics.points[i] + "</td></tr>";
            message += "<tr><th>Highest Cleared Card Face</th><td align='center'>" + Statistics.highestFace[i] + "</td></tr>";
            message += "<tr><th>Skips Used</th><td align='center'>" + Statistics.usedSkips[i] + "</td></tr>";
            message += "<tr><th>Total Skips Available</th><td align='center'>" + Statistics.maxSkips[i] + "</td></tr>";
            message += "<tr><th>Pairs Correct</th><td align='center'>" + Statistics.goodSets[i] + "</td></tr>";
            message += "<tr><th>Pairs Wrong</th><td align='center'>" + Statistics.badSets[i] + "</td></tr>";
            message += "<tr><th>Times Clearing the Field of Cards</th><td align='center'>" + Statistics.fieldClears[i] + "</td></tr>";
            message += "<tr><th>Difficulty Level Advances</th><td align='center'>" + Statistics.level[i] + "</td></tr>";
            message += "<tr><th>Times Paused</th><td align='center'>" + Statistics.pauses[i] + "</td></tr>";
            message += "<tr><th>Time Remaining on the Dynamic Clock</th><td align='center'>" + Statistics.shortClock[i] + "</td></tr>";
            message += "<tr><th>Time Remaining on the Static Clock</th><td align='center'>" + Statistics.longClock[i] + "</td></tr>";
            message += "<tr><th>Time Played</th><td align='center'>" + Statistics.timePlayed[i] + "</td></tr>";
            message += "</table>";
        }
        
        return message;
        
    }, // End Function: writeEmail

}; // End Static Class: Statistics