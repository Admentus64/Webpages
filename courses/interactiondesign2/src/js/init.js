var myMap;
var userMarker;
var thisLocationLat = 56.85510143563683;
var thisLocationLng = 14.83162946999073;
var myMapCenter = { lat: 56.86680353396585 , lng: 14.81008529663086 };
var myMapZoom = 14;

var mainMenu, chooseDestinationMenu, presentDestinationMenu, busTimesMenu, filterDayMenu;
var mainMenuBtn, resetMapBtn, showMoreBtn, filterDayBtn, dayBtn, returnFilterDayBtn;
var chooseDestinationBtn, presentDestinationBtn, leavingTimesBtn, arrivalTimesBtn;
var setDestinationTextBox, chosenDestination, currentBusStopLocation, presentDay, goalInfo, presentInfo, busTimesLabel, timeLabel;
var lastMenu, selectedDay, currentDayFilter;
var keypad, keypadLetterBtn, keypadPresetBtn, keypadDelBtn, keypadResetBtn;
var map;
var firstTime, lastTime, lastTimeTab, nextBus;



function init() {
	
	lastMenu = "";
	selectedDay = "Disabled";
	firstTime = 0;
	lastTime = 0;
	lastTimeTab = 1;
	nextBus = null;
	
	getElements();
	addListeners();
	
	initMap();
	runMainMenu();
	
}
addListener(window, "load", init);



function getElements() {
	
	mainMenu = document.getElementById("mainMenu");
	chooseDestinationMenu = document.getElementById("chooseDestinationMenu");
	presentDestinationMenu = document.getElementById("presentDestinationMenu");
    busTimesMenu = document.getElementById("busTimesMenu");
	filterDayMenu = document.getElementById("filterDayMenu");
	
	mainMenuBtn = document.getElementsByClassName("mainMenuBtn");
	resetMapBtn = document.getElementById("resetMapBtn");
	showMoreBtn = document.getElementsByClassName("showMoreBtn");
	filterDayBtn = document.getElementsByClassName("filterDayBtn");
	dayBtn = document.getElementsByClassName("dayBtn");
	returnFilterDayBtn = document.getElementsByClassName("returnFilterDayBtn");
	
	chooseDestinationBtn = document.getElementsByClassName("chooseDestinationBtn");
	presentDestinationBtn = document.getElementById("presentDestinationBtn");
    leavingTimesBtn = document.getElementById("leavingTimesBtn");
    arrivalTimesBtn = document.getElementById("arrivalTimesBtn");
	
	setDestinationTextBox = document.getElementById("setDestinationTextBox");
	chosenDestination = document.getElementById("chosenDestination");
	currentBusStopLocation = document.getElementById("currentBusStopLocation");
	presentDay = document.getElementsByClassName("presentDay");
	currentDayFilter = document.getElementById("currentDayFilter");
	goalInfo = document.getElementsByClassName("goalInfo");
	presentInfo = document.getElementsByClassName("presentInfo");
	busTimesLabel = document.getElementById("busTimesLabel");
	timeLabel = document.getElementsByClassName("timeLabel");
	
	map = document.getElementById("map");
	keypad = document.getElementById("keypad");
	keypadLetterBtn = document.getElementsByClassName("keypadLetterBtn");
	keypadPresetBtn = document.getElementsByClassName("keypadPresetBtn");
	keypadDelBtn = document.getElementById("keypadDelBtn");
	keypadResetBtn = document.getElementById("keypadResetBtn");
	
}



function addListeners() {
	
	var i;
	
	for (i=0; i<mainMenuBtn.length; i++)
		addListener(mainMenuBtn[i], "click", runMainMenu);
	for (i=0; i<filterDayBtn.length; i++)
		addListener(filterDayBtn[i], "click", runFilterDayMenu);
	for (i=0; i<dayBtn.length; i++)
		addListener(dayBtn[i], "click", selectDay);
	for (i=0; i<returnFilterDayBtn.length; i++)
		addListener(returnFilterDayBtn[i], "click", returnFilterDayMenu);
	for (i=0; i<chooseDestinationBtn.length; i++)
		addListener(chooseDestinationBtn[i], "click", runChooseDestinationMenu);
	
    addListener(resetMapBtn, "click", runResetMap);
	addListener(showMoreBtn[0], "click", showMoreDestinations);
	addListener(showMoreBtn[1], "click", showMoreBusLines);
    addListener(presentDestinationBtn, "click", runPresentDestinationMenu);
    addListener(leavingTimesBtn, "click", runLeavingTimesMenu);
    addListener(arrivalTimesBtn, "click", runArrivalTimesMenu);
    
	for (i=0; i<keypadLetterBtn.length; i++)
		addListener(keypadLetterBtn[i], "click", clickKeypadLetterBtn);
	for (i=0; i<keypadPresetBtn.length; i++)
		addListener(keypadPresetBtn[i], "click", clickKeypadPresetBtn);
	
	addListener(keypadDelBtn, "click", clickKeypadDelBtn);
	addListener(keypadResetBtn, "click", clickKeypadResetBtn);
	
}



function AJAXRequest() {
    
    if (XMLHttpRequest)
		return new XMLHttpRequest();
	else if (ActiveXObject)
		return new ActiveXObject("Microsoft.XMLHTTP");
	else {
		alert("Tyvärr inget stöd för AJAX, så listan kan inte läsas in");
		return false;
	}
    
}