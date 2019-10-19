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
		<script type="text/javascript" src="src/js/Cookie.js"></script>
		<script type="text/javascript" src="src/js/ExperimentScript.js"></script>
	</head>
	
	<body>
		<div id="wrapper">
			
			<header>
				<h1>Media Thesis Project - Memory Game Mash-Up</h1>
			</header>
			
			<nav>
				<ul>
					<li><a href="logout.php">Logout</a></li>
					<li><a href="experiment.php" id="thisPage">Memory Game</a></li>
					<li><a href="overview.php">Overview</a></li>
					<li><a href="survey.php">Survey</a></li>
					<li><a href="account.php">Account</a></li>
				</ul>
			</nav>
			
			<main>
				<h1>Apply for the Memory Game Mash-Up Experiment</h1>
				
				<form method="post">
					<fieldset id="runTest">
						<legend>Run Test</legend>
						<input type="submit" value="Run Test" name="runTest">
						<br>
						<br>* There are 6 presets in total that will be ran.
						<br>* Please conclude them all.
						<br>* Google Chrome works the best.
					</fieldset>
				</form>
				
				<form method="post">
					<fieldset id="resetTest">
						<legend>Reset Test</legend>
						<input type="submit" value="Reset Test" name="resetTest">
						<br>
						<br>* Resets your personal saved progress.
						<br>* Lets you start from the first preset again.
					</fieldset>
				</form>
				
				<fieldset id="system">
					<legend>System Messages</legend>
					<?php
						if (isset($_SESSION["message"])) {			// Display a message if there is a stored message to display, if so remove it from the storage and stop here
							echo $_SESSION["message"];
							unset($_SESSION["message"]);
						}
						
						if (isset($_POST["runTest"]))				// Start running the test
							if ($_POST["runTest"] and $_SERVER["REQUEST_METHOD"] == "POST") {
								$_SESSION["experiment"] = 1;
								header("Location:game.php");
							}
					?>
				</fieldset>
				
				<div id="instructions">
					<p>Welcome to the Memory Game Mash-Up experiment! Please take your time go complete all six rounds.</p>
					<p>Each new round brings some changes to the gameplay and/or presentation.</p>
					
					<b>Rules</b>
					<ul>
						<li>Use to left mouse button to click on bricks in order to swap them</li>
						
						<li>If two equal bricks are swapped:</li>
						<ul>
							<li>You gain points (equal to the value of the set)</li>
							<li>You gain additional time</li>
							<li>Both bricks are removed</li>
						</ul>
						<li>If you empty a whole row of bricks:</li>
						<ul>
							<li>You gain a larger amount of additional time than usual</li>
							<li>All bricks reset</li>
							<li>The difficulty can increase</li>
						</ul>
						<li>A higher difficulty means:</li>
						<ul>
							<li>You played long enough to advance</li>
							<li>More bricks are added into the field</li>
							<!-- <li>Time additions will be smaller</li> -->
						</ul>
					</ul>
					
					<b>Please 'Run Test' to begin the game.</b>
				</div>
				
			</main>
			
		</div> <!-- End wrapper -->
	</body>

</html>