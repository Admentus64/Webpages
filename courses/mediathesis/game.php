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
	
	if ($_SESSION["experiment"] < 1) {
		$_SESSION["message"] = "You have aborted the experiment.<br>Please restart it.";
		header("Location:experiment.php");
	}
	$_SESSION["experiment"] = 0;
	
?>

<html>

	<head>
		<meta charset="UTF-8">
		<title>Media Thesis Project - Memory Game Mash-Up</title>
		<link rel="stylesheet" type="text/css" href="src/css/style.css">
		<link rel="stylesheet" type="text/css" href="src/css/styleGame.css">
		<link rel="stylesheet" type="text/css" href="src/css/timerApplication.css">
		
		<script type="text/javascript" src="src/jquery/jquery-3.4.0.js"></script>
		<script type="text/javascript" src="src/js/events/Event.js"></script>
		
		<script type="text/javascript" src="src/js/Application.js"></script>
		<script type="text/javascript" src="src/js/TimerApplication.js"></script>
		<script type="text/javascript" src="src/js/Brick.js"></script>
		<script type="text/javascript" src="src/js/MusicTrack.js"></script>
		<script type="text/javascript" src="src/js/Cookie.js"></script>
		
		<script type="text/javascript" src="src/js/GameScript.js"></script>
		<script type="text/javascript" src="src/js/PlayTheGame.js"></script>
		<script type="text/javascript" src="src/js/AudioManager.js"></script>
		<script type="text/javascript" src="src/js/Statistics.js"></script>
	</head>
	
	<body>
		<div id="wrapper">
		
			<header>
				<h1>Media Thesis Project - Memory Game Mash-Up</h1>
			</header>
			
			<nav>
				<ul>
					<li><a href="logout.php">Logout</a></li>
					<li><a href="game.php" id="thisPage">Memory Game</a></li>
					<li><a href="overview.php">Overview</a></li>
					<li><a href="survey.php">Survey</a></li>
					<li><a href="account.php">Account</a></li>
				</ul>
			</nav>
			
			<main>
				<div id="rightSection">
					<div id="basicInfo">
						<p>Points:<span id="pointsInfo">0</span></p>
						<div id="moreInfo">
							<p>Time Played:<span id="timePlayedInfo">00:00</span></p>
							<p>Pairs Correct:<span id="goodSetsInfo">0</span></p>
							<p>Pairs Wrong:<span id="failedSetsInfo">0</span></p>
						</div>
						<button type="button" class="blueBtn" id="extendUserInfoBtn">Show More</button>
					</div>
					<br>
					
					<fieldset class="panel" id="currentSettings">
						<legend>Current Settings</legend>
						<p>Difficulty: <input disabled type="text" id="difficulty" value="Easy"> </p>
						<p>Amount of Memory Cards: <input disabled type="text" id="amountOfMemoryCards" value="16"> </p>
						<p>Bonus Time: <input disabled type="text" id="bonusTime" value="8 seconds"> </p>
						<p>Preset:  <input disabled type="text" id="preset" value="Default"> </p>
						<p>Progress (Current/Total):  <input disabled type="text" id="progress" value="1/6"> </p>
					</fieldset>
					<br>
					
					<div id="timers"></div>
				</div>
				
				<fieldset class="panel" id="buttonsPanel">
					<legend id="legend">Play the Game</legend>
					<button type="button" class="blueBtn" id="nextPresetBtn">Start Next Preset</button>
					<button type="button" class="blueBtn" id="pauseBtn">Pause</button>
					<button type="button" class="blueBtn" id="stopBtn">Stop</button>
				</fieldset>
				
				<div id="bricks"></div>
				
				<div class="textBox" id="message"></div>
				
				<div class="textBox" id="instructions">
					<p id="instructionsText">An instructions text.</p>
					<button type="button" class="blueBtn" id="startBtn">Continue</button>
				</div>
				
				<div class="textBox" id="finished">
					<p id="finishedText">
						The expirement has concluded.
						<br>
						Thank you for participating.
						<br>
						Your statistics has been submitted.
						<br>
						Please fill in the survey.
					</p>
					
					<form action="survey.php">
						<input type="submit" class="blueBtn" id="surveyBtn" value="Go To Survey" />
					</form>
				</div>
				
				<div class="textBox" id="rate">
					<p id="rateText">Please rate this preset: </p>
					
					<fieldset id="stars">
						<input type="radio" id="star10" name="rating" value="10">
						<label class="full" for="star10" title="Outstanding - 5 stars"></label>
						
						<input type="radio" id="star9" name="rating" value="9">
						<label class="half" for="star9" title="Really good - 4.5 stars"></label>
						
						<input type="radio" id="star8" name="rating" value="8">
						<label class="full" for="star8" title="Pretty Good - 4 stars"></label>
						
						<input type="radio" id="star7" name="rating" value="7">
						<label class="half" for="star7" title="Good - 3.5 stars"></label>
						
						<input type="radio" id="star6" name="rating" value="6">
						<label class="full" for="star6" title="Decent - 3 stars"></label>
						
						<input type="radio" id="star5" name="rating" value="5">
						<label class="half" for="star5" title="Mediocre - 2.5 stars"></label>
						
						<input type="radio" id="star4" name="rating" value="4">
						<label class="full" for="star4" title="Bad - 2 stars"></label>
						
						<input type="radio" id="star3" name="rating" value="3">
						<label class="half" for="star3" title="Pretty Bad - 1.5 stars"></label>
						
						<input type="radio" id="star2" name="rating" value="2">
						<label class="full" for="star2" title="Really Bad - 1 star"></label>
						
						<input type="radio" id="star1" name="rating" value="1">
						<label class="half" for="star1" title="Horrible - 0.5 stars"></label>
					</fieldset>
					
					<button type="button" class="blueBtn" id="rateBtn">Rate</button>
				</div>
				
			</main>
			
		</div> <!-- End wrapper -->
	</body>
	
</html>