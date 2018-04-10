<?php
	
	function display() {
		
		echo "Your name is here: " . $_POST["name"] . "<br>";
		echo "Your email is here: " . $_POST["email"];
		
	}
	
?>



<!doctype html>
<html>

	<head>
		<meta charset="UTF-8">
		<title>Untitled Document</title>
	</head>

	<body>
    	<?php echo display(); ?>
	</body>
    
</html>