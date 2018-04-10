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
					<li><a href="index.php" id="thisPage">Login</a></li>
					<li><a href="register.php">Register</a></li>
				</ul>
			</nav>
			
			<main>
				<h1>Login Page</h1>
				
				<form method="post">
					<fieldset id="login">
						<legend>Login</legend>
						
						<label>Username:</label>
						<input type="text" name="username" value="">
						
						<label>Password:</label>
						<input type="text" name="password" value="">
						
						<input type="submit" value="Login" name="login"">
					</fieldset>
				</form>
				
				<fieldset id="system">
					<legend>System Messages</legend>
					<?php
						createConnection();							// Create a database connection
						//showUserAccounts();						// Show all available user account, used for debugging, not to use in the final product
						if (isset($_SESSION["user"]))				// Redirect to the logout page if already logged in
							header("Location:logout.php");
						
						if (isset($_POST["login"]))					// Logging in with an user account
							if ($_POST["login"] and $_SERVER["REQUEST_METHOD"] == "POST")
								login($_POST["username"], $_POST["password"]);
						
						if (isset($_POST["logout"]))				// Logging out
							if ($_POST["logout"] and $_SERVER["REQUEST_METHOD"] == "POST")
								logout();
					?>
				</fieldset>
				
			</main>
			
		</div> <!-- End wrapper -->
	</body>

</html>