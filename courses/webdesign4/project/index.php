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
					<li><a href="index.php" id="thisPage">Index</a></li>
					<li><a href="admin.php">Administration</a></li>
				</ul>
			</nav>
			
			<main>
				<h1>Index Page</h1>
				
				<fieldset id="system">
					<legend>System Messages</legend>
					<?php createConnection(); ?>
				</fieldset>
				
				<fieldset id="showArticles">
					<legend>Article Display</legend>
					<?php showArticles(); ?>
				</fieldset>
			</main>
		
		</div> <!-- End wrapper -->
	</body>

</html>