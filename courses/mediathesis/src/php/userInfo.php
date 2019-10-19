<?php
        
	// Retrieve an user info element (total points, games count or average points) stored for the logged user in the database
    function readFromUsersDatabase($element, $username, $password) {   // Start Function: getUserInfoElement
        
        $sql = "SELECT $element FROM mediaThesisUsers WHERE username = '$username' AND password = '$password' LIMIT 1";
		fetchResult($sql, $element);
        
    } // End Function: getUserInfoElement
    
    
    
    // Write the provided variable to the database with the provided value for the logged user
    function writeToUsersDatabase($element, $value, $message, $username, $password) {   // Start Function: writeToDatabase
		
		$sql = "UPDATE mediaThesisUsers SET $element = '$value' WHERE username = '$username' AND password = '$password'";
        if ($message === null)
            $message = "Record";
        endWriteToDatabase($sql, "$message has been sucessfully updated", "$message could not be updated due an issue");
		
	} // End Function writeToDatabase
    
    
    
    // Retrieve an user info element (total points, games count or average points) stored for the logged user in the database
    function readFromStatisticsDatabase($element, $username) {   // Start Function: getUserInfoElement
        
        $sql = "SELECT $element FROM mediaThesisStatistics WHERE username = '$username'";
		fetchResult($sql, $element);
        
    } // End Function: getUserInfoElement
    
    
    
    // Write the provided variable to the database with the provided value for the logged user
    function writeToStatisticsDatabase($element, $value, $message, $username) {   // Start Function: writeToDatabase
		
		$sql = "UPDATE mediaThesisStatistics SET $element = '$value' WHERE username = '$username'";
        if ($message === null)
            $message = "Record";
        endWriteToDatabase($sql, "$message has been sucessfully updated", "$message could not be updated due an issue");
		
	} // End Function writeToDatabase
	
	
	
	// Write / update the requested variable to the mySQL database and let the system know if it went correctly or not
	function endWriteToDatabase($sql, $succeed, $error) {   // Start Function: endWriteToDatabase
		
		if (mysqli_query($_SESSION["conn"], $sql))
			$_SESSION["message"] = $succeed;
		else $_SESSION["message"] = $error . ": " . mysqli_error($_SESSION["conn"]);
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
    
    
    
    // Retrieve the user game statistics on the Statistics page
    function retrieveUserStatistics($userId) {   // Start Function: retrieveUserStatistics
        
        // Check if the users table exists
		$sql = $_SESSION["conn"]->query("SELECT 1 FROM mediaThesisStatistics LIMIT 1");
        if ($sql === FALSE)											// It doesn't exist, so stop here
			return;
        
		$sql = "SELECT * FROM mediaThesisStatistics WHERE userId = '$userId'";
		
        $timeStamp = "2000-02-11 00:00:00";
        $lastTimeStamp = "2000-02-11 00:00:00";
        $newTimeStamp = true;
        
		$result = $_SESSION["conn"]->query($sql);
		if ($result->num_rows > 0) {
			while ($row = $result->fetch_assoc()) {
                
                $timeStamp = $row["timeStamp"];
                
                // New time
                if ($timeStamp !== $lastTimeStamp) {
                    echo "</table>";
                    echo "<br>";
                    $lastTimeStamp = $timeStamp;
                    $newTimeStamp = true;
                }
                // No new time
                else $newTimeStamp = false;
                
                if ($newTimeStamp) {
                    echo "<table>";
                    echo "<tr>";
                    echo "<th>" . "Timestamp: " . "</th>";
                    echo "<td>" . $row["timeStamp"] . "</td>";
                    echo "<td></td>";
                    echo "<th>" . "Username: " . "</th>";
                    echo "<td>" .  $_SESSION["user"]["username"] . "</td>";
                    echo "</tr>";
                }
                
				echo "<tr>";
				echo "<th>" . "Preset:" . "<br>" . $row["preset"] . "</th>";
                echo "<td>" . "Rating:" . "<br>" . $row["rating"] . "</td>";
				echo "<td>" . "Points:" . "<br>" . $row["points"] . "</td>";
				echo "<td>" . "Swapped Sets:" . "<br>" . $row["goodSets"] . "</td>";
				echo "<td>" . "Failed Swapped Sets:" . "<br>" . $row["failedSets"] . "</td>";
				echo "<td>" . "Starting Difficulty:" . "<br>" . $row["difficulty"] . "</td>";
				echo "<td>" . "Final Difficulty:" . "<br>" . $row["finalDifficulty"] . "</td>";
				echo "<td>" . "Highest Time Left:" . "<br>" . $row["timeHighest"] . "</td>";
				echo "<td>" . "Time Played:" . "<br>"  . $row["timePlayed"] . "</td>";
				echo "<tr>";
			}
		}
        
    } // End Function: retrieveUserStatistics
    
    
    
    // Send the confirmation mail to new users when registering a new account
    function sendRegisterConfirmationEmail($username, $password, $firstname, $lastname, $email) {   // Start Function: sendRegisterConfirmationEmail
		
        $subject = "Media Thesis Project - LNU - 1ME30E - Welcome " . $firstname;
		$url = $GLOBALS["database"]["url"];
		
		$message = "<html>
			<head>
				<title>Media Thesis Project - LNU - 1ME30E - Statistics</title>
			</head>
			<body>
				<p>Welcome and thank for you registering.</p>
				<p>These are your registration credentials:</p>
				<table border='1px solid black' width=50%>
					<tr>
						<th>Username</th>
						<td align='center'>" . $username . "</th>
					</tr>
					<tr>
						<th>Password</th>
					    <td align='center'>" . $password . "</th>
					</tr>
					<tr>
						<th>First Name</th>
					    <td align='center'>" . $firstname . "</th>
					</tr>
					<tr>
						<th>Last Name</th>
					    <td align='center'>" . $lastname . "</th>
					</tr>
					<tr>
						<th>Email Address</th>
					    <td align='center'>" . $email . "</th>
					</tr>
				</table>
				<p>The thesis project is set at: <a href=" . $url . ">" . $url . "</a></p>
				<p>Please save this email in case you lose your user login credentials.</p>
			</body>
		</html>";
        
        // Always set content-type when sending HTML email
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= 'From: <' . $GLOBALS["database"]["email"] . '>' . "\r\n";
        
        mail($email, $subject, $message, $headers);
		
	} // End Function: sendRegisterConfirmationEmail
    
?>