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
					<li><a href="logout.php" id="thisPage">Logout</a></li>
					<li><a href="experiment.php">Memory Game</a></li>
					<li><a href="overview.php">Overview</a></li>
					<li><a href="survey.php">Survey</a></li>
					<li><a href="account.php">Account</a></li>
				</ul>
			</nav>
			
			<main>
				<h1>Logout Page</h1>
				
				<form method="post">
					<fieldset id="logout">
						<legend>Logout</legend>
						<input type="submit" value="Logout" name="logout">
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
						
						if (isset($_POST["logout"]))			// Logging out
							if ($_POST["logout"] and $_SERVER["REQUEST_METHOD"] == "POST")
								logout();
					?>
				</fieldset>
				
			</main>
			
		</div> <!-- End wrapper -->
	</body>

</html>