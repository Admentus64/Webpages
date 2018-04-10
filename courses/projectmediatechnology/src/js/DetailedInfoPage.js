// JavaScript Document
// Author: Group 10

var DetailedInfoPage = {   // Start Static Class: DetailedInfoPage
    
    // Class Variables
    titleElem: undefined,
    imgElem: undefined,
    timeWindowElem: undefined,
    descriptionElem: undefined,
    activityImgElem: undefined,
    hasServicesElem: undefined,
    priceElem: undefined,
    websiteElem: undefined,
    data: undefined,
    
    radius: 15,
    servicesList: undefined,
    nearRestaurantsList: undefined,
    nearHotelsList: undefined,
    restaurants: [],
    hotels: [],
    
    restaurantIcon: "src/img/map/restaurantIcon.png",
    hotelIcon: "src/img/map/hotelIcon.png",
    hotelRestaurantIcon: "src/img/map/hotelRestaurantIcon.png",
    
    
    
    // Class Methods
    init: function() {   // Start Method: init
        
        DetailedInfoPage.titleElem = document.getElementById("title");
        DetailedInfoPage.imgElem = document.getElementById("activityImg");
        DetailedInfoPage.timeWindowElem = document.getElementById("timeWindow");
        DetailedInfoPage.descriptionElem = document.getElementById("description");
        DetailedInfoPage.activityImgElem = document.getElementById("activityImg");
        DetailedInfoPage.hasServicesElem = document.getElementById("hasServices");
        DetailedInfoPage.priceElem = document.getElementById("price");
        DetailedInfoPage.websiteElem = document.getElementById("website");
        
        if (localStorage.getItem("activityLocation") !== null)
            DetailedInfoPage.data = new ActivityLocation(JSON.parse(localStorage.getItem("activityLocation")));
        if (localStorage.getItem("activityEvent") !== null)
            DetailedInfoPage.data = new ActivityEvent(JSON.parse(localStorage.getItem("activityEvent")));
        
        DetailedInfoPage.servicesList = document.getElementById("services");
        DetailedInfoPage.nearRestaurantsList = document.getElementById("nearRestaurants");
        DetailedInfoPage.nearHotelsList = document.getElementById("nearHotels");
        
        Ajax.request("&controller=restaurant&method=getAll", [DetailedInfoPage.getNearRestaurants, DetailedInfoPage.hasServices, DetailedInfoPage.combine]);
        Ajax.request("&controller=hotel&method=getAll", [DetailedInfoPage.getNearHotels, DetailedInfoPage.hasServices, DetailedInfoPage.combine]);
        
        DetailedInfoPage.data.createSet(false, true);
        DetailedInfoPage.readData();
        DetailedInfoPage.data.mark(true, Payload.activityIcon);
        
    }, // End Method: init
    
    hasServices: function() {   // Start Method: hasServices
        
        if (DetailedInfoPage.restaurants.length === 0 || DetailedInfoPage.hotels.length === 0)
            return;
        
        if (DetailedInfoPage.hotels.length === 0 && DetailedInfoPage.restaurants.length > 0) {
            DetailedInfoPage.hasServicesElem.innerHTML = "Här finns det restaurang i närheten.";
            DetailedInfoPage.addServiceIcon(DetailedInfoPage.restaurantIcon);
        }
        else if (DetailedInfoPage.hotels.length > 0 && DetailedInfoPage.restaurants.length === 0) {
            DetailedInfoPage.hasServicesElem.innerHTML = "Här finns det boende i närheten.";
            DetailedInfoPage.addServiceIcon(DetailedInfoPage.hotelIcon);
        }
        else if (DetailedInfoPage.hotels.length > 0 && DetailedInfoPage.restaurants.length > 0) {
            DetailedInfoPage.hasServicesElem.innerHTML = "Här finns det både restaurang och boende i närheten.";
            DetailedInfoPage.addServiceIcon(DetailedInfoPage.restaurantIcon);
            DetailedInfoPage.addServiceIcon(DetailedInfoPage.hotelIcon);
        }
        else DetailedInfoPage.hasServicesElem.innerHTML = "Här finns inga tjänster i närheten.";
        
    }, // End Method: hasServices
    
    addServiceIcon(iconPath) {   // Start Method: addServiceIcon
        
        var img = document.createElement("img");
        img.alt = "Service";
        img.src = iconPath;
        DetailedInfoPage.servicesList.appendChild(img);
        
    }, // End Method: addServiceIcon
    
    combine: function() {   // Start Method: combine
        
        if (DetailedInfoPage.restaurants.length === 0 || DetailedInfoPage.hotels.length === 0)
            return;
        
        for (var i=0; i<DetailedInfoPage.restaurants.length; i++)
            for (var j=0; j<DetailedInfoPage.hotels.length; j++)
                if (DetailedInfoPage.calcDistance(DetailedInfoPage.restaurants[i].latitude, DetailedInfoPage.restaurants[i].longitude, DetailedInfoPage.hotels[j].latitude, DetailedInfoPage.hotels[j].longitude) <= 0.001) {
                    DetailedInfoPage.restaurants[i].unmark();
                    DetailedInfoPage.hotels[j].unmark();
                    DetailedInfoPage.hotels[j].mark(false, DetailedInfoPage.hotelRestaurantIcon, 40, 48);
                    DetailedInfoPage.hotels[j].linkRestaurant(DetailedInfoPage.restaurants[i]);
                }
        
    }, // End Method: combine
    
    getNear: function(json, listElem, object, arr, icon) {   // Start Method: getNear
        
        var li;
        
        for (var i=0; i<json.payload.length; i++)
            if (DetailedInfoPage.calcDistance(DetailedInfoPage.data.latitude, DetailedInfoPage.data.longitude, json.payload[i].latitude, json.payload[i].longitude) <= DetailedInfoPage.radius) {
                obj = new object(json.payload[i]);
                obj.createSet();
                obj.mark(false, icon);
                arr.push(obj);
                li = document.createElement("li");
                li.innerHTML = obj.name;
                listElem.appendChild(li);
            }
        
        if (!listElem.hasChildNodes()) {
            li = document.createElement("li");
            li.innerHTML = "Det finns inga i närheten";
            listElem.appendChild(li);
        }
        
    }, // End Method: getNear
    
    readData: function() {   // Start Method: readData
        
        DetailedInfoPage.titleElem.innerHTML = DetailedInfoPage.data.name + ", " + DetailedInfoPage.data.city;
        
        DetailedInfoPage.timeWindowElem.innerHTML = "<b>Tider</b><br>";
        if (DetailedInfoPage.data.start !== null && DetailedInfoPage.data.start !== undefined & DetailedInfoPage.data.start !== "" && DetailedInfoPage.data.end !== null && DetailedInfoPage.data.end !== undefined & DetailedInfoPage.data.end !== "") {
            DetailedInfoPage.timeWindowElem.innerHTML += "Denna utflykt pågår från " + DetailedInfoPage.data.start.substring(0, 10) + " till " + DetailedInfoPage.data.end.substring(0, 10);
            DetailedInfoPage.timeWindowElem.innerHTML += " och är öppet från " + DetailedInfoPage.data.start.substring(11, 16) + " till " + DetailedInfoPage.data.end.substring(11, 16) + ".";
        }
        else if (DetailedInfoPage.data.opening_time !== null && DetailedInfoPage.data.opening_time !== undefined & DetailedInfoPage.data.opening_time !== "" && DetailedInfoPage.data.closing_time !== null && DetailedInfoPage.data.closing_time !== undefined & DetailedInfoPage.data.closing_time !== "") {
            DetailedInfoPage.timeWindowElem.innerHTML += "Denna utflykt är öppet från " + DetailedInfoPage.data.opening_time.substring(0, 5) + " till " + DetailedInfoPage.data.closing_time.substring(0, 5);
            if (DetailedInfoPage.data.indoors == "1")
                DetailedInfoPage.timeWindowElem.innerHTML += " och finns inne.";
            else if (DetailedInfoPage.data.indoors == "0")
                DetailedInfoPage.timeWindowElem.innerHTML += " och finns ute.";
            else DetailedInfoPage.timeWindowElem.innerHTML += ".";
        }
        
        DetailedInfoPage.descriptionElem.innerHTML = "<b>Beskrivning</b><br>" + DetailedInfoPage.data.description;
        
        if (DetailedInfoPage.data.price !== null && DetailedInfoPage.data.price !== undefined & DetailedInfoPage.data.price !== "" & DetailedInfoPage.data.price !== "0")
            DetailedInfoPage.priceElem.innerHTML = "Priset för att besöka utflykten per person: " + DetailedInfoPage.data.price + " kronor.";
        else if (DetailedInfoPage.data.price == "0")
            DetailedInfoPage.priceElem.innerHTML = "Utflykten är gratis att besöka.";
        else DetailedInfoPage.priceElem.innerHTML = "Priset för att besöka denna utflykten är inte känd.";
        
        if (DetailedInfoPage.data.website !== null && DetailedInfoPage.data.website !== undefined & DetailedInfoPage.data.website !== "")
            DetailedInfoPage.websiteElem.innerHTML = "Länk till websidan av utflykten: " + "<a href=\"" + DetailedInfoPage.data.website + "\">" + DetailedInfoPage.data.website + "</a>";
        else DetailedInfoPage.websiteElem.innerHTML = "Denna utflykt har ingen egen websidan.";
        
        if (DetailedInfoPage.data.phone_number !== null && DetailedInfoPage.data.phone_number !== undefined & DetailedInfoPage.data.phone_number !== "")
            DetailedInfoPage.websiteElem.innerHTML += "<br><br>Ring till utflykten med vid följande telefonnummer: " + DetailedInfoPage.data.phone_number;
        
        DetailedInfoPage.imgElem.appendChild(DetailedInfoPage.data.img);              // Image
        
    }, // End Method: readData
    
    // This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    calcDistance: function(lat1, lon1, lat2, lon2) {   // Start Method: calcDistance
        
        var R = 6371;                                                   // Radius of the earth in km
        var dLat = DetailedInfoPage.toRadius(lat2 - lat1);
        var dLon = DetailedInfoPage.toRadius(lon2 - lon1); 
        var a =  Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(DetailedInfoPage.toRadius(lat1)) * Math.cos(DetailedInfoPage.toRadius(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c;                                                  // Distance in km
        return d;
    
    }, // End Method: calcDistance
    
    toRadius: function(Value)           { return Value * (Math.PI / 180); },                                                                                                                            // Method: toRadius (converts numeric degrees to radians)
    getNearRestaurants: function(json)  { DetailedInfoPage.getNear(json, DetailedInfoPage.nearRestaurantsList, ActivityRestaurant, DetailedInfoPage.restaurants, DetailedInfoPage.restaurantIcon); },   // Method: getNearRestaurants
    getNearHotels: function(json)       { DetailedInfoPage.getNear(json, DetailedInfoPage.nearHotelsList, ActivityHotel, DetailedInfoPage.hotels, DetailedInfoPage.hotelIcon); },                       // Method: getNearHotels
    
}; // End Static Class: DetailedInfoPage



Event.add(window, "load", DetailedInfoPage.init);						// Active function init when the page is loaded