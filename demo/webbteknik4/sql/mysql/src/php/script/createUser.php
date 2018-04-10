<?php

// SCRIPT FILE TO REMOVE USERS

require_once '../user/Users.php'; // RELATIVE PATH

$username = @$_POST['username'];
$password = @$_POST['password'];
$email    = @$_POST['email'];

if (!empty($username) &&
	!empty($password) &&
	!empty($password)) {
	$users = new Users();
	$users->createUser(
		$username,
		$password,
		$email
	);
}

header('location: ../../../'); // RELATIVE PATH

?>
