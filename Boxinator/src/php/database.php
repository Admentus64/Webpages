<?php
	
	// Global Database variables
	$GLOBALS["database"]["server"]   = "localhost";								// Localhost
	$GLOBALS["database"]["name"]     = "boxinator";								// Fill in the name of your MySQL server
	$GLOBALS["database"]["user"]     = "root";									// Fill in the user of your MySQL server
	$GLOBALS["database"]["password"] = "";										// Fill in the password of your MySQL server
	$GLOBALS["database"]["table"]    = "Boxes";									// Fill in the name of the MySQL table to use
	
	
	// PHP Functions
	
	function connect() {   // Start Function: connect
		
		// Start a new session on every page
		session_start();
	
		// Create the connection with the server
		$_SESSION["conn"] = new mysqli($GLOBALS["database"]["server"], $GLOBALS["database"]["user"], $GLOBALS["database"]["password"]);
		
		// Check if the connection works
		if ($_SESSION["conn"]->connect_error) {
			session_unset();									    // Unset the session, thus resetting all variables within the session
			$_SESSION["successfulConn"] = false;                    // Keep track that the connection failed
			echo "Connection to server has failed" . "<br>";		// Inform the connection failed
		}
		else {
			$_SESSION["successfulConn"] = true;                     // Keep track that the connection succeeded
			echo "Successful server connection" . "<br>";           // Inform the connection succeeded
		}
		
		# Connect to database, or create it if it doesn't exist yet
		if ($_SESSION["successfulConn"]) {
			$_SESSION["conn"]->select_db($GLOBALS["database"]["name"]);
			if ($_SESSION["conn"]->select_db($GLOBALS["database"]["name"]) === false)
				createDatabase();
			else echo "Successful database connection" . "<br>";
		}
		
		// Create the table if it doesn't exist yet
		createTable();
		
	} // End Function: connect
	
	
	
	function createDatabase() {   // Start Function: createdatabase
		
		// Create the database if it doesn't exist yet
		$sql = "CREATE DATABASE IF NOT EXISTS {$GLOBALS['database']['name']}";
		if ($_SESSION["conn"]->query($sql) === TRUE)
			echo "Database was created successfully" . "<br>";
		else echo "Error creating database: " . $_SESSION["conn"]->error;
		
	} // End Function: createDatabase
	
	
	
	// Check if the table exists, and create one if not already
	function createTable() {   // Start Function: createTable
		
		// Check if the table exists
		$sql = $_SESSION["conn"]->query("SELECT 1 FROM {$GLOBALS['database']['table']} LIMIT 1");
		if ($sql !== FALSE)											// It exists, so stop here
			return;
		
		// At this point, the table does not exist, so create one
		$sql = "CREATE TABLE {$GLOBALS['database']['table']} (
			id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			receiver VARCHAR(30) NOT NULL,
			weight DECIMAL(10,2) UNSIGNED NOT NULL,
			box_colour VARCHAR(7) NOT NULL,
			country VARCHAR(10) NOT NULL,
			multiplier DECIMAL(2,1) UNSIGNED NOT NULL,
			shipping_cost DECIMAL(10,2) UNSIGNED NOT NULL
		)";
		
		// Check if the table was created succesfully, it only serves to inform if it worked, there is no fix otherwise yet
		if ($_SESSION["conn"]->query($sql) === TRUE)
			echo "Boxinator table was created successfully" . "<br>";
		else echo "Boxinator table could not be created" . "<br>";
		
	}   // End Function: createTable
    
?>