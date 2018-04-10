<?php
	
	function displayValues() {
		
		echo "Type of Room: " . $_POST["room"] . "<br>";
		if ($_POST["room"] == "Family Room")
			echo "Number of Persons: " . $_POST["persons"] . "<br>";
		echo "<br>";
		
		if (empty($_POST["date"]))
			echo "The date of arrival is not provided<br>";
		else echo "Date of Arrival: " . $_POST["arrivaldate"] . "<br>";
		echo "Nights to Stay: " . $_POST["nights"] . "<br>";
		echo "<br>";
		
		if (!isset($_POST["internet"]))
			$_POST["internet"] = "No";
		if (!isset($_POST["parking"]))
			$_POST["parking"] = "No";
		if (!isset($_POST["sea"]))
			$_POST["sea"] = "No";
		echo "Has Internet: " . $_POST["internet"] . "<br>";
		echo "Has Parking Spot: " . $_POST["parking"] . "<br>";
		echo "Has Sight at Sea: " . $_POST["sea"] . "<br>";
		echo "<br>";
		
		if (empty($_POST["name"]))
			 echo "The name is not provided<br>";
		else echo "Name: " . $_POST["name"] . "<br>";
		
		if (empty($_POST["street"]))
			 echo "The street is not provided<br>";
		else echo "Street: " . $_POST["street"] . "<br>";
		
		if (empty($_POST["zipcode"]))
			 echo "The zipcode is not provided<br>";
		else echo "Zipcode: " . $_POST["zipcode"] . "<br>";
		
		if (empty($_POST["city"]))
			 echo "The city is not provided<br>";
		else echo "City: " . $_POST["city"] . "<br>";
		
		if (empty($_POST["telehpone"]))
			 echo "The telephone number is not provided<br>";
		else echo "Telephone Number: " . $_POST["telephone"] . "<br>";
		
		if (empty($_POST["email"]))
			 echo "The email address is not provided<br>";
		else echo "Email Address: " . $_POST["email"] . "<br>";
		
		echo "<br>";
		
	}
	
?>