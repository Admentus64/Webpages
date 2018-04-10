<?php
	
	require 'vendor/autoload.php';
	include "database.php";
	
?>



<!DOCTYPE html>
<html>
	
	<head>
		<meta charset="utf-8">
		<title>MongoDB Database for Video Games</title>
		<link rel="stylesheet" type="text/css" href="style.css">
	</head>
	
	<body>
		<div id="wrapper">
		
			<header>
				<h1>MongoDB Database for Video Games</h1>
			</header>
			
			<main>
				<form method="post">
					<fieldset id="findByDeveloper">
						<legend>Find By Developer</legend>
						
						<label>Developer #1:</label>
						<input type="text" name="developer1" value="">
						
						<label>Developer #2:</label>
						<input type="text" name="developer2" value="">
						
						<label>Developer #3:</label>
						<input type="text" name="developer3" value="">
						
						<input type="submit" value="Find By Developer" name="findByDeveloper">
					</fieldset>
				</form>
				
				<form method="post">
					<fieldset id="findByPublisher">
						<legend>Find By Publisher</legend>
						
						<label>Publisher #1:</label>
						<input type="text" name="publisher1" value="">
						
						<label>Publisher #2:</label>
						<input type="text" name="publisher2" value="">
						
						<label>Publisher #3:</label>
						<input type="text" name="publisher3" value="">
						
						<input type="submit" value="Find By Publisher" name="findByPublisher">
					</fieldset>
				</form>
				
				<form method="post">
					<fieldset id="findByReleaseDate">
						<legend>Find By Release Date</legend>
						
						<label>Year:</label>
						<input type="text" name="year" value="">
						
						<label>Month:</label>
						<input type="text" name="month" value="">
						
						<input type="submit" value="Find By Release Date" name="findByReleaseDate">
					</fieldset>
				</form>
				
				<form method="post">
					<fieldset id="findByScore">
						<legend>Find By Score</legend>
						
						<label>Miniumum Score:</label>
						<input type="text" name="minScore" value="">
						
						<label>Maximum Score:</label>
						<input type="text" name="maxScore" value="">
						
						<input type="submit" value="Find By Score" name="findByScore">
					</fieldset>
				</form>
				
				<form method="post">
					<fieldset id="countAllGames">
						<legend>Count All Games</legend>
						
						<input type="submit" value="Count All Games" name="countAllGames">
					</fieldset>
				</form>
				
				<fieldset id="system">
					<legend>Display Results</legend>
					<?php
						
						if (isset($_POST["findByDeveloper"]))
							if ($_POST["findByDeveloper"] and $_SERVER["REQUEST_METHOD"] == "POST")
								findByDeveloper($_POST["developer1"], $_POST["developer2"], $_POST["developer3"]);
						
						if (isset($_POST["findByPublisher"]))
							if ($_POST["findByPublisher"] and $_SERVER["REQUEST_METHOD"] == "POST")
								findByPublisher($_POST["publisher1"], $_POST["publisher2"], $_POST["publisher3"]);
							
						if (isset($_POST["findByReleaseDate"]))
							if ($_POST["findByReleaseDate"] and $_SERVER["REQUEST_METHOD"] == "POST")
								findByReleaseDate($_POST["year"], $_POST["month"]);
						
						if (isset($_POST["findByScore"]))
							if ($_POST["findByScore"] and $_SERVER["REQUEST_METHOD"] == "POST")
								findByScore($_POST["minScore"], $_POST["maxScore"]);
						
						if (isset($_POST["countAllGames"]))
							if ($_POST["countAllGames"] and $_SERVER["REQUEST_METHOD"] == "POST")
								countAllGames();
						
					?>
				</fieldset>

			</main>
		
		</div> <!-- End wrapper -->
	</body>

</html>