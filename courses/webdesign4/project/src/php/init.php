<?php
    
    // Database variables
	$GLOBALS["database"]["server"] = "1me205.lnu.se";
	$GLOBALS["database"]["name"] = "rh222ff";
	$GLOBALS["database"]["user"] = "rh222ff";
	$GLOBALS["database"]["password"] = "DHM3aRJl";
	
	
	
	// Start a new session for user login storage, start with no login active
	if (session_status() == PHP_SESSION_NONE) {
		session_start();
		$_SESSION["successfulConn"] = false;
	}
    
?>