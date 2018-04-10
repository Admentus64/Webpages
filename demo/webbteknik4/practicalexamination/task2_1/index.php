<?php
	
	$f_name = array('David', 'Kalle', 'Rune');
	$l_name = array('Johansson', 'Rosqvist', 'Körnefors');
	
	shuffle($f_name);
	shuffle($l_name);
	
	/* $output = '<ul>';
	for ($i = 0; $i < count($f_name); $i++) {
		$output .= '<li>'.$f_name[$i].' '.$l_name[$i].'</li>'; // List!
	}
	$output .= '</ul>'; */
	
	$output = "";
	for ($i=0; $i<3; $i++) {
		$output .= $f_name[$i] . " " . $l_name[$i] . "<br>";
	}
	
?>



<!DOCTYPE html>

<html>
	
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	
	<body>
		<?php echo $output; ?>
	</body>
	
</html>