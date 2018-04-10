// ...
window.onload = function() {
	var REFRESH_RATE = 1000;
	var SCRIPT_LOCATION = "./src/php/getTime.php";
	var target = document.getElementById("page-content-paragraph-wrapper");
	setInterval(function() {
		var xhr = new XMLHttpRequest();
			xhr.addEventListener("load", onDataLoaded);
			xhr.open("GET", SCRIPT_LOCATION);
			xhr.send();
	}, REFRESH_RATE);

	function onDataLoaded(event) {
		target.innerHTML = event.target.responseText;
	}
};