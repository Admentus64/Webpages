class MyFirstClass {

	public $message = "Hello World!";

	public function tellMeEverything() {
		echo $this->message;
	}

}

$myFirstInstance = new MyFirstClass();
echo $myFirstInstance->message;			// Hello World!
$myFirstInstance->tellMeEverything();		// Hello World!