<?php

//--------------------------------------------------------------------------
// Public class
//--------------------------------------------------------------------------

/**
 *  Represents a gateway to the user table in the database
 */
class Users {

	//----------------------------------------------------------------------
	// Public constants
	//----------------------------------------------------------------------

	/**
	 *	@var string MYSQL_LOCATION Database IP or DNS address
	 */
	const MYSQL_LOCATION = 'localhost';

	/**
	 *	@var string MYSQL_USERNAME Username for the database account
	 */
	const MYSQL_USERNAME = 'demo';

	/**
	 *	@var string MYSQL_PASSWORD Password for the database account
	 */
	const MYSQL_PASSWORD = 'password';

	/**
	 *	@var string MYSQL_DATABASE Database of the DBMS
	 */
	const MYSQL_DATABASE = '1me324';

	//----------------------------------------------------------------------
	// Private properties
	//----------------------------------------------------------------------

	/**
	 *	@var $mysqli mysqli DB-link
	 */
	private $mysqli;

	//----------------------------------------------------------------------
	// Constructor method
	//----------------------------------------------------------------------

	/**
	 *  Class constructor
	 *
	 *  @return void
	 */
	public function __construct() {
		$this->initDatabaseConnection();
	}

	//----------------------------------------------------------------------
	// Public methods
	//----------------------------------------------------------------------

	/**
	 *  Checking whether we have a current communication with the 
	 *	database - True or False
	 *
	 *  @return boolean
	 */
	public function connectionIsValid() {
		return ($this->mysqli->connect_errno === 0) ? true : false;
	}

	/**
	 *  Returns an HTML representation of all users (List elements)
	 *
	 *  @return String
	 */
	public function getUsersList() {
		$output = '';
		if ($this->connectionIsValid() == TRUE) {
			$users = $this->getUsers();
			foreach ($users as $user) {
				$output .= "<li>$user->username ($user->email) - <a href='src/php/script/deleteUser.php?id=$user->id'>DELETE</a></li>";
			}
		}

		return str_replace("%l%", $output, '<ul>%l%</ul>');
	}

	/**
	 *  List containing all users from database
	 *
	 *  @return Array
	 */
	public function getUsers() {
		$output = array();
		$query = 'SELECT * FROM user';
		$result = $this->mysqli->query($query);
		while ($user = $result->fetch_object()) {
			array_push($output, $user);
		}

		return $output;
	}

	/**
	 *  Creates a new user in the database. Information 
	 *	needed is a user name, password and e-mail address
	 *
	 *	@param String $username ...
	 *	@param String $password ...
	 *	@param String $email ...
	 *
	 *  @return null
	 */
	public function createUser($username, $password, $email) {
		$password = sha1($password);
		$query = "
			INSERT INTO 
                user (username, password, email)
            VALUES (
                '$username',
                '$password',
                '$email'
            ) 
		";

		return $this->mysqli->query($query);
	}

	/**
	 *  Removes a user with specific ID from the database
	 *
	 *	@param int $id ...
	 *
	 *  @return null
	 */
	public function deleteUser($id) {
		$query = "
			DELETE FROM 
                user
            WHERE 
            	user.id = $id 
		";

		return $this->mysqli->query($query);
	}

	/**
	 *  Removes all users from the database
	 *
	 *  @return null
	 */
	public function deleteAll() {
		$query = "DELETE FROM user";
		return $this->mysqli->query($query);
	}

	//----------------------------------------------------------------------
	// Private methods
	//----------------------------------------------------------------------

	/**
	 *  Creates current database connection
	 *
	 *  @return null
	 */
	private function initDatabaseConnection() {
		$this->mysqli = new mysqli(
			self::MYSQL_LOCATION,
	        self::MYSQL_USERNAME,
	        self::MYSQL_PASSWORD,
	        self::MYSQL_DATABASE
		);

		return $this->mysqli->connect_errno;
	}
}

?>