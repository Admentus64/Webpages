// JavaScript Document
// Author: Group 10

function ActivityHotel(activity) {   // Start Dynamic Class: ActivityHotel
    
    // Call Parent Class
    Activity.call(this);
    
    
    
    // Global Attributes
    this.conference = "false";
    this.gym = "false";
    this.spa = "false";
    this.petFriendly = "false";
    
    
    
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
        self.pTag.innerHTML = "Pris per nakt:<br>" + self.price + " kronor<br><br>";
        
        if (self.conference == self.spa == self.gym == self.petFriendly == "0")
            self.pTag.innerHTML += "Ingen extra servicer erbjuds av hotellet (ej konferens, spa, gym eller djurvänlig)";
        else if (self.conference == self.spa == self.gym != self.petFriendly == "0")
            self.pTag.innerHTML += "Hotellet är djurvänlig";
        else {
            self.pTag.innerHTML += "Hotellet har tillgång till ";
            if (self.conference == "1" && self.spa == "0" && self.gym == "0")
                self.pTag.innerHTML += "konferens";
            else if (self.conference == "0" && self.spa == "1" && self.gym == "0")
                self.pTag.innerHTML += "spa";
            else if (self.conference == "0" && self.spa == "0" && self.gym == "1")
                self.pTag.innerHTML += "gym";
            else if (self.conference == "1" && self.spa == "1" && self.gym == "0")
                self.pTag.innerHTML += "konferens och spa";
            else if (self.conference == "1" && self.spa == "0" && self.gym == "1")
                self.pTag.innerHTML += "konferens och gym";
            else if (self.conference == "0" && self.spa == "1" && self.gym == "1")
                self.pTag.innerHTML += "spa och gym";
            else self.pTag.innerHTML += "konferens, spa och gym";  
            if (self.petFriendly === "1" || self.conference == "1" || self.spa == "1" || self.gym == "1")
                self.pTag.innerHTML += " och är djurvänlig";

        }
        
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
    
    this.linkRestaurant = function(restaurant) {   // Start Method: linkRestaurant
                
        // Elements
        var set = document.createElement("fieldset");
        
        // Append
        set.appendChild(self.hTag);
        set.appendChild(self.spanDiv);
        set.appendChild(self.pTag);
        set.appendChild(restaurant.hTag);
        set.appendChild(restaurant.spanDiv);
        set.appendChild(restaurant.pTag);
        
        // ID
        set.className = "fieldset";
        
        self.overrideInfoText(set);
        
    }; // End Method: linkRestaurant
    
    
    
    // Private Methods
    var init = function(activity) {   // Start Method: init
        
        self.id = activity.id;
        self.location_id = activity.location_id;
        self.conference = activity.conference;
        self.spa = activity.spa;
        self.gym = activity.gym;
        self.pet_friendly = activity.pet_friendly;
        self.latitude = activity.latitude;
        self.longitude = activity.longitude;
        
        if (activity.hasOwnProperty("price_factor"))
            self.price = activity.price_factor;
        else if (activity.hasOwnProperty("price_per_night"))
            self.price = activity.price_per_night;
        else if (activity.hasOwnProperty("price"))
            self.price = activity.price;
        
        if (activity.hasOwnProperty("name"))
            self.name = activity.name;
        else if (hotel.hasOwnProperty("title"))
            self.name = activity.title;
        
        if (activity.hasOwnProperty("stars"))
            self.rating = activity.stars;
        else if (hotel.hasOwnProperty("ratings"))
            self.rating = activity.ratings;
        else if (activity.hasOwnProperty("rating"))
            self.rating = activity.rating;
        else self.rating = "0";
        
        if (activity.hasOwnProperty("city"))
            self.city = activity.city;
        else self.city = activity.location_id;
        
    }; // End Method: init
    
    
    
    // Private Commands
    init(activity);
    
    
} // End Dynamic Class: ActivityHotel



// Initialize Class with Parent Class
ActivityHotel.prototype = new Activity();
ActivityHotel.prototype.constructor = ActivityHotel;