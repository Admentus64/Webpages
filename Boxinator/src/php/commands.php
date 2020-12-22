<?php
	
	// Require additional PHP scripts
	require "database.php";
	
	// Code to execute on loading the script
	
	// Get the included query parameter and connect to the database
	$q = $_POST["q"];
	connect();
	
	// Call the function based on the provided query parameter
	if ($q === "Reset")
		resetTable();
	elseif ($q === "Save")
		saveBox();
	elseif ($q === "List")
		listAllBoxes();
	elseif ($q === "ListTotal")
		listTotal();
	
	// Close the database connect
	mysqli_close($_SESSION["conn"]);
	
	
	
	// PHP Functions
	
	function resetTable() {   // Start Function: resetTable
		
		// Remove the table from the database
		$sql = "DROP TABLE {$GLOBALS['database']['table']}";
		
		// Inform if the box was removed succesfully or not
		if ($_SESSION["conn"]->query($sql) === TRUE)
			echo "Table was removed successfully" . "<br>";
		else echo "Table could not be removed" . "<br>";
	
	} // End Function: resetTable
	
	
	
	function saveBox() {   // Start Function: saveBox
		
		// Check if the name and weight are properly included as parameters before continuing
		if ($_POST["name"] === "")
			echo "Failed to add box: Name was missing" . "<br>";
		if ($_POST["weight"] === "")
			echo "Failed to add box: Weight was missing" . "<br>";
		if ($_POST["name"] === "" || $_POST["weight"] === "")
			return;
		
		// Store all elements to store into the database as temporary variables
		$name          = $_POST["name"];
		$weight        = floatval($_POST["weight"]);
		$box_colour    = $_POST["colour"];
		$country	   = $_POST["country"];
		$multiplier    = floatval($_POST["multiplier"]);
		$shipping_cost = $weight * $multiplier;
		
		// Insert a new box into the database with the provided variables
		$sql = "INSERT INTO {$GLOBALS['database']['table']} (receiver, weight, box_colour, country, multiplier, shipping_cost) VALUES ('$name', '$weight', '$box_colour', '$country', '$multiplier', '$shipping_cost')";
		
		// Inform if the box was created succesfully or not
		if ($_SESSION["conn"]->query($sql) === TRUE)
			echo "Box was added successfully" . "<br>";
		else echo "Box could not be added" . "<br>";
		
	} // End Function: saveBox
	
	
	
	function listAllBoxes() {   // Start Function: listAllBoxes
		
		// Select all element from the database and load in all entries
		$sql = "SELECT * FROM {$GLOBALS['database']['table']}";
		$result = $_SESSION["conn"]->query($sql);
		if ($result === FALSE) {										// No results could be retrieved, so stop here
			echo "Boxes could not be listed" . "<br>";
			echo "[end-info]";
			return;
		}
		
		// Success
		echo "Boxes are listed successfully" . "<br>";
		echo "[end-info]";
		
		// Initial table formulation for the HTML
		echo "<tr>";
		echo 	"<th>Receiver</th>";
		echo 	"<th>Weight</th>";
		echo 	"<th>Box colour</th>";
		echo 	"<th>Country</th>";
		echo 	"<th>Shipping cost</th>";
		echo "</tr>";
		
		// Start printing all elements from the table back to the script that called it
		while($row = mysqli_fetch_array($result)) {	
			echo "<tr>";
				echo "<td>" . $row['receiver'] . "</td>";
				if (floatval($row["weight"]) <= 1)
					echo "<td>" . floatval($row["weight"]) . " kilogram</td>";
				else echo "<td>" . floatval($row["weight"]) . " kilograms</td>";
				echo '<td style="background-color:' . $row['box_colour'] . '"></td>';
				echo "<td>" . $row['country'] . "</td>";
				echo "<td>" . floatval($row["shipping_cost"]) . " SEK</td>";
			echo "</tr>";
		}
		
	} // End Function: listAllBoxes
	
	
	
	// Retrieve a single column from the database, and get it's total value
	function listTotal() {   // Start Function: listTotal
		
		// Retrieve which element to get from the database
		$elem = $_POST["elem"];
		
		// Select that element from the database and load in all entries
		$sql = "SELECT {$elem} FROM {$GLOBALS['database']['table']}";
		$result = $_SESSION["conn"]->query($sql);
		if ($result === FALSE) {										// No results could be retrieved, so stop here
			echo "Totals could not be listed" . "<br>";
			echo "[end-info]";
			return;
		}
		
		// Success
		echo "Totals are listed successfully" . "<br>";
		echo "[end-info]";
		
		// Start calculating from 0, and keep adding with each new row, finally print it back to the script that called it
		$total = 0;
		while($row = mysqli_fetch_array($result)) {	
			$total	+= floatval($row[$elem]);
		}
		echo $total;
		
	} // End Function: listTotal
	
?>