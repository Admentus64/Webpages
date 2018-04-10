// JavaScript Document



// ---------- Global Variables ----------
var category1;                                                          // Reference to the section containing all categories and their items
var categoryChoices1;                                                   // Reference to the category radio buttons
var header1;                                                            // Reference to the header of the main section containing the category information
var list1;												                // Reference to main section containing the topic information



// ---------- Functions ----------
function init() {   // Initialization of the program
    
    // Equipment list section
    category1 = document.getElementById("category1");
    categoryChoices1 = document.getElementById("categoryChoices1").getElementsByTagName("input");
    header1 = document.getElementById("header1");
    list1 = document.getElementById("list1");
    
    prepareHeader(categoryChoices1, header1);                                                           // Prepare category header
    equipment.init("../scripts/fishingGuide/equipmentList.json", list1, categoryChoices1, category1);   // Initialize dynamic code - read in all category items, present them and make the changable
    
    // The code will automatically apply the amount of items for each category. The category however is static. So adding more categories must also be reflected in the HTML code.
    // Is this an issue? Must the categories be decided dynamic based on the json code? Not in this project, there are only a finite amount of categories (5 currently).
    // It is very simple to add another category, just add it in the responding HTML code.
    // Having a dynamic amount of items allows for having different amount of items in each category. No longer is each category required to have 5 items. Have 4 items for example, works perfectly.
        
} // End init

addListener(window, "load", init);                                      // Load the page