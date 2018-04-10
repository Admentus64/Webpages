<?php
	
	// GLOBALS
	$_GLOBALS["global_name"] = "Henk";
	echo "Globals: " . $_GLOBALS["global_name"] . "<br><br>";
	
	
	
	// SERVER
	echo "Server: PHP_SELF - " . $_SERVER["PHP_SELF"] . "<br>";
	echo "Server: SERVER_NAME - " . $_SERVER["SERVER_NAME"] . "<br>";
	echo "Server: HTTP_HOST - " . $_SERVER["HTTP_HOST"] . "<br>";
	if (isset($_SERVER["HTTP_REFERER"]))
		echo "Server: HTTP_REFERER - " . $_SERVER["HTTP_REFERER"] . "<br>";
	echo "Server: HTTP_USER_AGENT - " . $_SERVER["HTTP_USER_AGENT"] . "<br>";
	echo "Server: SCRIPT_NAME - " . $_SERVER["SCRIPT_NAME"] . "<br>";
	echo "<br>";
	
	
	
	// GET
	if (isset($_GET["get_name"])) {
		// echo "GET: " . htmlspecialchars($_GET["get_name"]) . "<br>";
		echo "Get: " . $_GET["get_name"] . "<br>";
	}
	
	
	
	// POST
	if (isset($_POST["post_name"])) {
		//echo "Post: " . htmlspecialchars($_POST["post_name"]) . "<br>";
		echo "Post: " . $_POST["post_name"] . "<br>";
	}
	
	
	
	// FILES
	if (isset($_FILES["file"]))
		if ($_FILES["file"]["name"] != "") {
			echo "You have selected a file to upload.<br>";
			echo "Filename: " . $_FILES["file"]["name"] . ".<br>";
			
		}
	else echo "No file is selected to upload.<br>";
	
	
	
	// REQUEST
	if (isset($_POST["post_name"]))
		if ($_SERVER["REQUEST_METHOD"] == "POST")
			echo "Request: " . $_REQUEST["post_name"] . "<br>";
	
	
	
	// SESSION
	if (session_status() == PHP_SESSION_NONE)
		session_start();
	$_SESSION["session_name"]["session_firstname"] = "Bob"; 
	echo "Session Firstname: " . $_SESSION["session_name"]["session_firstname"] . "<br>";
	
	
	
	// ENV
	$_ENV["env_name"] = "Bjorn";
	echo 'Environment: ' . $_ENV["env_name"] . '.<br>';
	
	
	
	// COOKIE
	$_COOKIE["cookie_name"] = "Frank";
	echo "Cookie: " . htmlspecialchars($_COOKIE["cookie_name"]) . "<br>";
	
	echo "<br>";
	
?>



<!DOCTYPE html>
<html>
	
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	
	<body>
		<form action="index.php" method="post">
			<input type="submit" name="post_name" value="John" />
		</form>
		
		<form action="index.php" method="post" enctype="multipart/form-data">
			<label for="file">Filename:</label>
			<input type="file" name="file" id="file" />
			<br />
			<input type="submit" name="submit" value="Submit" />
		</form>
	</body>
	
</html>