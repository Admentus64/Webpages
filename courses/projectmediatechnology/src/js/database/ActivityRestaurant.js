// JavaScript Document
// Author: Group 10

function ActivityRestaurant(activity) {   // Start Dynamic Class: ActivityRestaurant
    
    // Call Parent Class
    Activity.call(this);
    
    
    
    // Global Attributes
    this.type = "";
    this.lunch_pricing = "0";
    this.dinner_pricing = "0";
    
    
    // Private Attributes
    var self = this;
    
    
    
    // Public Methods
    this.createInfo = function() {   // Start Method: createInfo
        
        // Elements
        self.hTag = document.createElement("h1");
        self.pTag = document.createElement("p");
        self.spanDiv = document.createElement("div");
        
        // Star Rating
        var span = "";
        var stars = Math.round(self.rating);
        for (var i=1; i<=5; i++) {
            if (i <= stars)
                span += "<span>" + self.filledStar + "</span>";
            else span += "<span>" + self.emptyStar + "</span>";
        }
        
        // Star Rating Span Div
        self.spanDiv.innerHTML = span;
        self.spanDiv.className = "rating";
        self.spanDiv.setAttribute("data-value", self.rating);
        
        // Title
        self.hTag.innerHTML = self.name;
        
        // Description
        self.pTag.innerHTML = "";
        if (self.lunch_pricing == "0")
            self.pTag.innerHTML += "Lunch serveras ej i denna restaurang<br><br>";
        else self.pTag.innerHTML += "Pris för lunch:<br>" + self.lunch_pricing + "<br><br>";
        if (self.dinner_pricing == "0")
            self.pTag.innerHTML += "Dinner serveras ej i denna restaurang<br><br>";
        else self.pTag.innerHTML += "Pris för dinner:<br>" + self.dinner_pricing + " kronor<br><br>";
        
        self.pTag.innerHTML += "\u00c4r öppet:<br>Från " + self.opening_time.substring(0, 5) + " till " + self.closing_time.substring(0, 5) + "<br><br>";
        self.pTag.innerHTML += "Restaurang typ:<br>" + capitalizeFirstLetter(self.type) + "<br><br>";
        
    }; // End Method: createInfo
    
    this.createSet = function() {   // Start Method: createSet
        
        self.createInfo();
        
        // Elements
        self.fieldset = document.createElement("fieldset");
        
        // Append
        self.fieldset.appendChild(self.hTag);
        self.fieldset.appendChild(self.spanDiv);
        self.fieldset.appendChild(self.pTag);
        
        // ID
        self.fieldset.className = "fieldset";
        
    }; // End Method: createSet
    
    
    
    // Private Methods
    var init = function(activity) {   // Start Method: init
        
        self.id = activity.id;
        self.location_id = activity.location_id;
        self.lunch_pricing = activity.lunch_pricing;
        self.dinner_pricing = activity.dinner_pricing;
        self.opening_time = activity.opening_time;
        self.closing_Time = activity.closing_time;
        self.type = activity.type;
        self.latitude = activity.latitude;
        self.longitude = activity.longitude;
        
        if (activity.hasOwnProperty("name"))
            self.name = activity.name;
        else if (activity.hasOwnProperty("title"))
            self.name = activity.title;
        
        if (activity.hasOwnProperty("stars"))
            self.rating = activity.stars;
        else if (activity.hasOwnProperty("ratings"))
            self.rating = activity.ratings;
        else if (activity.hasOwnProperty("rating"))
            self.rating = activity.rating;
        else self.rating = "0";
        
        if (activity.hasOwnProperty("city"))
            self.city = activity.city;
        else self.city = activity.location_id;
            
    }; // End Method: init
    
    var capitalizeFirstLetter = function(str)   { return str.charAt(0).toUpperCase() + str.slice(1); };       // Method: capitalizeFirstLetter
    
    
    
    // Private Commands
    init(activity);
    
} // End Dynamic Class: ActivityRestaurant



// Initialize Class with Parent Class
ActivityRestaurant.prototype = new Activity();
ActivityRestaurant.prototype.constructor = ActivityRestaurant;