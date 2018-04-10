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
		<meta charset="UTF-8">
		<title>1ME326, Kursprojekt - Memory</title>
		<link rel="stylesheet" type="text/css" href="src/css/style.css">
		<link rel="stylesheet" type="text/css" href="src/css/styleGame.css">
		<link rel="stylesheet" type="text/css" href="src/css/timerApplication.css">
		
		<script type="text/javascript" src="src/jquery/jquery-1.12.3.js"></script>
		<script type="text/javascript" src="src/js/events/Event.js"></script>
		<script type="text/javascript" src="src/js/drag/DragnDrop.js"></script>
		
		<script type="text/javascript" src="src/js/Application.js"></script>
		<script type="text/javascript" src="src/js/TimerApplication.js"></script>
		<script type="text/javascript" src="src/js/Brick.js"></script>
		<script type="text/javascript" src="src/js/MusicTrack.js"></script>
		
		<script type="text/javascript" src="src/js/GameScript.js"></script>
		<script type="text/javascript" src="src/js/PlayTheGame.js"></script>
		<script type="text/javascript" src="src/js/MusicPlayer.js"></script>
	</head>
	
	<body>
		<div id="wrapper">
		
			<header>
				<h1>1ME326, Kursprojekt - Memory Game</h1>
			</header>
			
			<nav>
				<ul>
					<li><a href="logout.php">Logout</a></li>
					<li><a href="game.php" id="thisPage">Memory Game</a></li>
					<li><a href="overview.php">Overview</a></li>
				</ul>
			</nav>
			
			<main <?php echo getBackgroundColorStyle($_SESSION["username"], $_SESSION["password"])?>>
				<div id="userInfo">
					<p>Total Points:<span id="totalPointsInfo"><?php echo getUserInfoElement("totalPoints", $_SESSION["username"], $_SESSION["password"])?></span></p>
					<div id="userMoreInfo">
						<p>Number of Games:<span id="gamesCountInfo"><?php echo getUserInfoElement("gamesCount", $_SESSION["username"], $_SESSION["password"])?></span></p>
						<p>Average Points:<span id="averagePointsInfo"><?php echo getUserInfoElement("averagePoints", $_SESSION["username"], $_SESSION["password"])?></span></p>
					</div>
					<button type="button" class="blueBtn" id="extendUserInfoBtn">Show More</button>
				</div>
				
				<fieldset id="currentSettings">
					<legend>Current Settings</legend>
					Amount of Memory Cards: <input disabled type="text" id="amountOfMemoryCardsSetting" value="<?php echo getAmountOfMemoryCards($_SESSION["username"], $_SESSION["password"])?>"></input> <br>
					Time Limit: <input disabled type="text" id="timeLimitSetting" value="<?php echo getTimeLimit($_SESSION["username"], $_SESSION["password"])?>"></input> <br>
					Difficulty:  <input disabled type="text" id="difficultySetting" value="<?php echo getDifficulty($_SESSION["username"], $_SESSION["password"])?>"></input>
				</fieldset>
				<br>
				
				<div id="bricks"></div>
				
				<div id="buttonPanels">
					<fieldset id="playTheGame">
						<legend id="legend">Play the Game</legend>
						<button type="button" class="blueBtn" id="nextBtn">Next</button>
						<button type="button" class="blueBtn" id="startBtn">Start</button>
						<button type="button" class="blueBtn" id="restartBtn">Restart</button>
						<button type="button" class="blueBtn" id="pauseBtn">Pause</button>
					</fieldset>
				
					<fieldset id="musicPlayer">
						<legend>Music Player</legend>
						<button type="button" class="blueBtn" id="playMusicBtn">Play</button>
						<button type="button" class="blueBtn" id="restartMusicBtn">Restart</button>
						<button type="button" class="blueBtn" id="nextMusicBtn">Next</button>
						<button type="button" class="blueBtn" id="previousMusicBtn">Previous</button>
					</fieldset>
				</div>
				
				<fieldset id="turnInfo">
					<p>Click on two memory cards to swap them. Click then on the Next button in order to proceed with two new memory cards.</p>
					Amount of memory card pairs swapped: <input disabled type="text" id="turnNr" value="0"></input>
				</fieldset>
				
				<div id="message"></div>
			</main>
			
		</div> <!-- End wrapper -->
	</body>
	
</html>