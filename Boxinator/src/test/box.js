// JavaScript Document
// Author: Robert Willem Hallink

var Tests = {   // Start Dynamic Class: Tests
    
    // Class Functions
    
    // Test the name for boxes
    name: function() {   // Start Function: name
        
        var args = Array.prototype.slice.call(arguments);           // Pass the arguments into a new array
        return args.every(Logic.checkName);                         // Check if each array element passes the name check
    
    }, // End Function: name
    
    
    
    // Test the weight for boxes
    weight: function() {   // Start Function: weight
        
        var args = Array.prototype.slice.call(arguments);           // Pass the arguments into a new array
        return args.every(Logic.checkWeight);                       // Check if each array element passes the weight check
        
    }, // End Function: weight
    
    
    
    // Test the color for boxes
    color: function() {   // Start Function: color
        
        var args = Array.prototype.slice.call(arguments);           // Pass the arguments into a new array
        return args.every(Logic.checkBlueColor);                    // Check if each array element passes the color check
        
    }, // End Function: color
    
    
    
    // Test the color for boxes
    removeBlue: function() {   // Start Function: removeBlue
        
        var args = arguments[0];
        return Logic.removeBlueColor(args);
        
    }, // End Function: removeBlue
    
    
    
    // Test the country for boxes
    country: function() {   // Start Function: country
        
        var args = Array.prototype.slice.call(arguments);           // Pass the arguments into a new array
        return args.every(Logic.checkCountry);                      // Check if each array element successfully passes the country check
        
    }, // End Function: country
    
    
    
    // Test the multiplier for boxes
    multiplier: function() {   // Start Function: multiplier
        
        var args = Array.prototype.slice.call(arguments);           // Pass the arguments into a new array
        return args.every(Logic.checkMultiplier);                   // Check if each array element successfully passes the multiplier check
        
    }, // End Function: multiplier
    
    
    
    // Test the multiplier in combination with the country for boxes
    multiplierMatchesCountry: function() {   // Start Function: multiplierMatchesCountry
        
        var args = Array.prototype.slice.call(arguments);           // Pass the arguments into a new array
        return args.every(                                          // Check if each array element successfully passes the multiplier matches country check
            function() { return Logic.checkMultiplierMatchesCountry(arguments[0][0], arguments[0][1]); }
        );
        
    }, // End Function: multiplierMatchesCountry
    
    
    
    // Test the values for boxes if it contains values
    boxArray: function() {   // Start Function: boxArray
        
        var args = Array.prototype.slice.call(arguments);           // Pass the arguments into a new array
        return args.every(Logic.checkArray);                        // Check if each array element successfully passes the empty array check
        
    }, // End Function: boxArray
    
    
    
    // Test the values for a table to add into the database
    addBoxArray: function() {   // Start Function: addBoxArray
        
        var args = Array.prototype.slice.call(arguments);           // Pass the arguments into a new array
        return args.every(Logic.checkFormToAdd);                    // Check if each array element successfully passes the form check
        
    }, // End Function: addBoxArray
    
}; // End Dynamic Class: Tests