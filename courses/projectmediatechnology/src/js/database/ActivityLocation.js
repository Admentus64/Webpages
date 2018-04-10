// JavaScript Document
// Author: Group 10

function ActivityLocation(activity) {   // Start Child Dynamic Class: ActivityLocation
    
    // Call Parent Class
    Activity.call(this);
    
    
    
    // Private Attributes
    var self = this;
    
    
    
    // Public Methods
    this.createInfo = function() {   // Start Method: createInfo
        
        // Elements
        self.img = document.createElement("img");
        self.hTag = document.createElement("h1");
        self.pTag = document.createElement("p");
        self.spanDiv = document.createElement("div");
        
        // Star Rating
        span = "";
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
        
        this.setImage();                                            // Image
        self.hTag.innerHTML = self.name + ", " + self.city;         // Title
        self.pTag.innerHTML = self.description;                     // Description
    
    }; // End Method: createInfo
    
    this.createSet = function(includeBtn, ratingBelowTitle) {   // Start Method: createSet
        
        this.createInfo();
        
        // Elements
        self.fieldset = document.createElement("fieldset");
        
        // Append
        self.fieldset.appendChild(self.img);
        if (ratingBelowTitle) {
            self.fieldset.appendChild(self.hTag);
            self.fieldset.appendChild(self.spanDiv);
        }
        else {
            self.fieldset.appendChild(self.spanDiv);
            self.fieldset.appendChild(self.hTag);
        }
        self.fieldset.appendChild(self.pTag);
        
        // Button
        if (includeBtn !== false) {
            self.button = document.createElement("button");
            self.fieldset.appendChild(self.button);
            self.button.innerHTML = "Läs mer";
            self.button.className = self.id;
            self.button.setAttribute('type', 'button');
            Event.add(self.button, "click", self.clickReadMoreBtn);
        }
        
        // ID
        self.fieldset.className = "fieldset";
        
    }; // End Method: createSet
    
    
    
    // Private Methods
    this.clickReadMoreBtn = function() {   // Start Method: clickReadMoreBtn
        
        var arr = { "id": self.id,
                    "name":self.name,
                    "description": self.description,
                    "address": self.address,
                    "city": self.city,
                    "zip_code": self.zip_code,
                    "phone_number": self.phone_number,
                    "website": self.website,
                    "latitude": self.latitude,
                    "longitude": self.longitude,
                    "rating": self.rating,
                    "opening_time": self.opening_time,
                    "closing_time": self.closing_time,
                    "indoors": self.indoors,
                    "price": self.price,
                    "interactivity": self.interactivity };
        
        localStorage.clear();
        localStorage.setItem("activityLocation", JSON.stringify(arr));
        document.location.href = "activity.html";
        
    }; // End Method: clickReadMoreBtn
    
    var init = function(activity) {   // Start Method: init
        
        // Public Attributes
        self.id = activity.id;
        self.description = activity.description;
        self.address = activity.address;
        self.city = activity.city;
        self.zip_code = activity.zip_code;
        self.phone_number = activity.phone_number;
        self.website = activity.website;
        self.latitude = activity.latitude;
        self.longitude = activity.longitude;
        self.indoors = activity.indoors;
        self.opening_time = activity.opening_time;
        self.closing_time = activity.closing_time;
        
        if (activity.hasOwnProperty("price_factor"))
            self.price = activity.price_factor;
        else if (activity.hasOwnProperty("price"))
            self.price = activity.price;
        
        if (activity.hasOwnProperty("name"))
            self.name = activity.name;
        else if (activity.hasOwnProperty("title"))
            self.name = activity.title;
            
        if (activity.hasOwnProperty("interactivity"))
            self.interactivity = activity.interactivity;
        else if (activity.hasOwnProperty("interactivity_level"))
            self.interactivity = activity.interactivity_level;
        
        if (activity.hasOwnProperty("stars"))
            self.rating = activity.stars;
        else if (activity.hasOwnProperty("ratings"))
            self.rating = activity.ratings;
        else if (activity.hasOwnProperty("rating"))
            self.rating = activity.rating;
        else self.rating = "0";
            
    }; // End Method: init
    
    
    
    // Private Commands
    init(activity);
    
} // End Dynamic Class: ActivityLocation



// Initialize Class with Parent Class
ActivityLocation.prototype = new Activity();
ActivityLocation.prototype.constructor = ActivityLocation;