<?php
	
	// Start a new session on every page
	session_start();
	
    // Database variables
	//$GLOBALS["database"]["server"] = "";									// Fill in the web address of your MySQL server
	$GLOBALS["database"]["server"] = "";										// Localhost
	$GLOBALS["database"]["name"] = "";											// Fill in the name of your MySQL server
	$GLOBALS["database"]["user"] = "";											// Fill in the user of your MySQL server
	$GLOBALS["database"]["password"] = "";										// Fill in the password of your MySQL server
	$GLOBALS["database"]["email"] = "";							// Fill in one of your email address where reponses should be directed to
    
	$GLOBALS["database"]["statisticsTable"] = "mediaThesisStatistics2";					// Fill in the name of the MySQL table to use for storing statistics
	
	/*
	 * Two MySQL tables are required for this project:
	 * - One for storing users
	 * - One for storing user statistics
	 * - Both tables can be assigned with any name you like
	 * The code should automatically create both tables if they do not exist yet when being called upon to use.
	 * Table specifications are included with the code generation of both tables.
	 */
	
	
	
	// Create a connection with a database
	function createConnection() {   // Start Function: createConnection
		
		// Create the connection with a database, surpress the warning that might be given
		$_SESSION["conn"] = @new mysqli($GLOBALS["database"]["server"], $GLOBALS["database"]["user"], $GLOBALS["database"]["password"], $GLOBALS["database"]["name"]);
		
		// Check if the connection works
		if ($_SESSION["conn"]->connect_error) {
			session_unset();										// Unset the session, thus resetting all variables within the session
			$_SESSION["successfulConn"] = false;
			
			echo "Failed to connect to the database.";				// Since the warning is surpressed, print out a custom warning
		}
		else $_SESSION["successfulConn"] = true;
		
	}   // End Function: createConnection
	
	
	
	// Check if the users table exists, and create one if not already
	function createMediaThesisStatisticsTable() {   // Start Function: createUserTable
		
		// Check if the users table exists
		$sql = $_SESSION["conn"]->query("SELECT 1 FROM {$GLOBALS['database']['statisticsTable']} LIMIT 1");
		if ($sql !== FALSE)											// It exists, so stop here
			return;
		
		// At this point, the table does not exist, so create one (a restriction includes that each username may only exists once)
		$sql = "CREATE TABLE {$GLOBALS['database']['statisticsTable']} (
			id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			userId INT(10) UNSIGNED NOT NULL,
			preset VARCHAR(20) DEFAULT 'Default',
			rating INT(2) DEFAULT 0,
			points INT(10) DEFAULT 0,
			highestFace INT(2) DEFAULT 0,
			usedSkips INT(5) DEFAULT 0,
			maxSkips INT(5) DEFAULT 0,
			goodSets INT(10) DEFAULT 0,
			badSets INT(10) DEFAULT 0,
			fieldClears INT(10) DEFAULT 0,
			level INT(2) DEFAULT 1,
			pauses INT(10) DEFAULT 0,
			shortClock VARCHAR(5) DEFAULT '00:00',
			longClock VARCHAR(5) DEFAULT '00:00',
			timePlayed VARCHAR(5) DEFAULT '00:00',
			timeStamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			ip VARCHAR(39) NOT NULL
		)";
		
		// Check if the table was created succesfully, it only serves to inform if it worked, there is no fix otherwise yet
		if ($_SESSION["conn"]->query($sql) === TRUE)
			echo "The media thesis statistics table has been created successfully.";
		else echo "Could not create the media thesis statistics table.";
		
	}   // End Function: createUserTable
	
	
	
	// Get the client's IP address
	function getClientIP() {   // Start Function: getClientIp
		if (getenv("HTTP_CLIENT_IP"))
			return getenv("HTTP_CLIENT_IP");
		if (getenv("HTTP_X_FORWARDED_FOR"))
			return getenv("HTTP_X_FORWARDED_FOR");
		if (getenv("HTTP_X_FORWARDED"))
			return getenv("HTTP_X_FORWARDED");
		if (getenv("HTTP_FORWARDED_FOR"))
			return getenv("HTTP_FORWARDED_FOR");
		if (getenv("HTTP_FORWARDED"))
			return getenv("HTTP_FORWARDED");
		if (getenv("REMOTE_ADDR"))
			return getenv("REMOTE_ADDR");
		return "UNKNOWN";
	} // End Function: getClientIp
    
?>