// JavaScript Document



// ---------- Object info ----------
var info = {
    
    // Local variables
    table: null,                                                    // Refer to the information table for the games
    
    init: function() {   // Initialize the info object
        
        // Link the table to the document
        info.table = document.getElementById("infoTable");
        
    }, // End init
    
    add: function(title, text, link) {   // Add a new row with a title and text (link too if provided) to the table
        
        // Local variables
        var trElem, thElem, tdElem, aElem, hrefAttr;
        
        // Adding a new table row
        trElem = document.createElement("tr");                      // Create a new table row
        info.table.appendChild(trElem);                             // Add the new table row into the table
        
        // Adding a title cell
        thElem = document.createElement("th");
        thElem.appendChild(document.createTextNode(title));
        trElem.appendChild(thElem);                                 // Apply the title cell into the new table row
        
        // Adding a text cell
        tdElem = document.createElement("td");
        if (arguments.length == 3) {                                // Link is provided with the call
            hrefAttr = document.createAttribute("href");            // Create an attribute
            aElem = document.createElement("a");                    // Create an element
            hrefAttr.value = link;                                  // Apply the url to the attribute
            aElem.setAttributeNode(hrefAttr);                       // Apply the attribute to the element
            aElem.appendChild(document.createTextNode(info.addAbbr(text)));
            tdElem.appendChild(aElem);                              // Add the text with link cell into the new table row
        }
        else if (arguments.length == 2 && text instanceof Array)    // Text is an array
            for (var i=0; i<text.length; i++) {                     // Add each element from the array into a new table row
                tdElem.appendChild(document.createTextNode(info.addAbbr(text[i])));
                tdElem.appendChild(document.createElement("br"));   // Add new white line
            }
        else if (arguments.length == 2)                             // No link is provided with the call and text is not an array
            tdElem.appendChild(document.createTextNode(info.addAbbr(text)));
        trElem.appendChild(tdElem);                                 // Apply the text cell into the new table row
        
    }, // End add
    
    reset: function(type, str) {   // Clear the table
        
        // Keep emptying the table as long it is not empty
        while (info.table.hasChildNodes())
            info.table.removeChild(info.table.childNodes[0]);
       
    }, // End reset
    
    addAbbr: function(str) {   // Add an abbrevation to the provided text string if found
        
        var check = str.toLowerCase();
        
        // Nintendo series
        if (check.indexOf("nintendo wiiu") >= 0 || check.indexOf("nintendo wii u") >= 0 || check.indexOf("wiiu") >= 0 || check.indexOf("wii u") >= 0)
            return str + " (WIIU)";
        if (check.indexOf("nintendo wii") >= 0 || check.indexOf("wii") >= 0)
            return str + " (WII)";
        if (check.indexOf("nintendo gamecube") >= 0 || check.indexOf("gamecube") >= 0)
            return str + " (GCN)";
        if (check.indexOf("nintendo 64") >= 0)
            return str + " (N64)";
        if (check.indexOf("super nintendo entertainment system") >= 0 || check.indexOf("super nintendo") >= 0)
            return str + " (SNES)";
        if (check.indexOf("nintendo entertainment system") >= 0)
            return str + " (NES)";
        
        // Nintendo handheld series
        if (check.indexOf("nintendo 3d") >= 0)
            return str + " (3DS)";
        if (check.indexOf("nintendo dual screen") >= 0 || check.indexOf("nintendo ds") >= 0)
            return str + " (NDS)";
        if (check.indexOf("gameboy advance") >= 0 || check.indexOf("game boy advance") >= 0)
            return str + " (GBA)";
        if (check.indexOf("gameboy color") >= 0 || check.indexOf("game boy color") >= 0)
            return str + " (GBC)";
        if (check.indexOf("gameboy") >= 0 || check.indexOf("game boy") >= 0)
            return str + " (GB)";
        
        // Desktop systems
        if (check.indexOf("windows") >= 0)
            return str + " (PC)";
        if (check.indexOf("macintosh") >= 0)
            return str + " (MAC)";
        
        // Playstation series
        if (check.indexOf("playstation 4") >= 0)
            return str + " (PS4)";
        if (check.indexOf("playstation 3") >= 0)
            return str + " (PS3)";
        if (check.indexOf("playstation 2") >= 0)
            return str + " (PS2)";
        if (check.indexOf("playstation 1") >= 0 || check.indexOf("playstation") >= 0)
            return str + " (PS)";
        
        // Playstation handheld series
        if (check.indexOf("playstation portable") >= 0)
            return str + " (PSP)";
        if (check.indexOf("playstation vita") >= 0)
            return str + " (PS VITA)";
        
        // Xbox series
        if (check.indexOf("xbox One") >= 0)
            return str + " (XONE)";
        if (check.indexOf("xbox 360") >= 0)
            return str + " (X360)";
        if (check.indexOf("xbox") >= 0)
            return str + " (XBOX)";
        
        // Smart devices
        if (check.indexOf("iphone") >= 0 || check.indexOf("ipad") >= 0)
            return str + " (iOS)";
        
        return str;
        
    } // End addAbbr
    
}; // End object info