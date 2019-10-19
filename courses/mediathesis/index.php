<!DOCTYPE html>

<?php
	
	// Include required PHP files
	require "src/php/init.php";
	require "src/php/database.php";
	require "src/php/userInfo.php";
	
	if (isset($_SESSION["user"]))				// Redirect to the logout page if already logged in
		header("Location:logout.php");
	
?>

<html>
	
	<head>
		<meta charset="utf-8">
		<title>Media Thesis Project - Memory Game Mash-Up</title>
		<link rel="stylesheet" type="text/css" href="src/css/style.css">
		<link rel="stylesheet" type="text/css" href="src/css/styleAdmin.css">
	</head>
	
	<body>
		<div id="wrapper">
			
			<header>
				<h1>Media Thesis Project - Memory Game Mash-Up</h1>
			</header>
			
			<nav>
				<ul>
					<li><a href="index.php" id="thisPage">Login</a></li>
					<li><a href="register.php">Register</a></li>
				</ul>
			</nav>
			
			<main>
				<h1>Login Page</h1>
				
				<form method="post">
					<fieldset id="login">
						<legend>Login</legend>
						
						<label>Username:</label>
						<input type="text" name="login-username" value="" pattern="[A-Za-z0-9]{5,30}" required title="Your username has to be between 5 and 30 letters and/or digits.">
						
						<label>Password:</label>
						<input type="text" name="login-password" value="" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}" required title="Your password has to be between 8 and 30 characters and must contain at least one digit, one uppercase letter and one lowercase letter.">
						
						<input type="submit" value="Login" name="login">
					</fieldset>
				</form>
				
				<form method="post">
					<fieldset id="retrieve">
						<legend>Login Credentials Retrieval</legend>
						
						<label>Email Address:</label>
						<input type="email" name="retrieve-email" value="" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required title="Valid email address example: name@mail.com">
						
						<input type="submit" value="Login Credentials Retrieval" name="retrieve">
					</fieldset>
				</form>
				
				<fieldset id="system">
					<legend>System Messages</legend>
					<?php
						if (isset($_SESSION["message"])) {		// Display a message if there is a stored message to display, if so remove it from the storage and stop here
							echo $_SESSION["message"];
							unset($_SESSION["message"]);
							exit;
						}
						
						createConnection();							// Create a database connection
						
						if (isset($_POST["login"]))					// Logging in with an user account
							if ($_POST["login"] and $_SERVER["REQUEST_METHOD"] == "POST")
								login($_POST["login-username"], $_POST["login-password"]);
						
						if (isset($_POST["retrieve"]))					// Logging in with an user account
							if ($_POST["retrieve"] and $_SERVER["REQUEST_METHOD"] == "POST")
								checkIfEmailIsCorrect($_POST["retrieve-email"]);
						
						// Unset and destroy the session, no login can be active anymore since the connection is stored in the session
						if (!isset($_SESSION["user"])) {
							session_unset();
							session_destroy();
						}
					?>
				</fieldset>
				
				<br><br><br>
				
				<div id="instructions">
					<p>Please use the Google Chrome or Brave internet browser if you are having issues playing the game.</p>
					<p>Both these internet browsers offer the best support.</p>
				</div>
				
			</main>
			
		</div> <!-- End wrapper -->
	</body>

</html>

<?php
	
	function checkIfEmailIsCorrect($email) {
		
		// Retrieve the user with the provided username from the database in order to check if it already exists
		$sql = "SELECT * FROM mediaThesisUsers WHERE email = '$email' LIMIT 1";
		$result = $_SESSION["conn"]->query($sql);
		
		// If the user does not exist then end here
		if ($result->num_rows === 0) {
			echo "That email has not been registered.<br>Please select the same email address you registered with.";
			return;
		}
		
        $row = $result->fetch_assoc();
        $username = $row["username"];
        $password = $row["password"];
        $firstname = $row["firstname"];
        $lastname = $row["lastname"];
		
		sendRegisterConfirmationEmail($username, $password, $firstname, $lastname, $email);
        echo "Please check your email address.<br>Your account credentials have been re-sent.";
		
	}
	
?>