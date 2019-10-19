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
		
		<script type="text/javascript" src="src/jquery/jquery-3.4.0.js"></script>
		<script type="text/javascript" src="src/js/events/Event.js"></script>
		<script type="text/javascript" src="src/js/OverviewScript.js"></script>
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
					<li><a href="overview.php" id="thisPage">Overview</a></li>
					<li><a href="survey.php">Survey</a></li>
					<li><a href="account.php">Account</a></li>
				</ul>
			</nav>
			
			<main>
				<h1>Overview Page</h1>
				
				<fieldset id="system">
					<legend>System Messages</legend>
					<?php
						if (isset($_SESSION["message"])) {		// Display a message if there is a stored message to display, if so remove it from the storage and stop here
							echo $_SESSION["message"];
							unset($_SESSION["message"]);
							exit;
						}
					?>
				</fieldset>
				
				<div>
					<?php retrieveUserStatistics($_SESSION["user"]["id"]); ?>
				</div>
			</main>
		
		</div> <!-- End wrapper -->
	</body>

</html>