<?php

// SCRIPT FILE TO REMOVE USERS

require_once '../user/Users.php'; // RELATIVE PATH

$users = new Users();
$users->deleteAll();
// CREATE DUMMY USERS
$users->createUser('Henrik Andersen', 'password', 'henrik.andersen@lnu.se');
$users->createUser('Karl Johan Rosqvist', 'password', 'karl.johan.rosqvist@lnu.se');
$users->createUser('David Johansson', 'password', 'david.johansson@lnu.se');

header('location: ../../../'); // RELATIVE PATH

?>
