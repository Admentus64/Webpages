function getDestination(startTime) {
    
	var request = AJAXRequest();
    if (request === false)
        return;
	
    request.open("GET", "src/json/destinations.json", true);
    request.send(null);
	
	request.onreadystatechange  = function() {
		if (request.readyState === 4 && request.status === 200)
			readDestination(startTime, JSON.parse(request.responseText));
    };
	
}

function readDestination(startTime, json) {
    
    var result = "";
    var dest;
    var chosenDestination = setDestinationTextBox.value;
    var day, time;
    var limit = 10, currLimit = 0;
    var lastTab = 0;
    
    for (var i=0; i<json.destination.length; i++)
        if (json.destination[i].location === chosenDestination.toLowerCase()) {
            dest = i;
            break;
        }
        
    if (dest === undefined || dest === null) {
        runChooseDestinationMenu();
        setDestinationTextBox.value = "Destination not recognized";
        return;
    }
    
    day = getSelectedDay();
    var date = new Date();
    
    if (selectedDay === "Disabled") {
        for (time=startTime; time<json.destination[dest].day[day].time.length; time++) {
            jsonTime = json.destination[dest].day[day].time[time];
            hour = parseInt(jsonTime.substring(0, jsonTime.indexOf(".")));
            minute = parseInt(jsonTime.substring(jsonTime.indexOf(".")+1));
        
            if (hour > date.getHours() || hour == date.getHours() && minute >= date.getMinutes()) {
                if (result === "" && lastTimeTab === 0) {
                    nextBus = "";
                    if (hour.toString().length === 1)
                        nextBus += "0";
                    nextBus += hour + ".";
                    if (minute.toString().length === 1)
                        nextBus += "0";
                    nextBus += minute;
                    firstTime = time;
                }
                
                if (lastTimeTab === 0 && time === json.destination[dest].day[day].time.length-1)
                    showMoreBtn[0].disabled = true;
                
                result += json.destination[dest].day[day].time[time] + "<br>";
                if (++currLimit === limit || time === json.destination[dest].day[day].time.length-1) {
                    lastTime = time;
                    lastTimeTab++;
                    if (lastTime === json.destination[dest].day[day].time.length-1)
                        lastTime = 0;
                    break;
                }
            }
            
        }
    }
    else {
        for (time=startTime; time<json.destination[dest].day[day].time.length; time++) {
            result += json.destination[dest].day[day].time[time] + "<br>";
            if (++currLimit === limit || time === json.destination[dest].day[day].time.length-1) {
                lastTime = time;
                lastTimeTab++;
                if (lastTime === json.destination[dest].day[day].time.length-1)
                    lastTime = 0;
                break;
            }
        }
    }
    
    if (result !== "") {
        lastTab = Math.ceil((json.destination[dest].day[day].time.length - firstTime) / limit);
        goalInfo[0].innerHTML = "Showing the next " + currLimit + " scheduled buses<br>" + "Current Tab Page: " + lastTimeTab + "/" + lastTab;
        if (selectedDay === "Disabled")
            goalInfo[0].innerHTML += "<br><b>The next bus leaves at: " + nextBus + "</b>";
    }
    else if (result === "") {
        showMoreBtn[0].disabled = true;
        result = "<b>No buses are leaving today anymore.</b>";
    }
    
    presentInfo[0].innerHTML = result;
    
}



function showMoreDestinations() {
    
    if (lastTime !== 0)
        lastTime++;
    if (lastTime === 0)
        lastTimeTab = 0;
    
    getDestination(lastTime);
    setCurrentTime();
    
}
