<?php

//--------------------------------------------------------------------------
// Variabels
//--------------------------------------------------------------------------

/**
 *  @var array $errors List of possible errors that can occur during the login process
 */
$errors = array();

//--------------------------------------------------------------------------
// Functions
//--------------------------------------------------------------------------

/**
 *  Saves an error in the login system
 *
 *  @param string $message Message representing the error
 *
 *  @return void
 */
function set_error($message) {
    global $errors;
    array_push($errors, $message);
}

/**
 *  Gets a HTML string with a possible error
 *
 *  @return string
 */
function render_error_message($default = '') {
    global $errors;
    if (count($errors) > 0) return get_error_message($errors[0]);
    else return $default;
}

/**
 *  Compiles an error in the HTML form
 *
 *  @param string $message ...
 *
 *  @return string
 */
function get_error_message($message) {
    return "
        <h1>Oops!</h1>
        <p>$message</p>
    ";
}

?>