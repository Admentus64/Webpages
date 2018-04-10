var Main = {   // Start Static Class: Main
    
    // Class Variables
    pageContent: null,                                                                  // The HTML tag were new code will be appended to during execution
    clickSnd: null,                                                                     // The sound when pressing buttons
    drag: null,                                                                         // The object to link with each application so that dragging the window of an application works
    
    
    
    // Class Functions
    
    // Function that is used to initialize the web application with
    init: function() {   // Start: init
        
        // Refer to document tag elements
        Main.pageContent = document.getElementById("page-content-wrapper");                     // Refer to the page content tag (new HTML during the execution will be appended here)
        Event.add(document.getElementById("icon-dice"), "click", Main.addDiceApplication);      // Refer to the button to add a new dice application (call function addDiceApplication when clicked)
        Event.add(document.getElementById("icon-clock"), "click", Main.addClockApplication);    // Refer to the button to add a new clock application (call function addClockApplication when clicked)
        
        // Other commands
        Main.clickSnd = new Audio("src/wav/add.wav");                                   // Set an audio sound for clickSnd
        Main.drag = new DragnDrop();                                                    // Initialize a new DragNDrop object instance for drag
        
        
    }, // End: init
    
    // Function that is called when the button for adding a dice application is clicked, and will thus add a new dice application window
    addDiceApplication: function() {   // Start: addDiceAppllication
        
        Main.clickSnd.play();                                                           // Play a sound when clicking the button
        new DiceApplication();                                                          // Create a new DiceApplication object instance, no need to keep track of it (it can delete itself from within)
        
    }, // End: addDiceApplication
    
    // Function that is called when the button for adding a clock application is clicked, and will thus add a new clock application window
    addClockApplication: function() {   // Start: addClockApplication
        
        Main.clickSnd.play();                                                           // Play a sound when clicking the button
        new ClockApplication();                                                         // Create a new ClockApplication object instance, no need to keep track of it (it can delete itself from within)
        
    }, // End: addClockApplication
    
}; // End Static Class: Main



// Public Commands
Event.add(window, "load", Main.init);                                                   // Start the program by initializing the Main class (call init function)