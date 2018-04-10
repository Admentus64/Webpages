class User {
    constructor(name, email) {
        this.name = name || "John Doe";
        this.email = email || "john.doe@lnu.se";
    }
    
    sayHello() {
        console.log("Hello, my name is " + this.name);
    }
    
    sayContactInformation() {
        console.log("Send me an email at " + this.email);
    }
}

var kalle = new User("Karl Johan Rosqvist", "karl.johan.rosqvist@lnu.se");
kalle.sayHello();
kalle.sayContactInformation();

var rune = new User("Rune Körnefors", "rune.körnefors@lnu.se");
rune.sayHello();
rune.sayContactInformation();

var john = new User();
john.sayHello();
john.sayContactInformation();