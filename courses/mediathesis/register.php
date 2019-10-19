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
					<li><a href="index.php">Login</a></li>
					<li><a href="register.php" id="thisPage">Register</a></li>
				</ul>
			</nav>
			
			<main>
				<h1>Account Register Page</h1>
				
				<form method="post">
					<fieldset id="register">
						<legend>Register New User Account</legend>
						
						<label>Username:</label>
						<input type="text" name="register-username" value="" pattern="[A-Za-z0-9]{5,30}" required title="Your username has to be between 5 and 30 letters and/or digits.">
						* The username must be unique for each user.
						
						<label>Password:</label>
						<input type="text" name="register-password" value="" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}"
						required title="Your password has to be between 8 and 30 characters and must contain at least one digit, one uppercase letter and one lowercase letter.">
						* Multiple users may have the same password.
						
						<label>First Name:</label>
						<input type="text" name="register-firstname" value="" pattern="[A-Za-z]{2,30}" required title="Your first name has to be between 2 and 30 letters.">
						* If you value your privacy, you can use a fake name.
						
						<label>Last Name:</label>
						<input type="text" name="register-lastname" value="" pattern="[A-Za-z]{2,30}" required title="Your last name has to be between 2 and 30 letters.">
						* If you value your privacy, you can use a fake name.
						
						<label>Email Address:</label>
						<input type="email" name="register-email" value="" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required title="Valid email address example: name@mail.com">
						* If you value your privacy, you can use a temporary email.<br>
						* You can not be contacted and retrieve a lost account.<br>
						* Example: <a href="https://10minutemail.com/10MinuteMail/index.html" target="_blank">10 Minute Mail</a>
						
						
						<input type="submit" value="Register" name="register">
					</fieldset>
				</form>
				
				<fieldset id="system">
					<legend>System Messages</legend>
					<?php
						createConnection();							// Create a database connection
						if (isset($_SESSION["user"]))				// Redirect to the logout page if already logged in
							header("Location:logout.php");
						
						if (isset($_POST["register"]))				// Registering a new user
							if ($_POST["register"] and $_SERVER["REQUEST_METHOD"] == "POST")
								registerNewMemoryUser($_POST["register-username"], $_POST["register-password"], $_POST["register-firstname"], $_POST["register-lastname"], $_POST["register-email"]);
					?>
				</fieldset>
				
			</main>
			
		</div> <!-- End wrapper -->
	</body>

</html>