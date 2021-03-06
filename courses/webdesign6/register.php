<!DOCTYPE html>

<?php
	
	// Include required PHP files
	require "src/php/database.php";
	require "src/php/init.php";
	
?>

<html>
	
	<head>
		<meta charset="utf-8">
		<title>1ME326, Kursprojekt - Memory Game</title>
		<link rel="stylesheet" type="text/css" href="src/css/style.css">
		<link rel="stylesheet" type="text/css" href="src/css/styleAdmin.css">
	</head>
	
	<body>
		<div id="wrapper">
			
			<header>
				<h1>1ME326, Kursprojekt - Memory Game</h1>
			</header>
			
			<nav>
				<ul>
					<li><a href="index.php">Login</a></li>
					<li><a href="register.php" id="thisPage">Register</a></li>
				</ul>
			</nav>
			
			<main>
				<h1>Login Page</h1>
				
				<form method="post">
					<fieldset id="login">
						<legend>Register New User Account / Delete User Account</legend>
						
						<label>Username:</label>
						<input type="text" name="username" value="">
						
						<label>Password:</label>
						<input type="text" name="password" value="">
						
						<input type="submit" value="Register" name="register"">
						<input type="submit" value="Delete" name="delete"">
					</fieldset>
				</form>
				
				<fieldset id="system">
					<legend>System Messages</legend>
					<?php
						createConnection();							// Create a database connection
						if (isset($_SESSION["user"]))				// Redirect to the logout page if already logged in
							header("Location:logout.php");
						
						if (isset($_POST["register"]))				// Registering a new user
							if ($_POST["register"] and $_SERVER["REQUEST_METHOD"] == "POST")
								registerNewMemoryUser($_POST["username"], $_POST["password"]);
						
						if (isset($_POST["delete"]))				// Deleting an existing user
							if ($_POST["delete"] and $_SERVER["REQUEST_METHOD"] == "POST")
								deleteMemoryUser($_POST["username"], $_POST["password"]);
					?>
				</fieldset>
				
			</main>
			
		</div> <!-- End wrapper -->
	</body>

</html>