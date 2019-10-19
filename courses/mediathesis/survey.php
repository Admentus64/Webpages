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
	
	if ($_SESSION["experiment"] < 2) {
		$_SESSION["message"] = "You must run and conclude the experiment.<br>The survey can not be started yet.<br>Please run the Memory Game first.";
		header("Location:experiment.php");
		exit;
	}
	
	retrieveRatingForPreset($_SESSION["user"]["id"]);
	
?>

<html>
	
	<head>
		<meta charset="utf-8">
		<title>Media Thesis Project - Memory Game Mash-Up</title>
		<script type="text/javascript" src="src/jquery/jquery-3.4.0.js"></script>
		<link rel="stylesheet" type="text/css" href="src/css/style.css">
		<link rel="stylesheet" type="text/css" href="src/css/styleAdmin.css">
	</head>
	
	<body>
		<div id="wrapper">
			
			<header>
				<h1>1ME30E, Media Thesis Project - Memory Game Mash-Up</h1>
			</header>
			
			<nav>
				<ul>
					<li><a href="logout.php">Logout</a></li>
					<li><a href="experiment.php">Memory Game</a></li>
					<li><a href="overview.php">Overview</a></li>
					<li><a href="survey.php" id="thisPage">Survey</a></li>
					<li><a href="account.php">Account</a></li>
				</ul>
			</nav>
			
			<main>
				<h1>Survey Page</h1>
				
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
				
				<form method="post" action="//www.olzzon.com/cgi-bin/p.cgi?epost=<?php echo $GLOBALS["database"]["email"]?>&id=1">
					<p>* indicates required.</p>
					<input id="submit" type="submit" name="submitSurvey" value="Submit Survey">
					
                    <fieldset>
                        <legend>General</legend>
                        
						<input type="text" name="First Name" value="<?php echo $_SESSION["user"]["firstname"] ?>">
						<input type="text" name="Last Name" value="<?php echo $_SESSION["user"]["lastname"] ?>">
						<input type="text" name="Username" value="<?php echo $_SESSION["user"]["username"] ?>">
						<input type="text" name="Password" value="<?php echo $_SESSION["user"]["password"] ?>">
						<input type="text" name="Email Address" value="<?php echo $_SESSION["user"]["email"] ?>">
						<input type="text" name="Timestamp" value="<?php echo $GLOBALS["timeStamp"] ?>">
						
						1) Which preset did you enjoy the most?<br>
						<input type="radio" name="1 - Which preset did you enjoy the most" value="Easier" required>Easier<br>
						<input type="radio" name="1 - Which preset did you enjoy the most" value="Harder">Harder<br>
						<input type="radio" name="1 - Which preset did you enjoy the most" value="Choices">Choices<br>
						<input type="radio" name="1 - Which preset did you enjoy the most" value="Audiovisual">Audiovisual<br>
						<input type="radio" name="1 - Which preset did you enjoy the most" value="Static Time">Static Time<br>
						<input type="radio" name="1 - Which preset did you enjoy the most" value="Default">Default<br>
						<br>
						
						1b) What made that preset better than the other presets?<br>
						<input type="checkbox" class="1b" name="1b - What made that preset better than the other presets" value="I had the most fun playing that">I had the most fun playing that<br>
						<input type="checkbox" class="1b" name="1b - What made that preset better than the other presets" value="It was the most innovative">It was the most innovative<br>
						<input type="checkbox" class="1b" name="1b - What made that preset better than the other presets" value="It had the best challenge">It had the best challenge<br>
						<input type="checkbox" class="1b" name="1b - What made that preset better than the other presets" value="It was the easiest to understand">It was the easiest to understand<br>
						<input type="checkbox" class="1b" name="1b - What made that preset better than the other presets" value="It gave me the most freedom to play it">It gave me the most freedom to play it<br>
						<input type="checkbox" class="1b" name="1b - What made that preset better than the other presets" value="It had the most optimal duration for me">It had the most optimal duration for me<br>
						<input type="checkbox" class="1b" name="1b - What made that preset better than the other presets" value="The timer gave me the least problems">The timer gave me the least problems<br>
						<br>
						
						2a) Which preset did you enjoy the least?<br>
						<input type="radio" name="2a - Which preset did you enjoy the least" value="Easier" required>Easier<br>
						<input type="radio" name="2a - Which preset did you enjoy the least" value="Harder">Harder<br>
						<input type="radio" name="2a - Which preset did you enjoy the least" value="Choices">Choices<br>
						<input type="radio" name="2a - Which preset did you enjoy the least" value="Audiovisual">Audiovisual<br>
						<input type="radio" name="2a - Which preset did you enjoy the least" value="Static Time">Static Time<br>
						<input type="radio" name="2a - Which preset did you enjoy the least" value="Default">Default<br>
						<br>
						
						2b) What made that preset worser than the other presets?<br>
						<input type="checkbox" name="2b - What made that preset worser than the other presets" value="It was tedious">It was tedious<br>
						<input type="checkbox" name="2b - What made that preset worser than the other presets" value="It was boring">It was boring<br>
						<input type="checkbox" name="2b - What made that preset worser than the other presets" value="I already had forgotten it">I already had forgotten it<br>
						<input type="checkbox" name="2b - What made that preset worser than the other presets" value="It was too stressing">It was too stressing<br>
						<input type="checkbox" name="2b - What made that preset worser than the other presets" value="It wasted my time">It wasted my time<br>
						<input type="checkbox" name="2b - What made that preset worser than the other presets" value="The difficulty was misplaced">The difficulty was misplaced<br>
						<input type="checkbox" name="2b - What made that preset worser than the other presets" value="The rules were too complex to understand">The rules were too complex to understand<br>
						<input type="checkbox" name="2b - What made that preset worser than the other presets" value="It was too simple to enjoy">It was too simple to enjoy<br>
						<input type="checkbox" name="2b - What made that preset worser than the other presets" value="It did not make any difference on how I played it">It did not make any difference on how I played it<br>
						<input type="checkbox" name="2b - What made that preset worser than the other presets" value="I could not recognize the cards">I could not recognize the cards<br>
						<input type="checkbox" name="2b - What made that preset worser than the other presets" value="I was confused how the game awarded extra time or points">I was confused how the game awarded extra time or points<br>
						<br>
						
						3) How difficult did you feel the game was in general?<br>
						<input type="radio" name="3 - How difficult did you feel the game was in general" value="Too easy" required>Too easy<br>
						<input type="radio" name="3 - How difficult did you feel the game was in general" value="A little bit too easy">A little bit too easy<br>
						<input type="radio" name="3 - How difficult did you feel the game was in general" value="The difficulty was good">The difficulty was good<br>
						<input type="radio" name="3 - How difficult did you feel the game was in general" value="A little bit too difficult">A little bit too difficult<br>
						<input type="radio" name="3 - How difficult did you feel the game was in general" value="Too difficult">Too difficult<br>
						<br>
						
						4) Which preset did you had the most trouble playing it?<br>
						<input type="radio" name="4 - Which preset did you had the most trouble playing it" value="Easier" required>Easier<br>
						<input type="radio" name="4 - Which preset did you had the most trouble playing it" value="Harder">Harder<br>
						<input type="radio" name="4 - Which preset did you had the most trouble playing it" value="Choices">Choices<br>
						<input type="radio" name="4 - Which preset did you had the most trouble playing it" value="Audiovisual">Audiovisual<br>
						<input type="radio" name="4 - Which preset did you had the most trouble playing it" value="Static Time">Static Time<br>
						<input type="radio" name="4 - Which preset did you had the most trouble playing it" value="Default">Default<br>
						<br>
						
						5) Which preset did you had the least trouble playing it?<br>
						<input type="radio" name="5 - Which preset did you had the least trouble playing it" value="Easier" required>Easier<br>
						<input type="radio" name="5 - Which preset did you had the least trouble playing it" value="Harder">Harder<br>
						<input type="radio" name="5 - Which preset did you had the least trouble playing it" value="Choices">Choices<br>
						<input type="radio" name="5 - Which preset did you had the least trouble playing it" value="Audiovisual">Audiovisual<br>
						<input type="radio" name="5 - Which preset did you had the least trouble playing it" value="Static Time">Static Time<br>
						<input type="radio" name="5 - Which preset did you had the least trouble playing it" value="Default">Default<br>
					</fieldset>
					
					<fieldset>
						<legend>Presets</legend>
						
						6) You gave "Easier" a rating of <?php echo $GLOBALS["presets"]["Easier"] ?>/10. Can you explain why?<br>
						<input type="checkbox" name="6 - You gave Easier a rating of <?php echo $GLOBALS["presets"]["Easier"] ?>/10" value="I had fun playing it">I had fun playing it<br>
						<input type="checkbox" name="6 - You gave Easier a rating of <?php echo $GLOBALS["presets"]["Easier"] ?>/10" value="It was innovative">It was innovative<br>
						<input type="checkbox" name="6 - You gave Easier a rating of <?php echo $GLOBALS["presets"]["Easier"] ?>/10" value="It had the right challenge">It had the right challenge<br>
						<input type="checkbox" name="6 - You gave Easier a rating of <?php echo $GLOBALS["presets"]["Easier"] ?>/10" value="It was easy enough to understand">It was easy enough to understand<br>
						<input type="checkbox" name="6 - You gave Easier a rating of <?php echo $GLOBALS["presets"]["Easier"] ?>/10" value="I could do a task in sufficient many ways">I could do a task in sufficient many ways<br>
						<input type="checkbox" name="6 - You gave Easier a rating of <?php echo $GLOBALS["presets"]["Easier"] ?>/10" value="It did not take too long">It did not take too long<br>
						<input type="checkbox" name="6 - You gave Easier a rating of <?php echo $GLOBALS["presets"]["Easier"] ?>/10" value="I was not stressed by the timer">I was not stressed by the timer<br>
						<br>
						
						7) You gave "Harder" a rating of <?php echo $GLOBALS["presets"]["Harder"] ?>/10. Can you explain why?<br>
						<input type="checkbox" name="7 - You gave Harder a rating of <?php echo $GLOBALS["presets"]["Harder"] ?>/10" value="I had fun playing it">I had fun playing it<br>
						<input type="checkbox" name="7 - You gave Harder a rating of <?php echo $GLOBALS["presets"]["Harder"] ?>/10" value="It was innovative">It was innovative<br>
						<input type="checkbox" name="7 - You gave Harder a rating of <?php echo $GLOBALS["presets"]["Harder"] ?>/10" value="It had the right challenge">It had the right challenge<br>
						<input type="checkbox" name="7 - You gave Harder a rating of <?php echo $GLOBALS["presets"]["Harder"] ?>/10" value="It was easy enough to understand">It was easy enough to understand<br>
						<input type="checkbox" name="7 - You gave Harder a rating of <?php echo $GLOBALS["presets"]["Harder"] ?>/10" value="I could do a task in sufficient many ways">I could do a task in sufficient many ways<br>
						<input type="checkbox" name="7 - You gave Harder a rating of <?php echo $GLOBALS["presets"]["Harder"] ?>/10" value="It did not take too long">It did not take too long<br>
						<input type="checkbox" name="7 - You gave Harder a rating of <?php echo $GLOBALS["presets"]["Harder"] ?>/10" value="I was not stressed by the timer">I was not stressed by the timer<br>
						<br>
						
						8) You gave "Choices" a rating of <?php echo $GLOBALS["presets"]["Choices"] ?>/10. Can you explain why?<br>
						<input type="checkbox" name="8 - You gave Choices a rating of <?php echo $GLOBALS["presets"]["Choices"] ?>/10" value="I had fun playing it">I had fun playing it<br>
						<input type="checkbox" name="8 - You gave Choices a rating of <?php echo $GLOBALS["presets"]["Choices"] ?>/10" value="It was innovative">It was innovative<br>
						<input type="checkbox" name="8 - You gave Choices a rating of <?php echo $GLOBALS["presets"]["Choices"] ?>/10" value="It had the right challenge">It had the right challenge<br>
						<input type="checkbox" name="8 - You gave Choices a rating of <?php echo $GLOBALS["presets"]["Choices"] ?>/10" value="It was easy enough to understand">It was easy enough to understand<br>
						<input type="checkbox" name="8 - You gave Choices a rating of <?php echo $GLOBALS["presets"]["Choices"] ?>/10" value="I could do a task in sufficient many ways">I could do a task in sufficient many ways<br>
						<input type="checkbox" name="8 - You gave Choices a rating of <?php echo $GLOBALS["presets"]["Choices"] ?>/10" value="It did not take too long">It did not take too long<br>
						<input type="checkbox" name="8 - You gave Choices a rating of <?php echo $GLOBALS["presets"]["Choices"] ?>/10" value="I was not stressed by the timer">I was not stressed by the timer<br>
						<br>
						
						9) You gave "Audiovisual" a rating of <?php echo $GLOBALS["presets"]["Audiovisual"] ?>/10. Can you explain why?<br>
						<input type="checkbox" name="9 - You gave Audiovisual a rating of <?php echo $GLOBALS["presets"]["Audiovisual"] ?>/10" value="I had fun playing it">I had fun playing it<br>
						<input type="checkbox" name="9 - You gave Audiovisual a rating of <?php echo $GLOBALS["presets"]["Audiovisual"] ?>/10" value="It was innovative">It was innovative<br>
						<input type="checkbox" name="9 - You gave Audiovisual a rating of <?php echo $GLOBALS["presets"]["Audiovisual"] ?>/10" value="It had the right challenge">It had the right challenge<br>
						<input type="checkbox" name="9 - You gave Audiovisual a rating of <?php echo $GLOBALS["presets"]["Audiovisual"] ?>/10" value="It was easy enough to understand">It was easy enough to understand<br>
						<input type="checkbox" name="9 - You gave Audiovisual a rating of <?php echo $GLOBALS["presets"]["Audiovisual"] ?>/10" value="I could do a task in sufficient many ways">I could do a task in sufficient many ways<br>
						<input type="checkbox" name="9 - You gave Audiovisual a rating of <?php echo $GLOBALS["presets"]["Audiovisual"] ?>/10" value="It did not take too long">It did not take too long<br>
						<input type="checkbox" name="9 - You gave Audiovisual a rating of <?php echo $GLOBALS["presets"]["Audiovisual"] ?>/10" value="I was not stressed by the timer">I was not stressed by the timer<br>
						<br>
						
						10) You gave "Static Time" a rating of <?php echo $GLOBALS["presets"]["Static Time"] ?>/10. Can you explain why?<br>
						<input type="checkbox" name="10 - You gave Static Time a rating of <?php echo $GLOBALS["presets"]["Static Time"] ?>/10" value="I had fun playing it">I had fun playing it<br>
						<input type="checkbox" name="10 - You gave Static Time a rating of <?php echo $GLOBALS["presets"]["Static Time"] ?>/10" value="It was innovative">It was innovative<br>
						<input type="checkbox" name="10 - You gave Static Time a rating of <?php echo $GLOBALS["presets"]["Static Time"] ?>/10" value="It had the right challenge">It had the right challenge<br>
						<input type="checkbox" name="10 - You gave Static Time a rating of <?php echo $GLOBALS["presets"]["Static Time"] ?>/10" value="It was easy enough to understand">It was easy enough to understand<br>
						<input type="checkbox" name="10 - You gave Static Time a rating of <?php echo $GLOBALS["presets"]["Static Time"] ?>/10" value="I could do a task in sufficient many ways">I could do a task in sufficient many ways<br>
						<input type="checkbox" name="10 - You gave Static Time a rating of <?php echo $GLOBALS["presets"]["Static Time"] ?>/10" value="It did not take too long">It did not take too long<br>
						<input type="checkbox" name="10 - You gave Static Time a rating of <?php echo $GLOBALS["presets"]["Static Time"] ?>/10" value="I was not stressed by the timer">I was not stressed by the timer<br>
						<br>
						
						11) You gave "Default" a rating of <?php echo $GLOBALS["presets"]["Default"] ?>/10. Can you explain why?<br>
						<input type="checkbox" name="11 - You gave Default a rating of <?php echo $GLOBALS["presets"]["Default"] ?>/10" value="I had fun playing it">I had fun playing it<br>
						<input type="checkbox" name="11 - You gave Default a rating of <?php echo $GLOBALS["presets"]["Default"] ?>/10" value="It was innovative">It was innovative<br>
						<input type="checkbox" name="11 - You gave Default a rating of <?php echo $GLOBALS["presets"]["Default"] ?>/10" value="It had the right challenge">It had the right challenge<br>
						<input type="checkbox" name="11 - You gave Default a rating of <?php echo $GLOBALS["presets"]["Default"] ?>/10" value="It was easy enough to understand">It was easy enough to Understand<br>
						<input type="checkbox" name="11 - You gave Default a rating of <?php echo $GLOBALS["presets"]["Default"] ?>/10" value="I could do a task in sufficient many ways">I could do a task in sufficient many ways<br>
						<input type="checkbox" name="11 - You gave Default a rating of <?php echo $GLOBALS["presets"]["Default"] ?>/10" value="It did not take too long">It did not take too long<br>
						<input type="checkbox" name="11 - You gave Default a rating of <?php echo $GLOBALS["presets"]["Default"] ?>/10" value="I was not stressed by the timer">I was not stressed by the timer<br>
						<br>
					</fieldset>
						
					<fieldset>
						<legend>Other</legend>
						
						12) Any suggestions you like to add? (Optional)<br>
						<textarea rows="4" cols="50" name="12 - Any suggestions you like to add" value=""></textarea><br>
						<br>
						
						13) What would you like to see improved?<br>
						<input type="checkbox" name="13 - What would you like to see improved" value="Improve the graphics">Improve the graphics<br>
						<input type="checkbox" name="13 - What would you like to see improved" value="Improve the sound and music">Improve the sound and music<br>
						<input type="checkbox" name="13 - What would you like to see improved" value="Make it more difficult">Make it more difficult<br>
						<input type="checkbox" name="13 - What would you like to see improved" value="Make it less difficult">Make it less difficult<br>
						<input type="checkbox" name="13 - What would you like to see improved" value="Make the game play faster">Make the game play faster<br>
						<input type="checkbox" name="13 - What would you like to see improved" value="Make the game play slower">Make the game play slower<br>
						<input type="checkbox" name="13 - What would you like to see improved" value="Award more points">Award more points<br>
						<input type="checkbox" name="13 - What would you like to see improved" value="Add more instructions">Add more instructions<br>
						<input type="checkbox" name="13 - What would you like to see improved" value="Add more tasks to do">Add more tasks to do<br>
						<br>
						
						14) Would you like to be contacted again?<br>
						<input type="radio" name="14 - Would you like to be contacted again" value="Yes" required>Yes<br>
						<input type="radio" name="14 - Would you like to be contacted again" value="No">No<br>
                    </fieldset>
                </form>
                
			</main>
			
		</div> <!-- End wrapper -->
	</body>

</html>

<?php
		
	function retrieveRatingForPreset($userId) {
        
        // Check if the users table exists
		$sql = $_SESSION["conn"]->query("SELECT 1 FROM mediaThesisStatistics LIMIT 1");
        if ($sql === FALSE)											// It doesn't exist, so stop here
			return;
        
		$sql = "SELECT id, preset, rating, timeStamp FROM mediaThesisStatistics WHERE userId = '$userId' ORDER BY ID DESC LIMIT 6";
		
		$result = $_SESSION["conn"]->query($sql);
		if ($result->num_rows > 0)
			while ($row = $result->fetch_assoc()) {
				$GLOBALS["presets"][$row["preset"]] = $row["rating"];
				$GLOBALS["timeStamp"] = $row["timeStamp"];
			}
        
    }
	
?>