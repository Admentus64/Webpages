// JavaScript Document



// ---------- Global Variables ----------
var topics;                                                         // Reference to the topic checkbox buttons
var list;									                        // Reference to main section containing the topic information
var header;                                                         // Reference to the header of the main section containing the topic information



// ---------- Functions ----------
function init() {   // Initialization of the program
    
    // Refer to HTML elements
    topics = document.getElementById("topics").getElementsByTagName("input");
    list = document.getElementById("list");
    header = document.getElementById("header");
    
    // Prepare the payload (in other words, prepare SMAPI)
    payload.init("&controller=restaurant&method=getAll", list, topics);
    
} // End init

addListener(window, "load", init);                                  // Load the page