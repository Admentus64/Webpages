// JavaScript Document
// Author: Robert Willem Hallink

var Cookie = {   // Start Static Class: Cookie

    // Class Functions

    set: function(cname, cvalue, exdays) {   // Start Function: set
        
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        
    }, // End Function: set
    
    get: function(cname, isArray, isInteger) {   // Start Function: get
        
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        
        for (var i=0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1);
            if (c.indexOf(name) == 0) {
                if (isArray)
                    return Cookie.convertToArray(c, name, isInteger);
                else if (isInteger)
                        return parseInt(c.substring(name.length, c.length));   
                else return c.substring(name.length, c.length);
            }
        }
        return "";

    }, // End Function: get
    
    convertToArray: function(str, name, isInteger) {   // Start Function: convertToArray
        
        str = str.substring(name.length, str.length);
        if (isInteger)
            return str.split(',').map(Number);
        else return str.split(',');
        
    }, // End Function: convertToArray
    
    exists: function(cname)                                             { return (document.cookie.indexOf(cname + "=") !== -1); },                              // Function: exists
    check: function(cname, cvalue)                                      { return (Cookie.get(cname) === cvalue); },                                             // Function: check
    erase: function(cname)                                              { document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; },     // Function: erase

}; // End Static Class: Cookie