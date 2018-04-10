<?php

//--------------------------------------------------------------------------
// Constants
//--------------------------------------------------------------------------

/**
 *	@var string MYSQL_LOCATION Database IP or DNS address
 */
define('MYSQL_LOCATION', 'localhost');

/**
 *	@var string MYSQL_USERNAME Username for the database account
 */
define('MYSQL_USERNAME', 'demo');

/**
 *	@var string MYSQL_PASSWORD Password for the database account
 */
define('MYSQL_PASSWORD', 'password');

/**
 *	@var string MYSQL_DATABASE Database of the DBMS
 */
define('MYSQL_DATABASE', '1me324');

//--------------------------------------------------------------------------
// Variabels
//--------------------------------------------------------------------------

/**
 *  @var resource $connection Reference to the database connection, use this link for communication with the database
 */
$connection = establish_database_connection();

//--------------------------------------------------------------------------
// Functions
//--------------------------------------------------------------------------

/**
 *  Trying to establish a valid connection to the database. Successful 
 *  attempts results in a link to the database, failed attempt results in 
 *  FALSE. Login details are available through the config file (config.php)
 *
 *  @return mixed
 */
function establish_database_connection() {
    $connection = mysqli_connect(
        MYSQL_LOCATION,
        MYSQL_USERNAME,
        MYSQL_PASSWORD,
        MYSQL_DATABASE
    );

    return $connection;
}

?>