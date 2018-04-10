// JavaScript Document
// Author: Group 10

var Ajax = {   // Start Static Class: Ajax
    
    // Class Variables
    smapiUri: "https://cactuar.lnu.se/course/1me302/",
    smapiKey: "?key=cOU-RQ9n",
    databasePath: "src/json/",
    
    
    
    // Class Methods    
    request: function(controller, methods, specificFilter, isSet) {   // Start Method: request
        
        var xhr;
        
        if (XMLHttpRequest)
        	xhr = new XMLHttpRequest();
        else if (ActiveXObject)
        	xhr = new ActiveXObject("Microsoft.XMLHTTP");
        else {
        	alert("Tyvärr inget stöd för AJAX, så listan kan inte läsas in");
        	return false;
        }
        
        if (methods.constructor !== Array) {
            arr = [methods];
            methods = arr;
        }
        
        if (controller.indexOf("&controller") < 0)
            xhr.open("GET", Ajax.databasePath + controller + ".json", true);
        else xhr.open("GET", Ajax.smapiUri + Ajax.smapiKey + controller, true);
        xhr.send(null);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var json = JSON.parse(xhr.responseText);
                for (var i=0; i<methods.length; i++)
                    methods[i](json, specificFilter, isSet);
            }
        };
    
    }, // End Method: request
    
}; // End Static Class: Ajax



Event.add(window, "load", Ajax.init);						// Active function init when the page is loaded