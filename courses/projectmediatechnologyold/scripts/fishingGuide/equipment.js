// ---------- Object equipment ----------
var equipment = {   // Contains all the code for presenting items on the equipment list and compare pages
    
    init: function(filePath, list, categoryChoices, category) {   // Initialization of the program
        
        equipment.request(filePath, list, categoryChoices, category);
        
        // If checkboxes are not used, thus must be radio buttons
        $(categoryChoices).each(function(index) {
            $(categoryChoices[index]).change(function() { equipment.request(filePath, list, categoryChoices, category); });
        });
        
    },
    
	request: function(filePath, list, categoryChoices, category) {   // Make an AJAX-call to read chosen file
		
		// Parameter nr is used in url:en for chosen file that is read
		var request, currCategoryChoiceNr;										                // Object for AJAX-call
		
		// Initialize AJAX
		if (XMLHttpRequest)
			request = new XMLHttpRequest();							                            // Different objects (XMLHttpRequest or ActiveXObject), depending on browser
		else if (ActiveXObject)
			request = new ActiveXObject("Microsoft.XMLHTTP");
		else {
			alert("Tyvärr inget stöd för AJAX, så listan kan inte läsas in");
			return false;
		}
        
        // Go through each available category, stop the category loop counter at the current selected category
        for (currCategoryChoiceNr=0; currCategoryChoiceNr<categoryChoices.length; currCategoryChoiceNr++)
            if (categoryChoices[currCategoryChoiceNr].checked)
                break;
		
		// Run AJAX
		request.open("GET", filePath, true);
		request.send(null);											                            // Send request to the server
		request.onreadystatechange = function () {					                            // Function to check status in the communication
            if (request.readyState == 4 && request.status == 200)                               // When communication is ready readyState is 4 and if file exists status is 200 (OK), if OK then interpret data from read fil
                    categoryItems = equipment.getTopicItems(JSON.parse(request.responseText), list, categoryChoices, currCategoryChoiceNr, category);
        };
    		
	}, // End request
    
    getTopicItems: function(json, list, categoryChoices, currCategoryChoiceNr, category) {   // Get all the items a category contains
        
        // Local variables and setup
        var i, newForm, newFormHeader, newInput, newText;
        var listId = list.id.substring(4);
        
        if (document.getElementById("categoryItems" + listId) !== null)                         // Remove all existing items before checking the new items, the page will get to crowded otherwise
            category.removeChild(document.getElementById("categoryItems" + listId));
        
        // Prepare to inject new elements in the HTML code
        newForm = document.createElement("form");
        newForm.id = "categoryItems" + listId;
        newFormHeader = document.createElement("h1");
        newFormHeader.id = "categoryItemHeader" + listId;
        
        // Apply some of the content already into the document
        newForm.appendChild(newFormHeader);
        newForm.appendChild(document.createElement("br"));
        category.appendChild(newForm);
        
        for (i=0; i<json.equipment[currCategoryChoiceNr].item.length; i++) {                    // Go through each item this the category contains
            newInput = document.createElement("input");                                         // Prepare to inject a radio button for each item
            newInput.type = "radio";
            newInput.name = "categoryItem" + listId;
            newInput.value = "";
            if (i === 0)                                                                        // The first item will always be the default chosen item when switching categories
                newInput.checked = true;
            newForm.appendChild(newInput);                                                      // Apply the new radio button, as well with some styling and text
            newText = document.createTextNode(json.equipment[currCategoryChoiceNr].category + " " + (i+1));
            newForm.appendChild(newText);
            newForm.appendChild(document.createElement("br"));
        }
        
        prepareHeader(categoryChoices, newFormHeader);                                          // The side bar containing the items for the current category needs a proper header
        
        var categoryItems = document.getElementById("categoryItems" + listId).getElementsByTagName("input");
        equipment.getEquipmentItem(json, list, categoryChoices, categoryItems, currCategoryChoiceNr);
        $(categoryItems).each(function(index) {                                                 // Allow between changing items, so the page reflects the chosen items information
            $(categoryItems[index]).change(function() { equipment.getEquipmentItem(json, list, categoryChoices, categoryItems, currCategoryChoiceNr); });
        });
        
    }, // End getTopicItems
    
    getEquipmentItem: function(json, list, categoryChoices, categoryItems, currCategoryChoiceNr) {   // Get the information from the current selected item within the selected category
		
		// Local variables
		var HTMLcode, i;																    // Loop counter
        list.innerHTML = "";
        
        for (i=0; i<categoryItems.length; i++)                                              // Go through each available item in the category
            if (categoryItems[i].checked)                                                   // Stop the loop counter at the checked item
                break;
        
        // Retreive the information fron the JSON code for the chosen combination of category and item
        HTMLcode = "<h2>" + json.equipment[currCategoryChoiceNr].item[i].name + "</h2>";
        HTMLcode += "<p><b>Price:</b><br> " + json.equipment[currCategoryChoiceNr].item[i].price + "</p>";
        HTMLcode += "<p><b>Shipping:</b><br> " + json.equipment[currCategoryChoiceNr].item[i].shipping + "</p>";
        HTMLcode += "<p><b>Vendor:</b><br> " + json.equipment[currCategoryChoiceNr].item[i].vendor + "</p>";
        HTMLcode += "<p><b>Producer:</b><br> " + json.equipment[currCategoryChoiceNr].item[i].producer + "</p>";
        HTMLcode += "<p><b>Link:</b><br> <a href=\"" + json.equipment[currCategoryChoiceNr].item[i].link + "\">" + json.equipment[currCategoryChoiceNr].item[i].link + "</a></p>";
        HTMLcode += "<p><b>Description:</b><br>" + json.equipment[currCategoryChoiceNr].item[i].description + "</p>";
        list.innerHTML += HTMLcode;                                                         // Present the information of the chosen combination of category and item on the page
		
	} // End getEquipmentItem
    
}; // End equipment