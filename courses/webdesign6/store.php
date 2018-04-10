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

<?php
	
	// Write the total points, games count and average points into the database for storage for the logged user
    function storeToDatabase($username, $password, $totalPoints, $gamesCount) {   // Start Function: storeToDatabase
		
		$averagePoints = round($totalPoints / $gamesCount, 0, PHP_ROUND_HALF_UP);
		$sql = "UPDATE memoryUsers SET totalPoints = '$totalPoints', gamesCount = '$gamesCount', averagePoints = '$averagePoints' WHERE username = '$username' AND password = '$password'";
		endWriteToDatabase($sql, "Record updated successfully", "Error updating record");
		
	} // End Function storeToDatabase
    
	storeToDatabase($_SESSION["username"], $_SESSION["password"], $_GET["totalpoints"], $_GET["gamescount"]);
	header("Location:game.php");									// Return to the game page again for another round of memory
    
?>