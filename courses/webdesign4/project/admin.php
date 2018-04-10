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
				<h1>Administration Page</h1>
				
				<fieldset id="system">
					<legend>System Messages</legend>
					<?php
						createConnection();							// Create a database connection
						
						if (!isset($_SESSION["user"]))				// Redirect to the login page if not logged in
							header("Location:login.php");
						
						echo "Welcome " . $_SESSION["user"]["username"] . " to the article administration tool.<br>";
						
						if (isset($_POST["addArticle"]))			// Button for adding a new article
							if ($_POST["addArticle"] and $_SERVER["REQUEST_METHOD"] == "POST")
								addArticle();
					?>
				</fieldset>
				
				<form method="post">
					<fieldset id="addArticle">
						<legend>Add article</legend>
						
						<label>Title:</label>
						<input type="text" name="title" value="">
						
						<label>Category:</label>
						<input type="text" name="category" value="">
						
						<label>Text:</label>
						<textarea name="text" cols="69" rows="10"></textarea>
						
						<label>Signature:</label>
						<input type="text" name="signature" value="<?php echo $_SESSION["user"]["username"]; ?>">
						
						<input type="submit" value="Add Article" name="addArticle">
						</fieldset>
				</form>
				
				<form method="post" action="login.php">
					<fieldset id="logout">
						<legend>Logout</legend>
						<input type="submit" value="Logout" name="logout">
					</fieldset>
				</form>
				
			</main>
		
		</div> <!-- End wrapper -->
	</body>

</html>