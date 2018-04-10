<?php
    
	// Create a connection with a database
	function createConnection() {   // Start createConnection
		
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
		
	}   // End createConnection
	
	
	
	// Login to a database
	function login($username, $password) {   // Start login
		
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
		$sql = $_SESSION["conn"]->query("SELECT 1 FROM users LIMIT 1");
		if ($sql === FALSE)	{										// It exists, so stop here
			echo "Could not access or find user accounts from the database. Please contact the website manager.<br>";
			return;
		}
		
		// Check if the user credentials matches a users entry within the database, try to retreive it 
		$sql = "SELECT * FROM users WHERE password = '$password' AND username = '$username' LIMIT 1";
		$result = $_SESSION["conn"]->query($sql);
		
		// Try fetch the data from the entry, if it is found an user exists, if not the users does not exist
		$user = $result->fetch_assoc();
		if (isset($user)) {
			$_SESSION["user"] = $user;
			echo "You have sucessfully logged in";
			header("Location:admin.php");
		}
		else echo "Your login credentials do not match. Please try again.<br>";
		
	}   // End login
	
	
	
	// Logout from a database
	function logout() {   // Start logout
		
		// Check if the connection with the database has been successful
		if ($_SESSION["successfulConn"] === false)
			return;
		
		// Unset and destroy the session, no login can be active anymore since the connection is stored in the session
		session_unset();
		session_destroy();
		echo "You are now logged off.";
		
	}   // End logout
	
	
	
	// Check if the articles table exists, and create one if not already
	function createArticlesTable($maxTitleLen, $maxCategoryLen, $maxSignatureLen) {   // Start createArticleTable
		
		// Check if the articles table exists
		$sql = $_SESSION["conn"]->query("SELECT 1 FROM articles LIMIT 1");
		if ($sql !== FALSE)											// It exists, so stop here
			return;
		
		// At this point, the table does not exist, so create one
		$sql = "CREATE TABLE articles (
			id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			title VARCHAR($maxTitleLen) NOT NULL,
			category VARCHAR($maxCategoryLen) NOT NULL,
			text TEXT NOT NULL,
			date TIMESTAMP NOT NULL,
			signature VARCHAR($maxSignatureLen) NOT NULL
		)";
		
		// Check if the table was created succesfully, it only serves to inform if it worked, there is no fix otherwise yet
		if ($_SESSION["conn"]->query($sql) === TRUE)
			echo "Articles table has been created successfully for the database<br>";
		else echo "Could not create the articles table for the database.<br>";
		
	}   // End createArticleTable
	
	
	
	// Adding an article into the articles table in the database
	function addArticle() {   // Start addArticle
		
		$maxTitleLen = 400;
		$maxCategoryLen = 100;
		$maxSignatureLen = 60;
		createArticlesTable($maxTitleLen, $maxSignatureLen, $maxSignatureLen);		// Check if the articles table exists before continuing
		
		// Store the text field results (through POST obtained) into proper variables
		$title = $_POST["title"];
		$category = $_POST["category"];
		$text = $_POST["text"];
		$signature = $_POST["signature"];
		
		// Check if each text field result contains at least one character, should at least one text field be empty then stop adding the article and show why
		if (strlen($title) === 0)
			echo "Article title is missing.<br>";
		if (strlen($title) >= $maxTitleLen)
				"Article title is too long.<br>";
		if (strlen($category) === 0)
			echo "Article category is missing.<br>";
		if (strlen($category) >= $maxCategoryLen)
			echo "Article category is too long.<br>";
		if (strlen($text) === 0)
			echo "Article content is missing.<br>";
		if (strlen($signature) === 0)
			echo "Signature or name of the author is missing.<br>";
		if (strlen($signature) >= $maxSignatureLen)
			echo "Signature or name of the author is too long.<br>";
		if (strlen($title) === 0 || strlen($title) >= $maxTitleLen || strlen($category) === 0 || strlen($category) >= $maxCategoryLen || strlen($text) === 0 || strlen($signature) === 0 || strlen($signature) >= $maxSignatureLen)
			return;
		
		// Add the article into the articles table in the database
		$sql = "INSERT INTO articles (title, category, text, signature) VALUES ('$title', '$category', '$text', '$signature')";
		
		// Check if the article was created succesfully, it only serves to inform if it worked, there is no fix otherwise yet
		if ($_SESSION["conn"]->query($sql) === TRUE)
			echo "New article record has been created successfully" . "<br>";
		else echo "Could not create an article record for the database.<br>";
		
		$_SESSION["conn"]->close();									// Close the connection
		
	}   // end addArticle
	
	
	
	// Show articles on the main page
	function showArticles() {   // Start showArticles
		
		// Check if the database connection has been successful before continuing
		if ($_SESSION["successfulConn"] === false) {
			echo "Could not display any articles. Could not connect to database.<br>";
			return;
		}
		
		// Check if the articles table exists before continuing
		$sql = $_SESSION["conn"]->query("SELECT 1 FROM articles LIMIT 1");
		if ($sql === FALSE)	{										// It does not exist, so stop here
			echo "Could not display any articles. Could not fetch articles from the database.<br>";
			return;
		}
		
		// Get all the information from an article, get all articles and display them in descending date order
		$sql = "SELECT title, category, text, date, signature FROM articles ORDER BY date DESC";
		$result = $_SESSION["conn"]->query($sql);
		
		// Go through each entry in the articles table in the database
		if ($result->num_rows > 0) {								// Current entry
			while ($row = $result->fetch_assoc()) {					// Output data of each row
				echo "<br><b>--- Article ---</b><br>" .
				"<b>Title:</b> " . $row["title"]. "<br>" .			// Display the title, category, text, date and signature
				"<b>Category:</b> " . $row["category"]. "<br>" .
				"<b>Date:</b> " . $row["date"]. "<br>" .
				"<b>Signature:</b> " . $row["signature"]. "<br>" .
				"<b>Content Text:</b><br>" . $row["text"]. "<br><br>";
			}
		}
		else echo "No results were found.";							// There are not articles created yet, so show that
		
		$result->close();											// Close the connection
		$_SESSION["conn"]->close();
		
	}   // End showArticles
	
	
	
	/* DEBUG ONLY */
	
	// Present preset login accounts for testing purposes to the user
	function showUserAccounts() {   // Start showUserAccounts
		
		// Check if the database connection has been successful before continuing
		if ($_SESSION["successfulConn"] === false) {
			echo "Could not display any user accounts. Could not connect to database.<br>";
			return;
		}
		
		// Just add a bunch of random users to add, should the user table empty, keep in mind to replace the users to add with every sucessful run
		/* addUser("user", "pass");
		addUser("username", "password");
		addUser("1", "1");
		addUser("Robert", "rh222ff");
		addUser("Robin", "rh222ff"); */
		
		// Check if the users table exists before continuing
		$sql = $_SESSION["conn"]->query("SELECT 1 FROM users LIMIT 1");
		if ($sql === FALSE)	{									// It does not exist, so stop here
			echo "Could not display any user accounts. Could not fetch user accounts from the database.<br>";
			return;
		}
		
		// Get all the information from an article, get all articles and display them in descending date order
		$sql = "SELECT username, password FROM users ORDER BY username DESC";
		$result = $_SESSION["conn"]->query($sql);
		
		// Go through each entry in the users table in the database
		echo "<br><b>---DEBUG--- List of Available Users ---DEBUG---</b><br>";
		if ($result->num_rows > 0) {										// Current entry
			while ($row = $result->fetch_assoc()) {							// Output data of each row
				echo "<b>Username:</b> " . $row["username"]. "<br>" .		// Display the username and password
				"<b>Password:</b> " . $row["password"]. "<br><br>";
			}
		}
		else echo "No results were found.";							// There are not articles created yet, so show that
		
		$result->close();											// Close the connection
		
	}   // End showUserAccounts
	
	
	
	// Check if the users table exists, and create one if not already
	function createUsersTable() {   // Start createUserTable
		
		// Check if the users table exists
		$sql = $_SESSION["conn"]->query("SELECT 1 FROM users LIMIT 1");
		if ($sql !== FALSE)											// It exists, so stop here
			return;
		
		// At this point, the table does not exist, so create one (a restriction includes that each username may only exists once)
		$sql = "CREATE TABLE users (
			id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			username VARCHAR(30) NOT NULL UNIQUE,
			password VARCHAR(30) NOT NULL
		)";
		
		// Check if the table was created succesfully, it only serves to inform if it worked, there is no fix otherwise yet
		if ($_SESSION["conn"]->query($sql) === TRUE)
			echo "Users table has been created successfully for the database<br>";
		else echo "Could not create the users table for the database.<br>";
		
	}   // End createUserTable
	
	
	
	// Adding an user into the users table in the database
	function addUser($username, $password) {   // Start addUser
		
		createUsersTable();											// Check if the articles table exists before continuing
		$sql = "INSERT INTO users (username, password) VALUES ('$username', '$password')";
		
		// Check if the user was created succesfully, it only serves to inform if it worked, there is no fix otherwise yet
		if ($_SESSION["conn"]->query($sql) === TRUE)
			echo "New user record has been created successfully" . "<br>";
		else echo "Could not create an user record for the database.<br>";
		
	}   // end addUser
    
?>