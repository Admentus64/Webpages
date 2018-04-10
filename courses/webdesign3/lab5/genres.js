// JavaScript Document



// ---------- Object game ----------
var genres = {
	
	// Local variables
	menu: null,														// Refer to the genre menu
	msg: null,														// Refer to the genre message
	file: null,														// Contains the filepath for the requested JSON file
	
	init: function(newOptions) {   // Initialize variables and events
		
		// Initialize the refered elements
		genres.menu = document.getElementById("genresMenu");
		genres.msg = document.getElementById("genresMessage");
		
		// Add new provided options
		if (arguments.length == 1)									// Check first if new options are provided
			for (var i=0; i<newOptions.length; i++)					// Add each new option
				genres.menu.appendChild(newOptions[i]);
		
		bubbleSort(genres.menu, 1);									// Sort each genre in alphabetic order
		genres.menu.selectedIndex = 0;								// Set menu to first option (default)
		addListener(genres.menu, "change", genres.choose);			// Add event for changing the menu option
		
	}, // End init
	
	choose: function() {   // Choose a new genre by opening a requested json file
		
		// Create an AJAX request
		var request = AJAXRequest();
		if (request == null)
			return;
		
		// Convert the chosen genre to lower case and use it to choose the file to open
		genres.file = "genre/" + this[this.selectedIndex].innerHTML + ".json".toLowerCase();
		this.selectedIndex = 0;										// Set menu to first option (default)
		
		request.open("GET", genres.file, true);						// Send request to the server
		request.send(null);											// Function to check status in the communication
		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200)
				genres.get(JSON.parse(request.responseText));		// Read JSON data and use it to get the genre
		};
		
	}, // End request
	
	get: function(json) {   // Interpret the provided JSON data when selecting a genre
		
		// Local variables
		var newOption;
		
		// Preforming checks before executing this fuction
		while (games.menu.length != 1)								// Keep emptying the course list as long it is not empty (except for default option)
			games.menu.removeChild(games.menu[games.menu.length-1]);
		
		// Add new options for the games menu
		for (var i=0; i<json.game.length; i++) {
			newOption = document.createElement("option");
			newOption.appendChild(document.createTextNode(json.game[i].title));
			games.menu.appendChild(newOption);
		}
		bubbleSort(games.menu, 1);									// Sort all game titles in alphabetic order
		
		// Enable games menu if disabled
		if (games.menu.disabled)
			games.menu.disabled = false;
		
		// Set messages for the genres and games menu
		genres.msg.innerHTML = "- " + json.genre;
		games.msg.innerHTML = "- Ej dataspel vald än";
		
		// Information table
		info.reset();												// Reset the information table before using it
		info.add("Katogori", json.genre);							// Add table rows with only the title (only genre is provided with text)
		info.add("Namn");
		info.add("Betyg");
		info.add("Utgivningsdatum");
		info.add("System");
		info.add("Utvecklare");
		info.add("Utgivare");
		info.add("Länk");
		
	}, // End get
	
}; // End object game