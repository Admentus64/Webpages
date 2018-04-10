// JavaScript Document



// ---------- Object Title ----------
var games = {
	
	// Local variables
	menu: null,														// Refer to the title menu
	msg: null,														// Refer to the title message
	
	init: function() {   // Initialize variables and events
		
		// Initialize the refered elements
		games.menu = document.getElementById("gamesMenu");
		games.msg = document.getElementById("gamesMessage");
		
		games.menu.disabled = true;
		games.menu.selectedIndex = 0;								// Set menu to first option (default)
		addListener(games.menu, "change", games.choose);			// Add event for changing the menu option
		
	}, // End init
	
	choose: function() {   // Opening and using a requested json file
		
		// Create an AJAX request
		var request = AJAXRequest();
		if (request == null)
			return;
		
		// Variables
		var title = this[this.selectedIndex].innerHTML;
		this.selectedIndex = 0;										// Set menu to first option (default)
		
		request.open("GET", genres.file, true);						// Send request to the server
		request.send(null);											// Function to check status in the communication
		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200)
				games.get(JSON.parse(request.responseText), title);	// Read JSON data and use it to get the title
		};
		
	}, // End request
	
	get: function(json, title) {   // Interpret the provided JSON data when selecting a title
		
		// Local variables		
		var nr;
		for (nr=0; nr<json.game.length; nr++)
			if (json.game[nr].title == title)
				break;
		
		games.msg.innerHTML = "- " + json.game[nr].title;			// Set message for the games menu
		
		// Information table
		info.reset();												// Reset the information table before using it
		info.add("Kategori", json.genre);							// Add all required information into the table
		info.add("Namn", json.game[nr].title);
		info.add("Betyg", json.game[nr].score);
		info.add("Utgivningsdatum", json.game[nr].release.calendar);
		info.add("System", json.game[nr].platforms);
		info.add("Utvecklare", json.game[nr].developers);
		info.add("Utgivare", json.game[nr].publishers);
		info.add("Länk", json.game[nr].link.info, json.game[nr].link.url);
		
	}, // End getSelect
	
}; // End object game