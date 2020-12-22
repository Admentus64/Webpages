// JavaScript Document
// Author: Robert Willem Hallink

var RunTests = {   // Start Static Class: RunTests
    
    // Class Functions
    
    // Run tests concerning the names of boxes
    name: function() {   // Start Function: name
        
        describe('#Logic.checkName()', function() {
            
            context('with number argument', function() {
                it('should return true',  function()   { expect(Tests.name("Red Box", "Blue Box", "Gray Box")).to.equal(true); });
                it('should return false', function()   { expect(Tests.name("Super Super Super Super Super Box", "Mega Mega Mega Mega Mega Mega Box")).to.equal(false); });
            });
            
        });
        
    }, // End Function: name
    
    
    
    // Run tests concerning the weights of boxes
    weight: function() {   // Start Function: weight
        
        describe('#Logic.checkWeight()', function() {
            
            context('with weight as string argument', function() {
                it('should return true',  function()   { expect(Tests.weight("1", "2", "3")).to.equal(true); });
                it('should return false', function()   { expect(Tests.weight("1", "2", "3..5")).to.equal(false); });
                it('should return false', function()   { expect(Tests.weight("-1", "-2", "-3")).to.equal(false); });
            });
            
            context('with weight as number argument', function() {
                it('should return true',  function()   { expect(Tests.weight(1, 2, 3)).to.equal(true); });
                it('should return false', function()   { expect(Tests.weight(1, 2, 3.555)).to.equal(false); });
                it('should return false', function()   { expect(Tests.weight(-1, -2, -3)).to.equal(false); });
            });
            
            context('with non-number arguments', function() {
                it('should throw false', function()    { expect(Tests.weight(1, 2, '3', [4, 5], [5])).to.equal(false); });
                it('should throw false', function()    { expect(Tests.weight(1, 2, '3', [4], [5])).to.equal(false); });
                it('should throw false', function()    { expect(Tests.weight("A", "B", "C", "D", "1A")).to.equal(false); });
            });
            
            context('with large-value or negative-value arguments', function() {
                it('should return false', function()   { expect(Tests.weight(1.111, 12345678901234567890, -3, -3.1, -3.123)).to.equal(false); });
                it('should return false', function()   { expect(Tests.weight("1.111", "12345678901234567890", "-3", "-3.1", "-3.123")).to.equal(false); });
            });
            
        });
        
    }, // End Function: weight
    
    
    
    // Run tests concerning the blue colors of boxes
    color: function() {   // Start Function: color
        
        describe('#Logic.checkBlueColor()', function() {
            
            context('with color as string argument', function() {
                it('should return true',  function()   { expect(Tests.color("#FFFF00", "#000000", "#A4CD00", "#ABCD00")).to.equal(true); });
                it('should return false', function()   { expect(Tests.color("#FFFF10", "#0000FF", "#A4CD0A", "#ABCD01")).to.equal(false); });
                it('should return false', function()   { expect(Tests.color("#GGGGGG", "#ZA0000", "A4CD00", "A4CDFF")).to.equal(false); });
            });
            
        });
        
    }, // End Function: color
    
    
    
    // Run tests concerning removing blue from the colors of boxes
    removeBlue: function() {   // Start Function: removeBlue
        
        describe('#Logic.removeBlueColor()', function() {
            
            context('with color as string argument', function() {
                it('should return "#xxxx00"', function()   { expect(Tests.removeBlue("#ABCD00")).to.equal("#ABCD00"); });
                it('should return "#xxxx00"', function()   { expect(Tests.removeBlue("#FFFF10")).to.equal("#FFFF00"); });
                it('should return "#xxxx00"', function()   { expect(Tests.removeBlue("#A4CDA0")).to.equal("#A4CD00"); });
            });
            
        });
        
    }, // End Function: removeBlue
    
    
    
    // Run tests concerning the countries of boxes
    country: function() {   // Start Function: country
        
        describe('#Logic.checkCountry()', function() {
            
            context('with country as string argument', function() {
                it('should return true',  function()   { expect(Tests.country("Sweden", "China", "Brazil", "Australia")).to.equal(true); });
                it('should return false', function()   { expect(Tests.country("Netherlands", "United Kingdom", "United States", "Spain")).to.equal(false); });
            });
            
            context('with multiplier as string argument', function() {
                it('should return false', function()   { expect(Tests.country("1.3", "4.0", "8.6", "7.2")).to.equal(false); });
                it('should return false', function()   { expect(Tests.country("2.0", "3.0", "5.5", "7.3")).to.equal(false); });
            });
            
            context('with multiplier as float argument', function() {
                it('should return false', function()   { expect(Tests.country(1.3, 4.0, 8.6, 7.2)).to.equal(false); });
                it('should return false', function()   { expect(Tests.country(2.0, 3.0, 5.5, 7.3)).to.equal(false); });
            });
            
        });
        
    }, // End Function: country
    
    
    
    // Run tests concerning the multiplier values linked to the countries of boxes
    multiplier: function() {   // Start Function: multiplier
        
        describe('#Logic.checkMultiplier()', function() {
            
            context('with country as string argument', function() {
                it('should return false', function()   { expect(Tests.multiplier("Sweden", "China", "Brazil", "Australia")).to.equal(false); });
                it('should return false', function()   { expect(Tests.multiplier("Netherlands", "United Kingdom", "United States", "Spain")).to.equal(false); });
            });
            
            context('with multiplier as string argument', function() {
                it('should return true',  function()   { expect(Tests.multiplier("1.3", "4.0", "8.6", "7.2")).to.equal(true); });
                it('should return false', function()   { expect(Tests.multiplier("2.0", "3.0", "5.5", "7.3")).to.equal(false); });
            });
            
            context('with multiplier as float argument', function() {
                it('should return true',  function()   { expect(Tests.multiplier(1.3, 4.0, 8.6, 7.2)).to.equal(true); });
                it('should return false', function()   { expect(Tests.multiplier(2.0, 3.0, 5.5, 7.3)).to.equal(false); });
            });
            
        });
        
    }, // End Function: multiplier
    
    
    
    // Run tests concerning the multiplier values linked to the countries of boxes
    multiplierMatchesCountry: function() {   // Start Function: multiplierMatchesCountry
        
        describe('#Logic.checkMultiplierMatchesCountry()', function() {
            
            context('with multiplier and country as string argument', function() {
                it('should return true',  function()   { expect(Tests.multiplierMatchesCountry(["Sweden", "1.3"], ["China", "4.0"])).to.equal(true); });
                it('should return false', function()   { expect(Tests.multiplierMatchesCountry(["Sweden", "1.5"], ["China", "4.1"])).to.equal(false); });
                it('should return false', function()   { expect(Tests.multiplierMatchesCountry(["China", "1.3"], ["Sweden", "4.0"])).to.equal(false); });
                it('should return false', function()   { expect(Tests.multiplierMatchesCountry(["Netherlands", "1.3"], ["Danmark", "4.0"])).to.equal(false); });
                it('should return false', function()   { expect(Tests.multiplierMatchesCountry(["Sweden", "1.3"], ["Netherlands", "1.3"], ["Danmark", "4.0"])).to.equal(false); });
            });
            
        });
        
    }, // End Function: multiplierMatchesCountry
    
    
    
    // Run tests concerning the values for a box that could be empty to add into a table
    boxArray: function() {   // Start Function: boxArray
        
        describe('#Logic.checkArray()', function() {
            
            context('with form elements as array argument', function() {
                it('should return true',  function()   { expect(Tests.boxArray( [ "Box01", "1",       "#FF0000", "Sweden", "1.3" ] )).to.equal(true);  });
                it('should return true',  function()   { expect(Tests.boxArray( [ "Box02", "999999",  "#FF0000", "Sweden", "1.3" ] )).to.equal(true);  });
                it('should return true',  function()   { expect(Tests.boxArray( [ "Box03", "1.5",     "#ABCD00", "China",  "4.0" ] )).to.equal(true);  });
                it('should return true',  function()   { expect(Tests.boxArray( [ "Box04", "500",     "#ABCD00", "China",  "4.0" ] )).to.equal(true);  });
                it('should return true',  function()   { expect(Tests.boxArray( [ "Box05", "0",       "#ABCD00", "China",  "4.0" ] )).to.equal(true);  });
                it('should return true',  function()   { expect(Tests.boxArray( [ "Box06", "1",       "#ABCD00", "China",  "4.2" ] )).to.equal(true);  });
                it('should return false', function()   { expect(Tests.boxArray( [ "Box07", "-1.5",    "#ABCDEF", "China",  "4.0" ] )).to.equal(true);  });
                it('should return false', function()   { expect(Tests.boxArray( [ "Box08", null,      "#FF0000", "Sweden", "1.3" ] )).to.equal(false); });
                it('should return false', function()   { expect(Tests.boxArray( [ "Box09", undefined, "#FF0000", "Sweden", "1.3" ] )).to.equal(false); });
                it('should return false', function()   { expect(Tests.boxArray( [ "Box10",            "#FF0000", "Sweden", "1.3" ] )).to.equal(false); });
                it('should return false', function()   { expect(Tests.boxArray( [ "Box11", "",        "#FF0000", "Sweden", "1.3" ] )).to.equal(false); });
                it('should return false', function()   { expect(Tests.boxArray( [ null,    undefined,            "",       "1.3" ] )).to.equal(false); });
            });
            
            context('with form elements as array argument (with some parameters as numbers)', function() {
                it('should return true',  function()   { expect(Tests.boxArray( [ "Box01", 1,         "#FF0000", "Sweden", 1.3 ] )).to.equal(true);  });
                it('should return true',  function()   { expect(Tests.boxArray( [ "Box02", 999999,    "#FF0000", "Sweden", 1.3 ] )).to.equal(true);  });
                it('should return true',  function()   { expect(Tests.boxArray( [ "Box03", 1.5,       "#ABCD00", "China",  4.0 ] )).to.equal(true);  });
                it('should return true',  function()   { expect(Tests.boxArray( [ "Box04", 500,       "#ABCD00", "China",  4.0 ] )).to.equal(true);  });
                it('should return true',  function()   { expect(Tests.boxArray( [ "Box05", 0,         "#ABCD00", "China",  4.0 ] )).to.equal(true);  });
                it('should return true',  function()   { expect(Tests.boxArray( [ "Box06", 1,         "#ABCD00", "China",  4.2 ] )).to.equal(true);  });
                it('should return false', function()   { expect(Tests.boxArray( [ "Box07", -1.5,      "#ABCDEF", "China",  4.0 ] )).to.equal(true);  });
                it('should return false', function()   { expect(Tests.boxArray( [ "Box08", null,      "#FF0000", "Sweden", 1.3 ] )).to.equal(false); });
                it('should return false', function()   { expect(Tests.boxArray( [ "Box09", undefined, "#FF0000", "Sweden", 1.3 ] )).to.equal(false); });
                it('should return false', function()   { expect(Tests.boxArray( [ "Box10",            "#FF0000", "Sweden", 1.3 ] )).to.equal(false); });
                it('should return false', function()   { expect(Tests.boxArray( [ "Box11", "",        "#FF0000", "Sweden", 1.3 ] )).to.equal(false); });
                it('should return false', function()   { expect(Tests.boxArray( [ null,    undefined,            "",       1.3 ] )).to.equal(false); });
            });
            
        });
        
    }, // End Function: boxArray
    
    
    
    // Run tests concerning the values for a box that is ready to be added into a table
    addBoxArray: function() {   // Start Function: addBoxArray
        
        describe('#Logic.checkFormToAdd()', function() {
            
            context('with form elements as array argument', function() {
                it('should return true',  function()   { expect(Tests.addBoxArray( [ "Box01", "1",       "#FF0000", "Sweden", "1.3" ] )).to.equal(true);  });
                it('should return true',  function()   { expect(Tests.addBoxArray( [ "Box02", "999999",  "#FF0000", "Sweden", "1.3" ] )).to.equal(true);  });
                it('should return true',  function()   { expect(Tests.addBoxArray( [ "Box03", "1.5",     "#ABCD00", "China",  "4.0" ] )).to.equal(true);  });
                it('should return true',  function()   { expect(Tests.addBoxArray( [ "Box04", "500",     "#ABCD00", "China",  "4.0" ] )).to.equal(true);  });
                it('should return true',  function()   { expect(Tests.addBoxArray( [ "Box05", "0",       "#ABCD00", "China",  "4.0" ] )).to.equal(true);  });
                it('should return true',  function()   { expect(Tests.addBoxArray( [ "Box06", "1",       "#ABCD00", "China",  "4.2" ] )).to.equal(false); });
                it('should return false', function()   { expect(Tests.addBoxArray( [ "Box07", "-1.5",    "#ABCDEF", "China",  "4.0" ] )).to.equal(false); });
                it('should return false', function()   { expect(Tests.addBoxArray( [ "Box08", null,      "#FF0000", "Sweden", "1.3" ] )).to.equal(false); });
                it('should return false', function()   { expect(Tests.addBoxArray( [ "Box09", undefined, "#FF0000", "Sweden", "1.3" ] )).to.equal(false); });
                it('should return false', function()   { expect(Tests.addBoxArray( [ "Box10",            "#FF0000", "Sweden", "1.3" ] )).to.equal(false); });
                it('should return false', function()   { expect(Tests.addBoxArray( [ "Box11", "",        "#FF0000", "Sweden", "1.3" ] )).to.equal(false); });
                it('should return false', function()   { expect(Tests.addBoxArray( [ null,    undefined,            "",       "1.3" ] )).to.equal(false); });
            });
            
            context('with form elements as array argument (with some parameters as numbers)', function() {
                it('should return true',  function()   { expect(Tests.addBoxArray( [ "Box01", 1,         "#FF0000", "Sweden", 1.3 ] )).to.equal(true);  });
                it('should return true',  function()   { expect(Tests.addBoxArray( [ "Box02", 999999,    "#FF0000", "Sweden", 1.3 ] )).to.equal(true);  });
                it('should return true',  function()   { expect(Tests.addBoxArray( [ "Box03", 1.5,       "#ABCD00", "China",  4.0 ] )).to.equal(true);  });
                it('should return true',  function()   { expect(Tests.addBoxArray( [ "Box04", 500,       "#ABCD00", "China",  4.0 ] )).to.equal(true);  });
                it('should return true',  function()   { expect(Tests.addBoxArray( [ "Box05", 0,         "#ABCD00", "China",  4.0 ] )).to.equal(true);  });
                it('should return true',  function()   { expect(Tests.addBoxArray( [ "Box06", 1,         "#ABCD00", "China",  4.2 ] )).to.equal(false); });
                it('should return false', function()   { expect(Tests.addBoxArray( [ "Box07", -1.5,      "#ABCDEF", "China",  4.0 ] )).to.equal(false); });
                it('should return false', function()   { expect(Tests.addBoxArray( [ "Box08", null,      "#FF0000", "Sweden", 1.3 ] )).to.equal(false); });
                it('should return false', function()   { expect(Tests.addBoxArray( [ "Box09", undefined, "#FF0000", "Sweden", 1.3 ] )).to.equal(false); });
                it('should return false', function()   { expect(Tests.addBoxArray( [ "Box10",            "#FF0000", "Sweden", 1.3 ] )).to.equal(false); });
                it('should return false', function()   { expect(Tests.addBoxArray( [ "Box11", "",        "#FF0000", "Sweden", 1.3 ] )).to.equal(false); });
                it('should return false', function()   { expect(Tests.addBoxArray( [ null,    undefined,            "",       1.3 ] )).to.equal(false); });
            });
            
        });
        
    }, // End Function: addBoxArray
    
}; // End Dynamic Class: RunTests



// Code to execute on reading the script
RunTests.name();
RunTests.weight();
RunTests.color();
RunTests.removeBlue();
RunTests.country();
RunTests.multiplier();
RunTests.multiplierMatchesCountry();
RunTests.boxArray();
RunTests.addBoxArray();