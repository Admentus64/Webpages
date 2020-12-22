// JavaScript Document
// Author: Robert Willem Hallink

var Logic = { // Start Static Class: Logic
    
    // Class Functions
    
    // Check if each array element successfully passes the name check
    checkName: function(name) {   // Start Function: checkName
        
        if (name === undefined || name === null || arguments.length === 0 || Array.isArray(name))
            return false;
        
        if (name.length <= 30)
            return true;
        return false;
    
    }, // End Function: checkName
    
    
    
    // Check if each array element successfully passes the weight check
    checkWeight: function(weight) {   // Start Function: checkWeight
        
        if (weight === undefined || weight === null || arguments.length === 0 || Array.isArray(weight))
            return false;
        
        weight = weight.toString();
        var exp = new RegExp(/^\d*\.?\d{0,2}$/);
        if (exp.test(weight) && weight.length <= 10) {
            if (weight === "")
                return true;
            return true;
        }
        return false;
    
    }, // End Function: checkWeight
    
    
    
    // Check if each array element successfully passes the blue color check
    checkBlueColor: function(color) {   // Start Function: checkBlueColor
        
        const b = color.substr(5, 2);
        if (parseInt(b, 16) > 0)
            return false;
        return true;
    
    }, // End Function: checkBlueColor
    
    
    
    // Check if each a color string successfully returns the color without blue in it
    removeBlueColor: function(color) {   // Start Function: removeBlueColor
        
        return color.substr(0, 5) + "00";
          
    }, // End Function: removeBlueColor
    
    
    
    // Check if each array element successfully passes the country check
    checkCountry: function(country) {   // Start Function: checkCountry
        
        var options = Array.from(document.getElementById("country").options).map(e => e.value);
        for (const elem of options)
            if (elem === country)
                return true;
        return false;
        
    }, // End Function: checkCountry
    
    
    
    // Check if each array element successfully passes the multiplier check
    checkMultiplier: function(multiplier) {   // Start Function: checkMultiplier
        
        var options = Array.from(document.getElementById("country").options).map(e => e.getAttribute("data-multiplier"));
        for (const elem of options)
            if (parseFloat(elem) === parseFloat(multiplier))
                return true;
        return false;
        
    }, // End Function: checkMultiplier
    
    
    
    // Check if each array element successfully passes the multiplier check
    checkMultiplierMatchesCountry: function(country, multiplier) {   // Start Function: checkMultiplierMatchesCountry
        
        var options = Array.from(document.getElementById("country").options);
        for (i=0; i<options.length; i++)
            if (country === options[i].value && parseFloat(multiplier) === parseFloat(options[i].getAttribute("data-multiplier")))
                return true;
        return false;
        
    }, // End Function: checkMultiplierMatchesCountry
    
    
    
    // Check if each array element successfully passes the empty array check
    checkArray: function(form) {   // Start Function: checkArray
        
        if (form.length !== 5)
            return false;
        
        return form.every(
            function(elem) {
                return elem !== undefined && elem !== null && elem !== "";
            }
        );
        
    }, // End Function: checkArray
    
    
    
    // Check if each array element successfully passes all previous check in order to be added into the database
    checkFormToAdd: function(form) {   // Start Function: checkFormToAdd
        
        if (!Logic.checkArray(form))
            return false;
        if (!Logic.checkName(form[0]))
            return false;
        if (!Logic.checkWeight(form[1]))
            return false;
        if (!Logic.checkBlueColor(form[2]))
            return false;
        if (!Logic.checkCountry(form[3]))
            return false;
        if (!Logic.checkMultiplier(form[4]))
            return false;
        if (!Logic.checkMultiplierMatchesCountry(form[3], form[4]))
            return false;
        
        return true;
        
    }, // End Function: checkFormToAdd
    
}; // End Static Class: Logic