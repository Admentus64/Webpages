<?php
    
	// Retrieve an user info element (total points, games count or average points) stored for the logged user in the database
    function getUserInfoElement($element, $username, $password) {   // Start Function: getUserInfoElement
        
		$sql = "SELECT $element FROM memoryUsers WHERE username = '$username' AND password = '$password' LIMIT 1";
		fetchResult($sql, $element);
        
    } // End Function: getUserInfoElement
	
	
	
	// Retrieve the amount of memory cards setting stored for the logged user in the database
	function getAmountOfMemoryCards($username, $password) {   // Start Function: getAmountOfMemoryCards
		
		$sql = "SELECT amountOfMemoryCards FROM memoryUsers WHERE username = '$username' AND password = '$password' LIMIT 1";
		fetchResult($sql, "amountOfMemoryCards");
        
    } // End Function: getAmountOfMemoryCards
	
	
	
	// Retrieve the time limit setting stored for the logged user in the database
	function getTimeLimit($username, $password) {   // Start Function: getTimeLimit
		
		$sql = "SELECT timeLimit FROM memoryUsers WHERE username = '$username' AND password = '$password' LIMIT 1";
		fetchResult($sql, "timeLimit");
        
    } // End Function: getTimeLimit
	
	
	
	// Retrieve the difficulty setting stored in the database
	function getDifficulty($username, $password) {   // Start Function: getDifficulty
		
		$sql = "SELECT difficulty FROM memoryUsers WHERE username = '$username' AND password = '$password' LIMIT 1";
		fetchResult($sql, "difficulty");
        
    } // End Function: getDifficulty
	
	
	
	// Retrieve the background color setting stored for the logged user in the database
	function getBackgroundColor($username, $password) {   // Start Function: getBackgroundColor
		
		$sql = "SELECT backgroundColor FROM memoryUsers WHERE username = '$username' AND password = '$password' LIMIT 1";
		fetchResult($sql, "backgroundColor");
        
    } // End Function: getBackgroundColor
	
	
	
	// Retrieve the amount of memory cards setting stored for the logged user in the database and reply it in CSS format style
	function getBackgroundColorStyle($username, $password) {   // Start Function: getBackGroundColorStyle
		
		$sql = "SELECT backgroundColor FROM memoryUsers WHERE username = '$username' AND password = '$password' LIMIT 1";
		$result = $_SESSION["conn"]->query($sql);
		
		if ($result->num_rows > 0) {
			while ($row = $result->fetch_assoc()) {
				echo 'main style="background-color:' . $row["backgroundColor"] . '"';
			}
		}
        
    } // End Function: 
	
	
	
	// Set the total points, games count and average points for the logged user in the database to 0
	function resetScore($username, $password) {   // Start Function: resetScore
        
		$sql = "UPDATE memoryUsers SET totalPoints = 0, gamesCount = 0, averagePoints = 0 WHERE username = '$username' AND password = '$password'";
		endWriteToDatabase($sql, "The score statistics have been resetted successfully", "There was an error with updating the score statistics");
		
	} // End Function: resetScore
	
	
	
	// Set the time limit and amount of memory cards for the logged user in the database to the chosen input
	function setCustomDifficulty($username, $password, $amountOfMemoryCards, $timeLimit) {   // Start Function: setCustomDifficulty
		
		$sql = "UPDATE memoryUsers SET amountOfMemoryCards = '$amountOfMemoryCards' WHERE username = '$username' AND password = '$password'";
		if (mysqli_query($_SESSION["conn"], $sql))
			$_SESSION["sqlMessage"] = "The option for the amount of memory cards has been sucessfully chosen" . "<br>";
		else $_SESSION["sqlMessage"] = "There was an error with selecting the option for the amount of memory cards" . ": " . mysqli_error($_SESSION["conn"] . "<br>");
		
		$sql = "UPDATE memoryUsers SET timeLimit = '$timeLimit' WHERE username = '$username' AND password = '$password'";
		if (mysqli_query($_SESSION["conn"], $sql))
			$_SESSION["sqlMessage"] .= "The option for the time limit has been sucessfully chosen";
		else $_SESSION["sqlMessage"] .="There was an error with selecting the option for the time limit" . ": " . mysqli_error($_SESSION["conn"]);
		
		mysqli_close($_SESSION["conn"]);
		header("Refresh:0");
		
	} // End Function: setCustomDifficulty
	
	
	
	// Set the difficulty for the logged user in the database to the chosen input
	function setDifficulty($username, $password, $difficulty) {   // Start Function: setDifficulty
		
		$sql = "UPDATE memoryUsers SET difficulty = '$difficulty' WHERE username = '$username' AND password = '$password'";
		endWriteToDatabase($sql, "The option for the difficulty has been sucessfully chosen", "There was an error with selecting the option for the difficulty");
		
	} // End Function: setDifficulty
	
	
	
	// Set the background color for the logged user in the database to the chosen input
	function setBackgroundColor($username, $password, $backgroundColor) {   // Start Function: setBackgroundColor
		
		$sql = "UPDATE memoryUsers SET backgroundColor = '$backgroundColor' WHERE username = '$username' AND password = '$password'";
		endWriteToDatabase($sql, "Your favorite background color has been sucessfully chosen", "There was an error with selecting your favorite background color");
		
	} // End Function: setBackgroundColor
	
	
	
	// Write / update the requested variable to the mySQL database and let the system know if it went correctly or not
	function endWriteToDatabase($sql, $suceed, $error) {   // Start Function: endWriteToDatabase
		
		if (mysqli_query($_SESSION["conn"], $sql))
			$_SESSION["sqlMessage"] = $suceed;
		else $_SESSION["sqlMessage"] = $error . ": " . mysqli_error($_SESSION["conn"]);
		mysqli_close($_SESSION["conn"]);
		header("Refresh:0");										// Refresh the page so that the changes are visually updated too
		
	} // End Function: endWriteToDatabase
	
	
	
	// Fetch the requested variable from the mySQL database and reply it
	function fetchResult($sql, $element) {   // Start Function: fetchResult
		
		$result = $_SESSION["conn"]->query($sql);
		if ($result->num_rows > 0) {
			while ($row = $result->fetch_assoc()) {
				echo $row[$element];
			}
		}
		
	} // End Function: fetchResult
    
?>