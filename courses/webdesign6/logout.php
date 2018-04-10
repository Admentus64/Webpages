<!DOCTYPE html>

<?php
	
	// Include required PHP files
	require "src/php/database.php";
	require "src/php/init.php";
	require "src/php/userInfo.php";
	
	// Establish a connection with the logged user from the database, but if no user is being logged in then force the login page
	createConnection();
	if (!isset($_SESSION["user"]))
		header("Location:index.php");
	
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
					<li><a href="logout.php" id="thisPage">Logout</a></li>
					<li><a href="game.php">Memory Game</a></li>
					<li><a href="overview.php">Overview</a></li>
				</ul>
			</nav>
			
			<main <?php echo getBackgroundColorStyle($_SESSION["username"], $_SESSION["password"])?>>
				<h1>Logout Page</h1>
				
				<form method="post" action="index.php">
					<fieldset id="logout">
						<legend>Logout</legend>
						<input type="submit" value="Logout" name="logout">
					</fieldset>
				</form>
				
			</main>
			
		</div> <!-- End wrapper -->
	</body>

</html>