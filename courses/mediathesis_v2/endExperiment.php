<!DOCTYPE html>

<?php
    
	// Include required PHP files
	require "src/php/database.php";
	
	// Establish a connection with the logged user from the database, but if the experiment has not been concluded then return to the index page
	createConnection();
	//if (!isset($_COOKIE["concluded"]))
		header("Location:index.php");
	
	$ip = getClient();
	createMediaThesisStatisticsTable();
	
	for ($index=0; $index<sizeof($_POST["preset"]); $index++)
		addNewStatisticsEntry($index);
	sendEmailContactAdmin();
	
	
	
	// Adding an user into the mediaThesisUsers table in the database
	function addNewStatisticsEntry($index) {   // Start Function: addUser
		
		$sql = "INSERT INTO mediaThesisStatistics (preset, rating, points, highestFace, usedSkips, maxSkips, goodSets, badSets, fieldClears, level, pauses, shortClock, longClock, timePlayed, timeStamp, ip) VALUES (
			'{$_POST['preset'][$index]}',
			'{$_POST['rating'][$index]}',
			'{$_POST['points'][$index]}',
			'{$_POST['highestFace'][$index]}',
			'{$_POST['usedSkips'][$index]}',
			'{$_POST['maxSkips'][$index]}',
			'{$_POST['goodSets'][$index]}',
			'{$_POST['badSets'][$index]}',
			'{$_POST['fieldClears'][$index]}',
			'{$_POST['level'][$index]}',
			'{$_POST['pauses'][$index]}',
			'{$_POST['shortClock'][$index]}',
			'{$_POST['longClock'][$index]}',
			'{$_POST['timePlayed'][$index]}',
			'{$_POST['timeStamp']}',
			$ip
		)";
		
		// Check if the user was created succesfully, it only serves to inform if it worked, there is no fix otherwise yet
		if ($_SESSION["conn"]->query($sql) === TRUE)
			echo "A new statistics entry has been stored successfully.";
		else echo "There was an error with storing a new statistics entry.";
		
	}   // End Function: addUser
	
	
	
	function sendEmailContactAdmin() {   // Start Function: sendEmailContactAdmin
        
        $to = $GLOBALS["database"]["email"];
        $subject = "Media Thesis Project V2 - LNU - 1ME30E - Statistics";
		
		$message = "
			<html>
                <head>
                    <title>Media Thesis Project V2 - LNU - 1ME30E - Statistics</title>
                </head>
                <body>
					<p>A game of Memory Card Mash-Up was recently played by someone</p>
                    <table border='1px solid black' width=50%>
						<b>User Profile</b>
                        <tr>
                            <th>IP Address</th>
                            <td align='center'>" . $ip . "</td>
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