<?php
	
	function displayValues() {
		
		session_start();
		
		echo "Type of Room: " . $_SESSION["room"] . "<br>";
		if ($_SESSION["room"] == "Family Room")
			echo "Number of Persons: " . $_SESSION["persons"] . "<br>";
		echo "<br>";
		
		if (empty($_SESSION["date"]))
			echo "The date of arrival is not provided<br>";
		else echo "Date of Arrival: " . $_SESSION["arrivaldate"] . "<br>";
		echo "Nights to Stay: " . $_SESSION["nights"] . "<br>";
		echo "<br>";
		
		if ($_SESSION["internet"] != "Yes")
			$_SESSION["internet"] = "No";
		if ($_SESSION["parking"] != "Yes")
			$_SESSION["parking"] = "No";
		if ($_SESSION["sea"] != "Yes")
			$_SESSION["sea"] = "No";
		echo "Has Internet: " . $_SESSION["internet"] . "<br>";
		echo "Has Parking Spot: " . $_SESSION["parking"] . "<br>";
		echo "Has Sight at Sea: " . $_SESSION["sea"] . "<br>";
		echo "<br>";
		
		if (empty($_SESSION["name"]))
			 echo "The name is not provided<br>";
		else echo "Name: " . $_SESSION["name"] . "<br>";
		
		if (empty($_SESSION["street"]))
			 echo "The street is not provided<br>";
		else echo "Street: " . $_SESSION["street"] . "<br>";
		
		if (empty($_SESSION["zipcode"]))
			 echo "The zipcode is not provided<br>";
		else echo "Zipcode: " . $_SESSION["zipcode"] . "<br>";
		
		if (empty($_SESSION["city"]))
			 echo "The city is not provided<br>";
		else echo "City: " . $_SESSION["city"] . "<br>";
		
		if (empty($_SESSION["telehpone"]))
			 echo "The telephone number is not provided<br>";
		else echo "Telephone Number: " . $_SESSION["telephone"] . "<br>";
		
		if (empty($_SESSION["email"]))
			 echo "The email address is not provided<br>";
		else echo "Email Address: " . $_SESSION["email"] . "<br>";
		
		echo "<br>";
		
	}
	
?>