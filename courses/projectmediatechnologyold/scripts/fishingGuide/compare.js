// JavaScript Document



// ---------- Global Variables ----------
var category1;                                                          // Reference to the section containing all item categories and topic items
var categoryChoices1;                                                   // Reference to the topic radio buttons
var categoryHeader1;                                                    // Reference to the header of the main section containing the topic information
var list1;                                                              // Reference to main section containing the topic information

var category2;                                                          // Reference to the section containing all item categories and topic items
var categoryChoices2;                                                   // Reference to the topic radio buttons
var categoryHeader2;                                                    // Reference to the header of the main section containing the topic information
var list2;                                                              // Reference to main section containing the topic information



// ---------- Functions ----------
function init() {   // Initialization of the program
    
    // Left compare section
    category1 = document.getElementById("category1");
    categoryChoices1 = document.getElementById("categoryChoices1").getElementsByTagName("input");
    categoryHeader1 = document.getElementById("header1");
    list1 = document.getElementById("list1");
    
    // Right compare section
    category2 = document.getElementById("category2");
    categoryChoices2 = document.getElementById("categoryChoices2").getElementsByTagName("input");
    categoryHeader2 = document.getElementById("header2");
    list2 = document.getElementById("list2");
    
    // Prepare category headers
    prepareHeader(categoryChoices1, categoryHeader1);
    prepareHeader(categoryChoices2, categoryHeader2);
    
    // Initialize dynamic code - read in all category items, present them and make the changable
    equipment.init("../scripts/fishingGuide/equipmentList.json", list1, categoryChoices1, category1);
    equipment.init("../scripts/fishingGuide/equipmentList.json", list2, categoryChoices2, category2);
    
    // The code will automatically apply the amount of items for each category. The category however is static. So adding more categories must also be reflected in the HTML code.
    // Is this an issue? Must the categories be decided dynamic based on the json code? Not in this project, there are only a finite amount of categories (5 currently).
    // It is very simple to add another category, just add it in the responding HTML code.
    // Having a dynamic amount of items allows for having different amount of items in each category. No longer is each category required to have 5 items. Have 4 items for example, works perfectly.
    
} // End init

addListener(window, "load", init);                                      // Load the page