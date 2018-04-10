function initMap() {
	
	var myStyles = [
		{
			featureType: "poi",
			elementType: "labels",
			
			stylers: [
				{ visibility: "on" }
			]
		}
	];
	
	myMap = new google.maps.Map(document.getElementById("map"), {
		center: myMapCenter,
		zoom: myMapZoom,
		styles: myStyles
		//styles: [
		//	{ featureType: "poi", stylers: [ { visibility:"on" } ] },
		//	{ featureType: "transit.station", stylers: [ { visibility:"on" } ] }
		//]
	});
	
	userMarker = new google.maps.Marker();
	//google.maps.event.addListener(myMap, "click", showUserMarker);
	showThisLocationMarker(thisLocationLat, thisLocationLng);
	
}



function showThisLocationMarker(lat, lng) {
	
	userMarker.setMap(null);
	userMarker.setPosition(new google.maps.LatLng(lat, lng));
	userMarker.setMap(myMap);
	//mapLocation.innerHTML = "";
	//mapLocation.innerHTML = "Latitud: " + lat + " - Longitud: " + lng;
	
}



function runMainMenu() {
	
	chooseDestinationMenu.style.display = presentDestinationMenu.style.display = busTimesMenu.style.display = filterDayMenu.style.display = "none";
	mainMenu.style.display = "block";
	togglePad(false);
	lastMenu = "Main Menu";
	selectedDay  = "Disabled";
	setCurrentTime();
	
}



function runChooseDestinationMenu() {
	
	mainMenu.style.display = presentDestinationMenu.style.display = busTimesMenu.style.display = filterDayMenu.style.display = "none";
	chooseDestinationMenu.style.display = "block";
	lastMenu = "Choose Destination";
	
	runPresentDay(0);
	togglePad(true);
	setDestinationTextBox.value = "";
	presentDestinationBtn.disabled = true;
	setCurrentTime();
	
}



function runPresentDestinationMenu() {
	
	mainMenu.style.display = chooseDestinationMenu.style.display = busTimesMenu.style.display = filterDayMenu.style.display = "none";
	presentDestinationMenu.style.display = "block";
	lastMenu = "Present Destination";
	chosenDestination.innerHTML = "Your selected destination: " + setDestinationTextBox.value;
	goalInfo[0].innerHTML = "";
	
	showMoreBtn[0].disabled = false;
	togglePad(false);
	firstTime = 0;
	lastTime = 0;
	lastTimeTab = 0;
	runPresentDay(0);
	getDestination(0);
	setCurrentTime();
	
}


function runBusTimesMenu(isArrival) {
	
	mainMenu.style.display = chooseDestinationMenu.style.display = presentDestinationMenu.style.display = filterDayMenu.style.display = "none";
	busTimesMenu.style.display = "block";
	busTimesLabel.innerHTML = lastMenu;
	goalInfo[1].innerHTML = "";
	
	showMoreBtn[1].disabled = false;
	firstTime = 0;
	lastTime = 0;
	lastTimeTab = 0;
	runPresentDay(1);
	getBusTimes(isArrival, 0);
	setCurrentTime();
	
}


function runLeavingTimesMenu() {
	
	lastMenu = "Check Bus Leaving Times";
	runBusTimesMenu(false);
	
}



function runArrivalTimesMenu() {
	
	lastMenu = "Check Bus Arrival Times";
	runBusTimesMenu(true);
	
}



function runFilterDayMenu() {
	
	mainMenu.style.display = chooseDestinationMenu.style.display = presentDestinationMenu.style.display = busTimesMenu.style.display = "none";
	filterDayMenu.style.display = "block";
	currentDayFilter.innerHTML = "The current selected day filter is: " + "<b>" + selectedDay + "</b>";
	togglePad(false);
	setCurrentTime();
	
}



function selectDay() {
	
	selectedDay  = this.value;
	returnFilterDayMenu();
	
}



function runPresentDay(i) {
	
	if (selectedDay !== "Disabled")
		presentDay[i].innerHTML = "--- Your selected day is " + selectedDay + " ---";
	else presentDay[i].innerHTML = "--- Today is " + getDay() + " ---";
	
}



function returnFilterDayMenu() {
	
	if (lastMenu === "Present Destination")
		runPresentDestinationMenu();
	else if (lastMenu === "Check Bus Leaving Times")
		runLeavingTimesMenu();
	else if (lastMenu === "Check Bus Arrival Times")
		runArrivalTimesMenu();
	else runMainMenu();
	
}



function runResetMap() {
	
	showThisLocationMarker(thisLocationLat, thisLocationLng);
	myMap.setCenter(myMapCenter);
	myMap.setZoom(myMapZoom);
	setCurrentTime();
	
}



function togglePad(show) {
	
	if (show) {
		map.style.width = "calc(30% - 10px)";
		keypad.style.display = "block";
	}
	else {
		map.style.width = "calc(70% - 10px)";
		keypad.style.display = "none";
	}
	
}



function getDay() {
	
	var d = new Date();
	switch (d.getDay()) {
		case 0:
			return "Sunday";
		case 1:
			return "Monday";
		case 2:
			return "Tuesday";
		case 3:
			return "Wednesday";
		case 4:
			return "Thursday";
		case 5:
			return "Friday";
		case 6:
			return "Saturday";
	}
	
}



function getSelectedDay() {
    
    switch (selectedDay) {
        case "Sunday":
            return 0;
        case "Monday":
            return 1;
        case "Tuesday":
            return 2;
        case "Wednesday":
            return 3;
        case "Thursday":
            return 4;
        case "Friday":
            return 5;
        case "Saturday":
            return 6;
        default:
			var date = new Date();
            return date.getDay();
    }
    
}



function clickKeypadLetterBtn() {
	
	if (presentDestinationBtn.disabled)
		setDestinationTextBox.value = this.value;
	else setDestinationTextBox.value += this.value;
	checkConfirmBtn();
	setCurrentTime();
	
	
}



function clickKeypadPresetBtn() {
	
	setDestinationTextBox.value = this.value;
	runPresentDestinationMenu();
	
}



function clickKeypadDelBtn() {
	
	if (presentDestinationBtn.disabled)
		clickKeypadResetBtn();
	else {
		val = setDestinationTextBox.value;
		val = val.substr(0, val.length-1);
		setDestinationTextBox.value = val;
	}
	checkConfirmBtn();
	setCurrentTime();
	
}



function clickKeypadResetBtn() {
	
	setDestinationTextBox.value = "";
	checkConfirmBtn();
	setCurrentTime();
	
}



function checkConfirmBtn() {
	
	if (setDestinationTextBox.value === "")
		presentDestinationBtn.disabled = true;
	else presentDestinationBtn.disabled = false;
	setCurrentTime();
	
}



function setCurrentTime() {
	
	var time = new Date();
	var hour = time.getHours();
	var minute = time.getMinutes();
	var currTime;
	
	for (var i=0; i<timeLabel.length; i++) {
		currTime = "";
        if (hour.toString().length === 1)
            currTime += "0";
        currTime += hour + ".";
        if (minute.toString().length === 1)
            currTime += "0";
        currTime += minute;
		timeLabel[i].innerHTML = "Current Time: " + currTime;
	}
	
}



/*function showUserMarker(e) {
	
	userMarker.setMap(null);
	userMarker.setPosition(e.latLng);
	userMarker.setMap(myMap);
	//mapLocation.innerHTML = "";
	mapLocation.innerHTML = "Latitud: " + e.latLng.lat() + " - Longitud: " + e.latLng.lng();
	
}*/