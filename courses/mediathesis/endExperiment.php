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
	
	$_SESSION["experiment"] = 2;
	
	createMediaThesisStatisticsTable();
	
	for ($index=0; $index<sizeof($_POST["preset"]); $index++)
		addNewStatisticsEntry($index);
	sendEmailContactAdmin();
	
	// Adding an user into the mediaThesisUsers table in the database
	function addNewStatisticsEntry($index) {   // Start Function: addUser
		
		$sql = "INSERT INTO mediaThesisStatistics (userId, preset, rating, points, goodSets, failedSets, difficulty, finalDifficulty, timeHighest, timePlayed, timeStamp) VALUES (
			'{$_SESSION['user']['id']}',
			'{$_POST['preset'][$index]}',
			'{$_POST['rating'][$index]}',
			'{$_POST['points'][$index]}',
			'{$_POST['goodSets'][$index]}',
			'{$_POST['failedSets'][$index]}',
			'{$_POST['difficulty'][$index]}',
			'{$_POST['finalDifficulty'][$index]}',
			'{$_POST['timeHighest'][$index]}',
			'{$_POST['timePlayed'][$index]}',
			'{$_POST['timeStamp']}'
		)";
		
		
		// Check if the user was created succesfully, it only serves to inform if it worked, there is no fix otherwise yet
		if ($_SESSION["conn"]->query($sql) === TRUE)
			echo "A new statistics entry has been stored successfully" . "<br>";
		else echo "There was an error with storing a new statistics entry";
		
	}   // End Function: addUser
	
	function sendEmailContactAdmin() {   // Start Function: sendEmailContactAdmin
        
        $to = $GLOBALS["database"]["email"];
        $subject = "Media Thesis Project - LNU - 1ME30E - Statistics";
		
		$message = "
			<html>
                <head>
                    <title>Media Thesis Project - LNU - 1ME30E - Statistics</title>
                </head>
                <body>
					<p>A game of Memory Card Mash-Up was recently played by someone</p>
                    <table border='1px solid black' width=50%>
						<b>User Profile</b>
                        <tr>
                            <th>Username</th>
                            <td align='center'>" . $_SESSION["user"]["username"] . "</td>
                        </tr>
                        <tr>
                            <th>Password</th>
                            <td align='center'>" . $_SESSION["user"]["password"] . "</td>
                        </tr>
					</table>
					<br>
		";
		
		$message .= $_POST["message"];
		$message .= "</body></html>";
        
        // Always set content-type when sending HTML email
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= 'From: <' . $GLOBALS["database"]["email"] . '>' . "\r\n";
        
        mail($to, $subject, $message, $headers);
        
    } // End Function: sendEmailContactAdmin
	
?>