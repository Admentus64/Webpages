<?php

// SCRIPT FILE TO REMOVE USERS

require_once '../user/Users.php'; // RELATIVE PATH

$id = @$_GET['id'];
if (isset($id)) {
	$users = new Users();
	$users->deleteUser($id);
}

header('location: ../../../'); // RELATIVE PATH

?>
