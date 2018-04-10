<!DOCTYPE html>

<?php
	
	// Include required PHP files
	require "src/php/database.php";
	require "src/php/init.php";
	require "src/php/userInfo.php";
	
	// Establish a connection with the logged user from the database, but if no user is being logged in then force the login page
	createConnection();
	if (!isset($_SESSION["user"]))
		header("Location:index.php");
	
?>

<html>
	
	<head>
		<meta charset="utf-8">
		<title>1ME326, Kursprojekt - Memory Game</title>
		<link rel="stylesheet" type="text/css" href="src/css/style.css">
		<link rel="stylesheet" type="text/css" href="src/css/styleAdmin.css">
		<script type="text/javascript" src="src/jquery/jquery-1.12.3.js"></script>
		<script type="text/javascript" src="src/js/events/Event.js"></script>
		<script type="text/javascript" src="src/js/OverviewScript.js"></script>
	</head>
	
	<body>
		<div id="wrapper">
			
			<header>
				<h1>1ME326, Kursprojekt - Memory Game</h1>
			</header>
			
			<nav>
			    <ul>
					<li><a href="logout.php">Logout</a></li>
					<li><a href="game.php">Memory Game</a></li>
					<li><a href="overview.php" id="thisPage">Overview</a></li>
				</ul>
			</nav>
			
			<main <?php echo getBackgroundColorStyle($_SESSION["username"], $_SESSION["password"])?>>
				<h1>Overview Page</h1>
				
				<form method="post">
					<fieldset id="settings">
						<legend>Settings</legend>
						
						<p>Reset Your Statistics to Zero</p>
						<div>
						<input type="submit" value="Reset Score" name="resetScore" class="overviewBtn">
						</div>
						
						<p>Difficulty</p>
						<select id="difficultyMenu" name="difficulty" data-val="<?php echo getDifficulty($_SESSION["username"], $_SESSION["password"])?>">
							<option value="Custom">Custom</option>
							<option value="Very Easy">Very Easy</option>
							<option value="Easy">Easy</option>
							<option value="Medium">Medium</option>
							<option value="Hard">Hard</option>
							<option value="Very Hard">Very Hard</option>
						</select>
						<input type="submit" value="Set Difficulty" name="setDifficulty" class="overviewBtn">
						
						<p>Select Your Favorite Color</p>
						<input type="color" name="backgroundColor" value="<?php echo getBackgroundColor($_SESSION["username"], $_SESSION["password"])?>">
						<input type="submit" value="Set Background Color" name="setBackgroundColor" class="overviewBtn">
						
					</fieldset>
					
					<fieldset>
						<legend>Custom Difficulty Settings</legend>
						
						<p id="customDifficultyMessage"></p>
						
						<p>Amount of Memory Cards</p>
						<select id="amountOfMemoryCardsMenu" name="amountOfMemoryCards" data-val="<?php echo getAmountOfMemoryCards($_SESSION["username"], $_SESSION["password"])?>">
							<option value="16">4x4</option>
							<option value="20">5x4</option>
							<option value="24">6x4</option>
							<option value="30">6x5</option>
							<option value="36">6x6</option>
						</select>
						
						<p>Time Limit</p>
						<select id="timeLimitMenu" name="timeLimit" data-val="<?php echo getTimeLimit($_SESSION["username"], $_SESSION["password"])?>">
							<option value="0">Unlimited</option>
							<option value="1">1 Minute</option>
							<option value="2">2 Minutes</option>
							<option value="3">3 Minutes</option>
							<option value="4">4 Minutes</option>
							<option value="5">5 Minutes</option>
							<option value="6">6 Minutes</option>
							<option value="7">7 Minutes</option>
							<option value="8">8 Minutes</option>
							<option value="9">9 Minutes</option>
							<option value="10">10 Minutes</option>
						</select>
						
						<input id="setCustomDifficulty"type="submit" value="Set Difficulty Settings" name="setCustomDifficulty" class="overviewBtn">
						
					</fieldset>
				</form>
				
				<div id="userInfo">
					<p>Total Points:<span id="totalPointsInfo"><?php echo getUserInfoElement("totalPoints", $_SESSION["username"], $_SESSION["password"])?></span></p>
					<p>Number of Games:<span id="gamesCountInfo"><?php echo getUserInfoElement("gamesCount", $_SESSION["username"], $_SESSION["password"])?></span></p>
					<p>Average Points:<span id="averagePointsInfo"><?php echo getUserInfoElement("averagePoints", $_SESSION["username"], $_SESSION["password"])?></span></p>
				</div>
				
				<fieldset id="system">
					<legend>System Messages</legend>
					<?php
						if (isset($_SESSION["sqlMessage"])) {		// Display a message if there is a stored message to display, if so remove it from the storage and stop here
							echo $_SESSION["sqlMessage"];
							unset($_SESSION["sqlMessage"]);
							exit;
						}
						
						if (isset($_POST["resetScore"]))			// Resetting the score
							if ($_POST["resetScore"] and $_SERVER["REQUEST_METHOD"] == "POST")
								resetScore($_SESSION["username"], $_SESSION["password"]);
						
						if (isset($_POST["setCustomDifficulty"]))	// Setting a time limit and the amount of memory cards when using the Custom difficulty
							if ($_POST["setCustomDifficulty"] and $_SERVER["REQUEST_METHOD"] == "POST")
								setCustomDifficulty($_SESSION["username"], $_SESSION["password"], $_POST["amountOfMemoryCards"], $_POST["timeLimit"]);
						
						if (isset($_POST["setDifficulty"]))			// Setting the difficulty
							if ($_POST["setDifficulty"] and $_SERVER["REQUEST_METHOD"] == "POST")
								setDifficulty($_SESSION["username"], $_SESSION["password"], $_POST["difficulty"]);
						
						if (isset($_POST["setBackgroundColor"]))	// Setting the background color
							if ($_POST["setBackgroundColor"] and $_SERVER["REQUEST_METHOD"] == "POST")
								setBackgroundColor($_SESSION["username"], $_SESSION["password"], $_POST["backgroundColor"]);
					?>
				</fieldset>
			</main>
		
		</div> <!-- End wrapper -->
	</body>

</html>