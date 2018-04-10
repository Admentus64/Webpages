function getBusTimes(isArrival, startTime) {
    
	var request = AJAXRequest();
    if (request === false)
        return;
	
    if (isArrival)
        request.open("GET", "src/json/arrivalTimes.json", true);
    else request.open("GET", "src/json/leavingTimes.json", true);
    request.send(null);
	
	request.onreadystatechange  = function() {
		if (request.readyState === 4 && request.status === 200)
			readBusTimes(isArrival, startTime, JSON.parse(request.responseText));
    };
	
}

function readBusTimes(isArrival, startTime, json) {
    
    var result = "";
    var jsonTime, hour, minute;
    var day, time;
    var stop = 0;
    var limit = 10, currLimit = 0;
    var lastTab = 0;
    
    /*for (i=0; i<json.stop.length; i++)
        if (json.stop[i].route === chosenGoal.toLowerCase()) {
            dest = i;
            break;
        }
        
    if (stop === undefined || stop === null) {
        presentInfo[1].innerHTML = "This bus stop is not recognized.";
        return;
    }*/
    
    day = getSelectedDay();
    var date = new Date();
    
    if (selectedDay === "Disabled") {
        for (time=startTime; time<json.stop[stop].day[day].time.length; time++) {
            jsonTime = json.stop[stop].day[day].time[time];
            hour = parseInt(jsonTime.substring(0, jsonTime.indexOf(".")));
            minute = parseInt(jsonTime.substring(jsonTime.indexOf(".")+1));
            
            if (hour > date.getHours() || hour == date.getHours() && minute >= date.getMinutes()) {
                if (result === "" && lastTimeTab === 0) {
                    nextBus = json.stop[stop].day[day].time[time];
                    firstTime = time;
                }
                
                if (lastTimeTab === 0 && time === json.stop[stop].day[day].time.length-1)
                    showMoreBtn[1].disabled = true;
                
                result += json.stop[stop].day[day].time[time] + "<br>";
                if (++currLimit === limit || time === json.stop[stop].day[day].time.length-1) {
                    lastTime = time;
                    lastTimeTab++;
                    if (lastTime === json.stop[stop].day[day].time.length-1)
                        lastTime = 0;
                    break;
                }
            }
        }
    }
    else {
        for (time=startTime; time<json.stop[stop].day[day].time.length; time++) {
            result += json.stop[stop].day[day].time[time] + "<br>";
            if (++currLimit === limit || time === json.stop[stop].day[day].time.length-1) {
                lastTime = time;
                lastTimeTab++;
                if (lastTime === json.stop[stop].day[day].time.length-1)
                    lastTime = 0;
                break;
            }
        }
    }
    
    if (result !== "") {
        lastTab = Math.ceil((json.stop[stop].day[day].time.length - firstTime) / limit);
        goalInfo[1].innerHTML = "Showing the next " + currLimit + " scheduled buses<br>" + "Current Tab Page: " + lastTimeTab + "/" + lastTab;
        if (isArrival && selectedDay === "Disabled")
            goalInfo[1].innerHTML += "<br><b>The next bus arrives at: " + nextBus + "</b>";
        else if (selectedDay === "Disabled")
            goalInfo[1].innerHTML += "<br><b>The next bus leaves at: " + nextBus + "</b>";
    }
    else if (result === "") {
        showMoreBtn[1].disabled = true;
        if (isArrival)
            result = "<b>No buses are arriving today anymore.</b>";
        else result = "<b>No buses are leaving today anymore.</b>";
    }
    
    currentBusStopLocation.innerHTML = json.stop[stop].position + " (Bus Line " + json.stop[stop].nr + ")" + "<br>" + json.stop[stop].route;
    presentInfo[1].innerHTML = result;
    
}



function showMoreBusLines() {
    
    if (lastTime !== 0)
        lastTime++;
    if (lastTime === 0)
        lastTimeTab = 0;
    
    if (lastMenu === "Check Bus Arrival Times")
        getBusTimes(true, lastTime);
    else getBusTimes(false, lastTime);
    setCurrentTime();
    
}