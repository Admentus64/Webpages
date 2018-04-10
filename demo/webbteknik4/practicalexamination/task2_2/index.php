<?php
	
	$pizza["Calzone"] = "60";
	$pizza["Capricciosa"] = "65";
	$pizza["Kebabpizza"] = "80";
	
	//$pizza
	
	$total = 0;
	
	foreach($pizza as $x => $x_value) {
		echo $x . " - " . $x_value . " kr<br>";
		$total += $x_value;
	}
	
	echo "Totalsumma: " . $total . " kr";
	
	//for ($i=0; $i<3; $i++)
	//	echo $pizza["Calzone"] . "<br>";
	
	//echo $pizza["Calzone"] . "<br>";
	//echo $pizza["Calzone"] . "<br>";
	//echo $pizza["Calzone"] . "<br>";
	//echo $pizza["Calzone"] . "<br>";
	
	
?>



<!doctype html>
<html>
	
	<head>
		<meta charset="UTF-8">
		<title>Untitled Document</title>
	</head>
	
	<body>
	</body>
    
</html>