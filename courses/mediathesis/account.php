<!DOCTYPE html>

<?php
	
	// Include required PHP files
	require "src/php/init.php";
	require "src/php/database.php";
	require "src/php/userInfo.php";
	
	// Establish a connection with the logged user from the database, but if no user is being logged in then force the login page
	createConnection();
	if (!isset($_SESSION["user"]))
		header("Location:index.php");
	
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
					<li><a href="logout.php">Logout</a></li>
					<li><a href="experiment.php">Memory Game</a></li>
					<li><a href="overview.php">Overview</a></li>
					<li><a href="survey.php">Survey</a></li>
					<li><a href="account.php" id="thisPage">Account</a></li>
				</ul>
			</nav>
			
			<main>
				<h1>Account Page</h1>
				
				<div id="account">
					<form method="post">
						<fieldset id="change-username">
							<legend>Change Your Username</legend>
							
							<label>Username:</label>
							<input type="text" name="change-username" value="" pattern="[A-Za-z0-9]{5,30}" required title="Your username has to be between 5 and 30 letters and/or digits.">
							
							<input type="submit" value="Change Username" name="set-username">
							</fieldset>
					</form>
					
					<form method="post">
						<fieldset id="change-password">
							<legend>Change Your Password</legend>
							
							<label>Password:</label>
							<input type="text" name="change-password" value="" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}"
							required title="Your password has to be between 8 and 30 characters and must contain at least one digit, one uppercase letter and one lowercase letter.">
							
							<input type="submit" value="Change Password" name="set-password">
							</fieldset>
					</form>
					
					<form method="post">
						<fieldset id="change-email">
							<legend>Change Your Email Address</legend>
							
							<label>Email Address:</label>
							<input type="text" name="change-email" value="" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required title="Valid email address example: name@mail.com">
							
							<input type="submit" value="Change Email Address" name="set-email">
							</fieldset>
					</form>
					
					<form method="post">
						<fieldset id="change-name">
							<legend>Change Your Name</legend>
							
							<label>First Name:</label>
							<input type="text" name="change-firstname" value="" pattern="[A-Za-z]{2,30}" required title="Your first name has to be between 2 and 30 letters.">
							
							<label>Last Name:</label>
							<input type="text" name="change-lastname" value="" pattern="[A-Za-z]{2,30}" required title="Your last name has to be between 2 and 30 letters.">
							
							<input type="submit" value="Change Name" name="set-name">
							</fieldset>
					</form>
				</div>
				
				<fieldset id="system">
					<legend>System Messages</legend>
					<?php
						if (isset($_SESSION["message"])) {		// Display a message if there is a stored message to display, if so remove it from the storage and stop here
							echo $_SESSION["message"];
							unset($_SESSION["message"]);
							exit;
						}
						
						if (isset($_POST["set-username"]))			// Changing Username
							if ($_POST["set-username"] and $_SERVER["REQUEST_METHOD"] == "POST")
								changeUser("username", $_POST["change-username"]);
						
						if (isset($_POST["set-password"]))			// Changing Password
							if ($_POST["set-password"] and $_SERVER["REQUEST_METHOD"] == "POST")
								changeUser("password", $_POST["change-password"]);
						
						if (isset($_POST["set-email"]))				// Changing Email
							if ($_POST["set-email"] and $_SERVER["REQUEST_METHOD"] == "POST")
								changeUser("email", $_POST["change-email"]);
						
						if (isset($_POST["set-name"]))				// Changing Name
							if ($_POST["set-name"] and $_SERVER["REQUEST_METHOD"] == "POST")
								changeUserName($_POST["change-firstname"], $_POST["change-lastname"]);
					?>
				</fieldset>
				
			</main>
			
		</div> <!-- End wrapper -->
	</body>

</html>