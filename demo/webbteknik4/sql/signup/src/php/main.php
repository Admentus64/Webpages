<?php

//--------------------------------------------------------------------------
// Includes
//--------------------------------------------------------------------------

include './../common/php/auth.php';
include './../common/php/mysqli.php';
include './../common/php/error.php';

//--------------------------------------------------------------------------
// Constants
//--------------------------------------------------------------------------

/**
 *  @var string INVALID_USER Invalid user message
 */
define('INVALID_USER', 'We already have a user with the username or email address. Please try a different user name or verify that you do not already have a user account.');

/**
 *  @var string MISSING_DATA Missing data message
 */
define('MISSING_DATA', 'Please enter a name, password and email address to conduct a valid registration.');

/**
 *  @var string MYSQL_ERROR MySQL error message
 */
define('MYSQL_ERROR', 'A technical error occurred during your registration. Please make a new registration attempt.');

/**
 *  @var string LOGIN_EXAMPLE Path to login example
 */
define('LOGIN_EXAMPLE', './../signin/');

//--------------------------------------------------------------------------
// Functions
//--------------------------------------------------------------------------

/**
 *  Checks if resource request includes POST data. If POST data exist, we 
 *  can assume that a user registration shall be carried out.
 *
 *  @return void
 */
function check_for_post_data() {
    if (count($_POST) > 0) {
        handle_registration_post();
    }
}

/**
 *  Verifies the contents of the POST data.
 *
 *  @return void
 */
function handle_registration_post() {
    $username = @$_POST['username'];
    $password = @$_POST['password'];
    $email    = @$_POST['email'];

    if (!empty($username) && 
        !empty($password) &&
        !empty($email)) {
        $success = perform_registration($username, $password, $email);
        if ($success === TRUE) header('location: '.LOGIN_EXAMPLE);
    } else {
        set_error(MISSING_DATA);
    }
}

/**
 *  Performs the actual registration of a new user.
 *
 *  @param string $username New user's username
 *  @param string $password New user's password
 *  @param string $email    New user's email
 *
 *  @return boolean Whether the registration was successful or not
 */
function perform_registration($username, $password, $email) {
    $success = FALSE;
    $valid = is_valid_user($username, $email);

    if ($valid === TRUE) {
        $success = insert_new_user(
            $username, 
            $password, 
            $email
        );

        if ($success === FALSE) {
            set_error(MYSQL_ERROR);
        }

    } else {
        set_error(INVALID_USER);
    }

    return $success;
}

/**
 *  Checks if the specified user name or email address already exists 
 *  in the database.
 *
 *  @param string $username Username
 *  @param string $email    Email
 *
 *  @return boolean Whether the user is invalid or not
 */
function is_valid_user($username, $email) {
    global $connection;
    if (isset($connection) === TRUE) {
        $query = "
            SELECT 
                *
            FROM 
                user 
            WHERE 
                username = '$username'
            OR 
                email = '$email'
            LIMIT 
                1
        ";

        $results  = mysqli_query($connection, $query);
        $num_rows = mysqli_num_rows($results);
        return ($num_rows == 0) ? TRUE : FALSE;
    }
}

/**
 *  Save a new user in the database.
 *
 *  @param string $username New user's username
 *  @param string $password New user's password
 *  @param string $email    New user's email
 *
 *  @return boolean Whether the registration was successful or not
 */
function insert_new_user($username, $password, $email) {
    global $connection;
    $password = sha1($password); //@NOTE: We will look for better alternatives in future courses
    if (isset($connection) === TRUE) {
        $query = "
            INSERT INTO 
                user (username, password, email)
            VALUES (
                '$username',
                '$password',
                '$email'
            ) 
        ";

        return mysqli_query($connection, $query);
    }
}

//--------------------------------------------------------------------------
// Bootstrap
//--------------------------------------------------------------------------

authenticate_user('user_id', './../auth/');
check_for_post_data();

?>