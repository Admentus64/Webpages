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
 *  @var string LOGIN_EXAMPLE Path to login example
 */
define('AUTH_EXAMPLE', './../auth/');

/**
 *  @var string INVALID_LOGIN_MESSAGE Invalid login message
 */
define('INVALID_LOGIN_MESSAGE', 'Could not log in user with the specified credentials. Please Check your login information and try again.');

/**
 *  @var string MISSING_LOGIN_DATA_MESSAGE ...
 */
define('MISSING_LOGIN_DATA_MESSAGE', 'You must specify both an email address and a password to be able to sign in.');

//--------------------------------------------------------------------------
// Functions
//--------------------------------------------------------------------------

/**
 *  Checks if resource request includes POST data. If POST data exist, we 
 *  can assume that a user login shall be carried out.
 *
 *  @return void
 */
function check_for_post_data() {
    if (count($_POST) > 0) {
        handle_login_post();
    }
}

/**
 *  ...
 *
 *  @return void
 */
function handle_login_post() {
    $password = @$_POST['password'];
    $email    = @$_POST['email'];

    if (!empty($password) &&
        !empty($email)) {
        $user = check_user_credentials($password, $email);
        if ($user !== NULL) sign_in_user($user);
        else set_error(INVALID_LOGIN_MESSAGE);
    } else {
        set_error(MISSING_LOGIN_DATA_MESSAGE);
    }
}

/**
 *  ...
 *
 *  @return boolean
 */
function check_user_credentials($password, $email) {
    global $connection;
    $password = sha1($password); //@NOTE: We will look for better alternatives in future courses
    if (isset($connection) === TRUE) {
        $query = "
            SELECT 
                *
            FROM 
                user 
            WHERE 
                password = '$password'
            AND 
                email = '$email'
            LIMIT 
                1
        ";

        $results  = mysqli_query($connection, $query);
        $user     = mysqli_fetch_assoc($results);

        return $user;
    }

    return NULL;
}

/**
 *  Sign in a user
 *
 *  @param array $user User data of user to sign in
 *
 *  @return void
 */
function sign_in_user($user) {
    session_start();
    $_SESSION['user_id'] = $user['id'];
    header('location: '.AUTH_EXAMPLE);
}

//--------------------------------------------------------------------------
// Bootstrap
//--------------------------------------------------------------------------

authenticate_user('user_id', './../auth/');
check_for_post_data();

?>