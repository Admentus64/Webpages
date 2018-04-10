<!DOCTYPE html>
<?php
	
	require "src/php/database.php";
	require "src/php/init.php";
	
?>

<html>
	
	<head>
		<meta charset="utf-8">
		<title>Article Database</title>
		<link rel="stylesheet" type="text/css" href="src/css/style.css">
	</head>
	
	<body>
		<div id="wrapper">
			
			<header>
				<h1>Article Database</h1>
			</header>
			
			<nav>
				<ul>
					<li><a href="index.php">Index</a></li>
					<li><a href="admin.php" id="thisPage">Administration</a></li>
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
						showUserAccounts();
						
						if (isset($_SESSION["user"]))				// Redirect to the admin page if already logged in
							header("Location:admin.php");
						
						if (isset($_POST["login"]))					// Logging in
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