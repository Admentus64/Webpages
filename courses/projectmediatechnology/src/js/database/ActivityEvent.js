// JavaScript Document
// Author: Group 10

function ActivityEvent(activity) {   // Start Child Dynamic Class: ActivityEvent
    
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
        
        this.setImage();                                            // Image
        self.hTag.innerHTML = self.name + ", " + self.city;         // Title
        self.pTag.innerHTML = self.description;                     // Description
        
    }; // End Method: createInfo
    
    this.createSet = function(includeBtn, ratingBelowTitle) {   // Start Method: createSet
        
        self.createInfo();
        
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
    var init = function(activity) {   // Start Method: init
        
        self.id = activity.id;
        self.location_id = activity.location_id;
        self.description = activity.description;
        self.start = activity.start;
        self.end = activity.end;
        self.latitude = activity.latitude;
        self.longitude = activity.longitude;
        
        if (activity.hasOwnProperty("price_factor"))
            self.price = activity.price_factor;
        else if (activity.hasOwnProperty("price"))
            self.price = activity.price;
        
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
    
    this.clickReadMoreBtn = function() {   // Start Method: clickReadMoreBtn
        
        var arr = { "id": self.id,
                    "locationId":self.locationId,
                    "name": self.name,
                    "city": self.city,
                    "rating": self.rating,
                    "description": self.description,
                    "price": self.price,
                    "start": self.start,
                    "end": self.end,
                    "latitude": self.latitude,
                    "longitude": self.longitude };
        
        localStorage.clear();
        localStorage.setItem("activityEvent", JSON.stringify(arr));
        document.location.href = "activity.html";
        
    }; // End Method: clickReadMoreBtn
    
    
    
    // Private Commands
    init(activity);
    
} // End Dynamic Class: ActivityEvent



// Initialize Class with Parent Class
ActivityEvent.prototype = new Activity();
ActivityEvent.prototype.constructor = ActivityEvent;