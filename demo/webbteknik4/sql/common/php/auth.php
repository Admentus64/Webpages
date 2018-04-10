<?php

//--------------------------------------------------------------------------
// Functions
//--------------------------------------------------------------------------

/**
 *  ...
 *
 *	@param string $id 		...
 *	@param string $location ...
 *
 *  @return void
 */
function authenticate_user($id, $location) {
    session_start();
    $prefix = substr($id, 0, 1);
    if ($prefix === '!') {
    	$id = substr($id, 1, strlen($id) - 1);
    	if (isset($_SESSION[$id]) === FALSE) {
    		header("location: $location");
    	}
    } else {
    	if (isset($_SESSION[$id]) === TRUE) {
    		header("location: $location");
    	}
    }
}

/**
 *  ...
 *
 *  @param string $id       ...
 *  @param string $location ...
 *
 *  @return void
 */
function sign_out_user($location) {
    session_start();
    session_unset(); 
    session_destroy();
    header("location: $location");
}

?>