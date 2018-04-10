<?php
    	
	function findByDeveloper($developer1, $developer2, $developer3) {
		
		$client = new MongoDB\Client("mongodb://localhost:27017");
		$collection = $client->entertainment->videogames;
		
		if ($developer1 === "") {
			printf("No results since no user input is provided. Developer #1 is required. Developer #2 and Developer #3 are optional.");
			return;
		}
		
		if ($developer2 === "" && $developer3 === "")
			$result = $collection->find(['developer.name' => $developer]);
		if ($developer2 !== "" && $developer3 === "")
			$result = $collection->find(array('developer.name' => array('$in' => array($developer1, $developer2))));
		if ($developer2 === "" && $developer3 !== "")
			$result = $collection->find(array('developer.name' => array('$in' => array($developer1, $developer3))));
		if ($developer2 !== "" && $developer3 !== "")
			$result = $collection->find(array('developer.name' => array('$in' => array($developer1, $developer2, $developer3))));
		
		echo '<ul>';
		foreach ($result as $document) {
			printf('<li>Title: %s - Developer: %s</li>', $document['title'], $document['developer.name']);
		}
		echo '</ul>';
		
	}

	function findByPublisher($publisher1, $publisher2, $publisher3) {
		
		$client = new MongoDB\Client("mongodb://localhost:27017");
		$collection = $client->entertainment->videogames;
		
		if ($publisher1 === "") {
			printf("No results since no user input is provided. Publisher #1 is required. Publisher #2 and Publisher #3 are optional.");
			return;
		}
		
		if ($publisher1 === "" && $publisher1 === "")
			$result = $collection->find(['publisher.name' => $publisher1]);
		if ($publisher1 !== "" && $publisher1 === "")
			$result = $collection->find(array('publisher.name' => array('$in' => array($publisher1, $publisher1))));
		if ($publisher1 === "" && $publisher1 !== "")
			$result = $collection->find(array('publisher.name' => array('$in' => array($publisher1, $publisher1))));
		if ($publisher1 !== "" && $publisher1 !== "")
			$result = $collection->find(array('publisher.name' => array('$in' => array($publisher1, $publisher1, $publisher1))));
		
		echo '<ul>';
		foreach ($result as $document) {
			printf('<li>Title: %s - Publisher: %s</li>', $document['title'], $document['publisher.name']);
		}
		echo '</ul>';
		
	}

	function findByReleaseDate($year, $month) {
		
		$client = new MongoDB\Client("mongodb://localhost:27017");
		$collection = $client->entertainment->videogames;
		
		if ($year === "" && $month === "") {
			printf("No results since no user input is provided. Requires at least the year or the month.");
			return;
		}
		
		if ($year !== "" && strlen($year) !== 4) {
			printf("A year consists out of 4 digits.");
			return;
		}
		
		if ($month !== "" && $month < 1 || $month > 12) {
			printf("A month must have a value between 1 and 12");
			return;
		}
		
		
		if (strlen($month) === 1)
			$month = "0" . $month;
		
		$date = "";
		if ($year !== "")
			$date .= $year;
		if ($month !== "")
			$date .= "-" . $month . "-";
		
		$result = $collection->find(['release.date' => '/' . $date . '/i']);
		
		echo '<ul>';
		foreach ($result as $document) {
			printf('<li>Title: %s - Release Date: %s</li>', $document['title'], $document['release.date']);
		}
		echo '</ul>';
		
	}

	function findByScore($minScore, $maxScore) {
		
		$client = new MongoDB\Client("mongodb://localhost:27017");
		$collection = $client->entertainment->videogames;
		
		if ($minScore === "" || $maxScore === "") {
			printf("No results since no sufficient user input is provided. Requires the minimum and maximum grade.");
			return;
		}
		
		if ($minScore < 1 || $maxScore > 10) {
			printf("The minimum and maximum grade must have a value between 1 and 10.");
			return;
		}
		
		if ($minScore > $maxScore) {
			printf("The minimum score may not execeed the maximum score.");
			return;
		}
		
		$result = $collection->find(['grade' => array('$gt' => $minScore, '$lt' => $maxScore)]);
		
		echo '<ul>';
		foreach ($result as $document) {
			printf('<li>Title: %s - Grade: %s</li>', $document, $document);
		}
		echo '</ul>';
		
	}
	
	function countAllGames() {
		
		$client = new MongoDB\Client("mongodb://localhost:27017");
		$collection = $client->entertainment->videogames;
		
		$result = $collection->count();
		
		echo '<ul>';
		foreach ($result as $document) {
			printf('<li>Title: %s - Grade: %s</li>', $document['title'], $document['grade']);
		}
		echo '</ul>';
		
	}
    	
?>