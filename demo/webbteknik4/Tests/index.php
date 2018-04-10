<?php
	
	class MyFirstClass {
		
		public $message = "Hello World! ";
		protected $semiSecret = "PHP is fun! ";
		private $secret = "JavaScript > PHP! ";
	
		public function tellMeEverything() {
			echo $this->message;
			echo $this->semiSecret;
			echo $this->secret;
		}
		
	}
	
	class BestFriend extends MyFirstClass {
		
		public function __construct() {
			echo $this->semiSecret;		// PHP is fun
			echo $this->secret;		// Error
		}
		
	}
	
	$myFirstInstance = new MyFirstClass();
	//echo $myFirstInstance->message;		// Hello World!
	//echo $myFirstInstance->semiSecret;		// Error
	//echo $myFirstInstance->secret;		// Error
	$myFirstInstance->tellMeEverything();		// Hello World! PHP is fun! JavaScript > PHP!
	
?>