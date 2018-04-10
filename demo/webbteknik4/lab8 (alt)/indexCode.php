<?php
	
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		
		session_start();
		
		$_SESSION["room"] = $_POST["room"];
		$_SESSION["persons"] = $_POST["persons"];
		
		$_SESSION["arrivaldate"] = $_POST["arrivaldate"];
		$_SESSION["nights"] = $_POST["nights"];
		
		$_SESSION["internet"] = $_POST["internet"];
		$_SESSION["parking"] = $_POST["parking"];
		$_SESSION["sea"] = $_POST["sea"];
		
		$_SESSION["name"] = $_POST["name"];
		$_SESSION["street"] = $_POST["street"];
		$_SESSION["zipcode"] = $_POST["zipcode"];
		$_SESSION["city"] = $_POST["city"];
		$_SESSION["telephone"] = $_POST["telephone"];
		$_SESSION["email"] = $_POST["email"];
		
		header("Location: confirm.php");
		
	}
	
?>