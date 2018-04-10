### index.php ###

<?php
	$name = 'Kalle';
	$age = 35;
	$phone;
	$interests = array ('teaching', 'golfing');
	
	$interests = 'Cooking';
	
	function myFirstFunction($name) {
		return "Hello $name";
	}

	echo myFirstFunction($name);				// Hello Kalle
	phpinfo();
?>

<html>
	<body>
		<h1>
			<?php echo myFirstFunction($name) ?>
		</h1>
	</body>
</html>