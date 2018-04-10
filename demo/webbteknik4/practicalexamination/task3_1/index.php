<?php
	
	// $color = (isset($_GET['color'])) ? $_GET['color'] : '000000'; // Complex!
	
	if (isset($_GET["color"])) // Break it up!
		$color = $_GET["color"];
	else $color = "000000";
?>



<!DOCTYPE html>
<html>
	
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	
	<body style="background-color: #<?php echo $color ?>">
	</body>

</html>