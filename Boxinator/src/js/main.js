// JavaScript Document
// Author: Robert Willem Hallink

var Main = {   // Start Static Class: Main
    
    // Class HTML Element Variables
    name_elem:          null,
    weight_elem:        null,
    colour_elem:        null,
    country_elem:       null,
    save_elem:          null,
    listboxes_table:    null,
    
    // Class Variables
    form:               new Array(5).fill(null),
    
    
    
    // Class Functions
    
    // Function that contains all initial preparation the webpage is done loading
    init: function() {   // Start Function: init
        
        // Initialize form elements
        Main.name_elem          = document.getElementById("name");
        Main.weight_elem        = document.getElementById("weight");
        Main.colour_elem        = document.getElementById("box_colour");
        Main.country_elem       = document.getElementById("country");
        
        // Create events for form elements
        Main.name_elem.addEventListener("input", Main.changeName);
        Main.weight_elem.addEventListener("input", Main.changeWeight);
        Main.colour_elem.addEventListener("change", Main.changeColor);
        Main.country_elem.addEventListener("change", Main.changeCountry);
        
        // Create events for debug options
        document.getElementById("addbox_btn").addEventListener("click", Main.switchSection);
        document.getElementById("listboxes_btn").addEventListener("click", Main.switchSection);
        document.getElementById("save_btn").addEventListener("click", Main.saveBox);
        document.getElementById("reset_btn").addEventListener("click", Main.reset);
        document.getElementById("unit_tests_btn").addEventListener("click", function() { document.getElementById("mocha-wrapper").classList.toggle("hide"); } );
        
        // Set visible sections based on page hash
        if (location.hash !== "#addbox" && location.hash !== "#listboxes")
            location.hash = "#addbox";
        if (location.hash === "#addbox")
            document.getElementById("listboxes_div").classList.toggle("hide");
        else if (location.hash === "#listboxes") {
            document.getElementById("addbox_form").classList.toggle("hide");
            var request = new Request(document.getElementById("info_para"));
            request.run("List",                         function(response) { document.getElementById("listboxes_table").innerHTML       = response; }, true);
            request.run("ListTotal&elem=weight",        function(response) { document.getElementById("listboxes_totalWeight").innerHTML = response; }, true);
            request.run("ListTotal&elem=shipping_cost", function(response) { document.getElementById("listboxes_totalCost").innerHTML   = response; }, true);
        }
        
        // Initialize default form values
        Main.colour_elem.dispatchEvent(new Event("change", Main.changeColor));
        Main.country_elem.dispatchEvent(new Event("change", Main.changeCountry));
        
    }, // End Function: init
    
    
    
    // Function used to call upon the database to store an entry
    saveBox: function() {   // Start Function: saveBox
        
        // Only continue if all form elements are filled properly
        if (!Logic.checkFormToAdd(Main.form))
            return;
        
        // Prepare the parameters to include with the AJAX request
        str = "Save";
        str += "&name="         + Main.form[0];
        str += "&weight="       + Main.form[1];
        str += "&colour="       + Main.form[2];
        str += "&country="      + Main.form[3];
        str += "&multiplier="   + Main.form[4];
        
        // Run an AJAX command to connect with the database
        var request = new Request(document.getElementById("info_para"));
        request.run(str, null, true);
          
    }, // End Function: saveBox
    
    
    
    // Function used to call upon the database to delete the table and all it's entries
    reset: function() {   // Start Function: reset
        
        // Run an AJAX command to connect with the database
        var request = new Request(document.getElementById("info_para"));
        request.run("Reset", null, true);
          
    }, // End Function: reset
    
    
    
    // Function used to switch to another section of the webpage
    switchSection: function(e) {   // Start Function: switchSection
        
        // Change the hash of the webpage and then reload
        window.location.href = "#" + e.target.value;
        window.location.reload();
        
    }, // End Function: switchSection
    
    
    
    // Function used to store the name from the form
    changeName: function(e) {   // Start Function: changeName
        
        // Retrieve the weight value and from the HTML, check if it passed the maximum length and then store it, otherwise get the last passed value
        if (Logic.checkName(e.target.value))
            Main.form[0] = e.target.value;
        else e.target.value = Main.form[0];
        
    }, // End Function: changeName
    
    
    
    // Function used to store the weight from the form
    changeWeight: function(e) {   // Start Function: changeWeight
        
        // Retrieve the weight value and from the HTML, check if it passed the regular expression and then store it, otherwise get the last passed value
        if (Logic.checkWeight(e.target.value))
            Main.form[1] = e.target.value;
        else e.target.value = Main.form[1];
          
    }, // End Function: changeWeight
    
    
    
    // Function used to store the color from the form
    changeColor: function(e) {   // Start Function: changeColor
        
        // Retrieve the color value and from the HTML, check if it contains any blue, remove the blue from the HTML element if so and finally store it
        if (Logic.checkBlueColor)
            e.target.value = Logic.removeBlueColor(e.target.value);
        Main.form[2] = e.target.value;
    
    }, // End Function: changeColor
    
    
    
    // Function used to store the country with it's multiplier attribute from the form
    changeCountry: function(e) {   // Start Function: changeCountry
        
        // Check if the country and it's multiplier attributes exist
        if (!Logic.checkCountry(e.target.value))
            e.target.selectedIndex = 0;
        if (!Logic.checkMultiplier(e.target[e.target.selectedIndex].getAttribute("data-multiplier")))
            e.target.selectedIndex = 0;
        
        // Retrieve the country value and it's multiplier attribute from the HTML and then store it
        Main.form[3] = e.target.value;
        Main.form[4] = e.target[e.target.selectedIndex].getAttribute("data-multiplier");
        
    }, // End Function: changeCountry

}; // End Static Class: Main



// Code to execute on reading the script
window.addEventListener("DOMContentLoaded", Main.init);                 // Active function init when the DOM Content is loaded