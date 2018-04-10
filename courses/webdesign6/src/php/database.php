<?php
    
	// Create a connection with a database
	function createConnection() {   // Start Function: createConnection
		
		// Create the connection with a database, surpress the warning that might be given
		$_SESSION["conn"] = @new mysqli($GLOBALS["database"]["server"], $GLOBALS["database"]["user"], $GLOBALS["database"]["password"], $GLOBALS["database"]["name"]);
		
		// Check if the connection works
		if ($_SESSION["conn"]->connect_error) {
			session_unset();										// Unset the session, thus resetting all variables within the session
			$_SESSION["successfulConn"] = false;
			
			echo "Connecting with the database has failed.<br>";	// Since the warning is surpressed, print out a custom warning
			echo "Please check if the database credentials are correct:<br><br>";
			echo "Database Server Address: " . $GLOBALS["database"]["server"] . "<br>";
			echo "Database Login Username: " . $GLOBALS["database"]["user"] . "<br>";
			echo "Database Login Password: " . $GLOBALS["database"]["password"] . "<br>";
			echo "Database Name: " . $GLOBALS["database"]["name"] . "<br><br>";
		}
		else $_SESSION["successfulConn"] = true;
		
	}   // End Function: createConnection
	
	
	
	// Login to a database
	function login($username, $password) {   // Start Function: login
		
		// Check if the database connection has been successful before continuing
		if ($_SESSION["successfulConn"] === false) {
			echo "Could not login. Could not connect to database.<br>";
			return;
		}
		
		// Check first if user credentials were provided, otherwise just stop here
		if (!isset($username) || !isset($password)) {
			"No login credentials were provided. Please try again.";
			return;
		}
		
		// Check if the users table exists
		$sql = $_SESSION["conn"]->query("SELECT 1 FROM memoryUsers LIMIT 1");
		if ($sql === FALSE)	{										// It exists, so stop here
			echo "Could not access or find user accounts from the database. Please contact the website manager.<br>";
			return;
		}
		
		// Check if the user credentials matches a users entry within the database, try to retreive it 
		$sql = "SELECT * FROM memoryUsers WHERE password = '$password' AND username = '$username' LIMIT 1";
		$result = $_SESSION["conn"]->query($sql);
		
		// Try fetch the data from the entry, if it is found an user exists, if not the users does not exist
		$user = $result->fetch_assoc();
		if (isset($user)) {
			$_SESSION["user"] = $user;
			$_SESSION["username"] = $username;
			$_SESSION["password"] = $password;
			echo "You have sucessfully logged in";
			header("Location:logout.php");
		}
		else echo "Your login credentials do not match. Please try again.<br>";
		
	}   // End Function: login
	
	
	
	// Logout from a database
	function logout() {   // Start Function: logout
		
		// Check if the connection with the database has been successful
		if ($_SESSION["successfulConn"] === false)
			return;
		
		// Unset and destroy the session, no login can be active anymore since the connection is stored in the session
		session_unset();
		session_destroy();
		echo "You are now logged off.";
		
	}   // End Function: logout
	
	
	
	// Present preset login accounts for testing purposes to the user, for DEBUG ONLY
	function showUserAccounts() {   // Start Function: showUserAccounts
		
		// Check if the database connection has been successful before continuing
		if ($_SESSION["successfulConn"] === false) {
			echo "Could not display any memory user accounts. Could not connect to database.<br>";
			return;
		}
		
		// Check if the users table exists before continuing
		$sql = $_SESSION["conn"]->query("SELECT 1 FROM memoryUsers LIMIT 1");
		if ($sql === FALSE)	{									// It does not exist, so stop here
			echo "Could not display any memory user accounts. Could not fetch user accounts from the database.<br>";
			return;
		}
		
		// Get all the information from an article, get all articles and display them in descending date order
		$sql = "SELECT username, password FROM memoryUsers ORDER BY username DESC";
		$result = $_SESSION["conn"]->query($sql);
		
		// Go through each entry in the users table in the database
		echo "<br><b>List of Available Users</b><br><br>";
		if ($result->num_rows > 0) {										// Current entry
			while ($row = $result->fetch_assoc()) {							// Output data of each row
				echo "<b>Username:</b> " . $row["username"]. "<br>" .		// Display the username and password
				"<b>Password:</b> " . $row["password"]. "<br><br>";
			}
		}
		else echo "No results were found.";							// There are not articles created yet, so show that
		
		$result->close();											// Close the connection
		
	}   // End Function: showUserAccounts
	
	
	
	// Check if the users table exists, and create one if not already
	function createMemoryUsersTable() {   // Start Function: createUserTable
		
		// Check if the users table exists
		$sql = $_SESSION["conn"]->query("SELECT 1 FROM memoryUsers LIMIT 1");
		if ($sql !== FALSE)											// It exists, so stop here
			return;
		
		// At this point, the table does not exist, so create one (a restriction includes that each username may only exists once)
		$sql = "CREATE TABLE memoryUsers (
			id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			username VARCHAR(30) NOT NULL UNIQUE,
			password VARCHAR(30) NOT NULL,
			totalPoints INT(10) DEFAULT 0,
			gamesCount INT(10) DEFAULT 0,
			averagePoints INT(10) DEFAULT 0,
			amountOfMemoryCards INT(3) DEFAULT 16,
			timeLimit INT(2) DEFAULT 0,
			difficulty VARCHAR(15) DEFAULT 'Medium',
			backgroundColor VARCHAR(10) DEFAULT '#ffa500'
		)";
		
		// Check if the table was created succesfully, it only serves to inform if it worked, there is no fix otherwise yet
		if ($_SESSION["conn"]->query($sql) === TRUE)
			echo "The memory users table has been created successfully" . "<br>";
		else echo "Could not create the memory users table" . "<br>";
		
	}   // End Function: createUserTable
	
	
	
	// Adding an user into the memoryUsers table in the database
	function registerNewMemoryUser($username, $password) {   // Start Function: addUser
		
		createMemoryUsersTable();											// Check if the memory users table exists before continuing
		
		// Retrieve the user with the provided username from the database in order to check if it already exists
		$sql = "SELECT username FROM memoryUsers WHERE username = '$username'";
		$result = $_SESSION["conn"]->query($sql);
		
		// If the user already exists then stop here
		if ($result->num_rows != 0) {
			echo "That user account already exists<br>Choose a different username";
			return;
		}
		
		// Insert a new user into the database with the provided username and password
		$sql = "INSERT INTO memoryUsers (username, password) VALUES ('$username', '$password')";
		
		// Check if the user was created succesfully, it only serves to inform if it worked, there is no fix otherwise yet
		if ($_SESSION["conn"]->query($sql) === TRUE)
			echo "A new user account has been registered successfully" . "<br>";
		else echo "There was an error with registering a new user account";
		
	}   // End Function: addUser
	
	
	
	// Delete an user from the memoryUsers table in the database
	function deleteMemoryUser($username, $password) {   // Start Function: deleteMemoryUser
		
		createMemoryUsersTable();											// Check if the memory users table exists before continuing
		
		// Retrieve the user with the provided username from the database in order to check if it already exists
		$sql = "SELECT username, password FROM memoryUsers WHERE username = '$username' AND password = '$password' LIMIT 1";
		$result = $_SESSION["conn"]->query($sql);
		
		// If the user does not exist then end here
		if ($result->num_rows === 0) {
			echo "That user account does not exist<br>Make sure that the username and password are correct";
			return;
		}
		
		// Delete the user from the database with the provided username and password
		$sql = "DELETE FROM memoryUsers WHERE username = '$username' AND password = '$password'";
		
		// Check if the user was deleted succesfully, it only serves to inform if it worked, there is no fix otherwise yet
		if ($_SESSION["conn"]->query($sql) === TRUE)
			echo "The user account has been deleted successfully" . "<br>";
		else echo "There was an error with deleting the user account<br>";
		
	} // End Function: deleteMemoryUser
    
?>