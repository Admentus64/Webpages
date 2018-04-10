// JavaScript Document
// Author: Group 10

function BigImage(path, id) {   // Start Dynamic Class: Activity
    
    // Private Attributes
    var filePath = path;                                            // Filepath name for the slide show image
    var linkedId = id;                                              // Linked ID value which is a part of an activity to be linked to the slide show image
    
    
    
    // Public Methods
    this.getFilePath = function() { return filePath; };             // Method: getFilePath
    this.getLinkedId = function() { return linkedId; };             // Method: getLinkedId

} // End Dynamic Class: Activity