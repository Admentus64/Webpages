<?php
    
	// Create a connection with a database
	function createConnection() {   // Start Function: createConnection
		
		// Create the connection with a database, surpress the warning that might be given
		$_SESSION["conn"] = @new mysqli($GLOBALS["database"]["server"], $GLOBALS["database"]["user"], $GLOBALS["database"]["password"], $GLOBALS["database"]["name"]);
		
		// Check if the connection works
		if ($_SESSION["conn"]->connect_error) {
			session_unset();										// Unset the session, thus resetting all variables within the session
			$_SESSION["successfulConn"] = false;
			
			echo "Connecting to the database has failed.<br>";		// Since the warning is surpressed, print out a custom warning
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
		
		// Check if the users table exists
		$sql = $_SESSION["conn"]->query("SELECT 1 FROM mediaThesisUsers LIMIT 1");
		if ($sql === FALSE)	{										// It exists, so stop here
			echo "Could not access or find user accounts from the database. Please contact the website manager.<br>";
			return;
		}
		
		// Check if the user credentials matches a users entry within the database, try to retreive it 
		$sql = "SELECT * FROM mediaThesisUsers WHERE password = '$password' AND username = '$username' LIMIT 1";
		$result = $_SESSION["conn"]->query($sql);
		
		// Try fetch the data from the entry, if it is found an user exists, if not the users does not exist
		$user = $result->fetch_assoc();
		if (isset($user)) {
			$_SESSION["user"] = $user;
			$_SESSION["experiment"] = false;
			$_SESSION["message"] = "You have sucessfully logged in.";
			header("Location:logout.php");
		}
		else echo "Your login credentials do not match. Please try again.<br>";
		
	}   // End Function: login
	
	
	
	// Logout from a database
	function logout() {   // Start Function: logout
		
		// Check if the connection with the database has been successful
		if ($_SESSION["successfulConn"] === false)
			return;
		
		// Unset session variables which are no longer used since logging out. Message storing should still continue.
		unset($_SESSION["user"]);
		unset($_SESSION["conn"]);
		unset($_SESSION["successfulConn"]);
		unset($_SESSION["experiment"]);
		
		$_SESSION["message"] = "You are now logged off.";
		header("Location:index.php");
		
	}   // End Function: logout
	
	
	
	// Check if the users table exists, and create one if not already
	function createMediaThesisUsersTable() {   // Start Function: createUserTable
		
		// Check if the users table exists
		$sql = $_SESSION["conn"]->query("SELECT 1 FROM mediaThesisUsers LIMIT 1");
		if ($sql !== FALSE)											// It exists, so stop here
			return;
		
		// At this point, the table does not exist, so create one (a restriction includes that each username may only exists once)
		$sql = "CREATE TABLE mediaThesisUsers (
			id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			username VARCHAR(30) NOT NULL UNIQUE,
			password VARCHAR(30) NOT NULL,
			firstname VARCHAR(30) NOT NULL,
			lastname VARCHAR(30) NOT NULL,
			email VARCHAR(255) NOT NULL UNIQUE
		)";
		
		// Check if the table was created succesfully, it only serves to inform if it worked, there is no fix otherwise yet
		if ($_SESSION["conn"]->query($sql) === TRUE)
			echo "The media thesis users table has been created successfully" . "<br>";
		else echo "Could not create the media thesis users table" . "<br>";
		
	}   // End Function: createUserTable
	
	
	
	// Check if the users table exists, and create one if not already
	function createMediaThesisStatisticsTable() {   // Start Function: createUserTable
		
		// Check if the users table exists
		$sql = $_SESSION["conn"]->query("SELECT 1 FROM mediaThesisStatistics LIMIT 1");
		if ($sql !== FALSE)											// It exists, so stop here
			return;
		
		// At this point, the table does not exist, so create one (a restriction includes that each username may only exists once)
		$sql = "CREATE TABLE mediaThesisStatistics (
			id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			userId INT(10) UNSIGNED NOT NULL,
			preset VARCHAR(30) DEFAULT 'Default',
			rating INT(2) DEFAULT 0,
			points INT(10) DEFAULT 0,
			goodSets INT(10) DEFAULT 0,
			failedSets INT(10) DEFAULT 0,
			difficulty VARCHAR(15) DEFAULT 'Very Easy',
			finalDifficulty VARCHAR(15) DEFAULT 'Very Easy',
			timeHighest VARCHAR(5) DEFAULT '00:00',
			timePlayed VARCHAR(5) DEFAULT '00:00',
			timeStamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (userId) REFERENCES mediaThesisUsers(id)
		)";
		
		// Check if the table was created succesfully, it only serves to inform if it worked, there is no fix otherwise yet
		if ($_SESSION["conn"]->query($sql) === TRUE)
			echo "The media thesis statistics table has been created successfully" . "<br>";
		else echo "Could not create the media thesis statistics table" . "<br>";
		
	}   // End Function: createUserTable
	
	
	
	// Adding an user into the mediaThesisUsers table in the database
	function registerNewMemoryUser($username, $password, $firstname, $lastname, $email) {   // Start Function: addUser
		
		createMediaThesisUsersTable();											// Check if the memory users table exists before continuing
		createMediaThesisStatisticsTable();										// Check as well if the statistics table needs to be created
		$error = false;
		
		// Retrieve the user with the provided username from the database in order to check if it already exists
		$sql = "SELECT username FROM mediaThesisUsers WHERE username = '$username'";
		$result = $_SESSION["conn"]->query($sql);
		
		// If the user already exists then stop here. 
		if ($result->num_rows != 0) {
			echo "That user account already exists.<br>Choose a different username.<br>";
			return;
		}
		
		// Retrieve the user with the provided email from the database in order to check if it already exists
		$sql = "SELECT email FROM mediaThesisUsers WHERE email = '$email'";
		$result = $_SESSION["conn"]->query($sql);
		
		// If the user already exists then stop here. 
		if ($result->num_rows != 0) {
			echo "That email address already exists.<br>Choose a different email address.<br>";
			return;
		}
		
		if (!preg_match("/[A-Za-z0-9]{5,30}/", $username)) {
			echo "Your username has to be between 5 and 30 letters and/or digits.";
			return;
		}
		if (!preg_match("/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}/", $password)) {
			echo "Your password has to be between 8 and 30 characters and must contain at least one digit, one uppercase letter and one lowercase letter.";
			return;
		}
		if (!preg_match("/[A-Za-z]{2,30}/", $firstname)) {
			echo "Your first name has to be between 2 and 30 letters.";
			return;
		}
		if (!preg_match("/[A-Za-z]{2,30}/", $lastname)) {
			echo "Your last name has to be between 2 and 30 letters.";
			return;
		}
		if (!preg_match("/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/", $email)) {
			echo "Valid email address example: name@mail.com";
			return;
		}
		
		// Insert a new user into the database with the provided username and password
		$sql = "INSERT INTO mediaThesisUsers (username, password, firstname, lastname, email) VALUES ('$username', '$password', '$firstname', '$lastname', '$email')";
		
		// Check if the user was created succesfully, it only serves to inform if it worked, there is no fix otherwise yet
		if ($_SESSION["conn"]->query($sql) === TRUE) {
			echo "A new user account has been registered successfully";
			sendRegisterConfirmationEmail($username, $password, $firstname, $lastname, $email);
		}
		else echo "There was an error with registering a new user account.";
		
	}   // End Function: addUser
	
	
	
	// Delete an user from the mediaThesisUsers table in the database
	function deleteMemoryUser($username, $password) {   // Start Function: deleteMemoryUser
		
		createMediaThesisUsersTable();											// Check if the memory users table exists before continuing
		
		// Retrieve the user with the provided username from the database in order to check if it already exists
		$sql = "SELECT username, password FROM mediaThesisUsers WHERE username = '$username' AND password = '$password' LIMIT 1";
		$result = $_SESSION["conn"]->query($sql);
		
		// If the user does not exist then end here
		if ($result->num_rows === 0) {
			echo "That user account does not exist.<br>Make sure that the username and password are correct.";
			return;
		}
		
		// Delete the user from the database with the provided username and password
		$sql = "DELETE FROM mediaThesisUsers WHERE username = '$username' AND password = '$password'";
		
		// Check if the user was deleted succesfully, it only serves to inform if it worked, there is no fix otherwise yet
		if ($_SESSION["conn"]->query($sql) === TRUE)
			echo "The user account has been deleted successfully.";
		else echo "There was an error with deleting the user account.";
		
	} // End Function: deleteMemoryUser
	
	
	
	// Changing the user profile
	function changeUser($element, $value) {   // Start Function: changeUser
		
		if ($element === "username" && !preg_match("/[A-Za-z0-9]{5,30}/", $value)) {
			echo "Your username has to be between 5 and 30 letters and/or digits.";
			return;
		}
		if ($element === "password" && !preg_match("/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}/", $value)) {
			echo "Your password has to be between 8 and 30 characters and must contain at least one digit, one uppercase letter and one lowercase letter.";
			return;
		}
		if ($element === "firstname" && !preg_match("/[A-Za-z]{2,30}/", $value)) {
			echo "Your first name has to be between 2 and 30 letters.";
			return;
		}
		if ($element === "lastname" && !preg_match("/[A-Za-z]{2,30}/", $value)) {
			echo "Your last name has to be between 2 and 30 letters.";
			return;
		}
		if ($element === "email" && !preg_match("/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/", $value)) {
			echo "Valid email address example: name@mail.com";
			return;
		}
		
		
		// Change a part of the user from the database which matches the loged in username and password
		$sql = "UPDATE mediaThesisUsers SET $element = '$value' WHERE username = '{$_SESSION['user']['username']}' AND password = '{$_SESSION['user']['password']}'";
		
		// Check if the user was changed succesfully, it only serves to inform if it worked, there is no fix otherwise yet
		if ($_SESSION["conn"]->query($sql) === TRUE) {
			echo "Your $element has been changed successfully.";
			if ($element === "username")
				$_SESSION['user']['username'] = $value;
			if ($element === "password")
				$_SESSION['user']['password'] = $value;
			if ($element === "email")
				$_SESSION['user']['email'] = $value;
		}
		else echo "There was an error with changing your $element.";
		
	} // End Function: changeUser
	
	
	
	// Changing the name of the user profile
	function changeUserName($firstname, $lastname) {   // Start Function: changeUser
		
		// Change a part of the user from the database which matches the loged in username and password
		$sql = "UPDATE mediaThesisUsers SET firstname = '$firstname', lastname = '$lastname' WHERE username = '{$_SESSION['user']['username']}' AND password = '{$_SESSION['user']['password']}'";
		
		// Check if the user was changed succesfully, it only serves to inform if it worked, there is no fix otherwise yet
		if ($_SESSION["conn"]->query($sql) === TRUE) {
			echo "Your name has been changed successfully.";
			$_SESSION['user']['firstname'] = $firstname;
			$_SESSION['user']['lastname'] = $lastname;
		}
		else echo "There was an error with changing your name.";
		
	} // End Function: changeUser
    
?>