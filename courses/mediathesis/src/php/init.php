<?php
    
	// Start a new session on every page
	session_start();
	
    // Database variables
	$GLOBALS["database"]["server"] = "";												// Fill in the web address of your MySQL server
	$GLOBALS["database"]["name"] = "";													// Fill in the name of your MySQL server
	$GLOBALS["database"]["user"] = "";													// Fill in the user of your MySQL server
	$GLOBALS["database"]["password"] = "";												// Fill in the password of your MySQL server
	$GLOBALS["database"]["email"] = "";													// Fill in one of your email address where reponses should be directed to
	$GLOBALS["database"]["url"] = "";													// Fill in the URL where the project will be hosted for the welcome message
    
	/*
	 * Two MySQL tables are required for this project:
	 * - mediaThesisUsers
	 * - mediaThesisStatistics
	 * The code should automatically create both tables if they do not exist yet when being called upon to use.
	 * Table specifications are included with the code generation of both tables.
	 */
?>