// JavaScript

// Global variables
var input1Elem;                                             // Input value for bar 1
var input2Elem;                                             // Input value for bar 2
var resultElem;                                             // Reference to div-element for message



// Functions
function init() {   // Initialization function, setups the whole page
    
    // Refer input elements to buttons variables
    input1Elem = document.getElementById("input1");         // Hastighet / speed input
    input2Elem = document.getElementById("input2");         // Tid / time input
    
    // Refer result element into a variable
    resultElem = document.getElementById("result");         // Message output text line
    
    // Link the Kör Programmet button to call function testscript
    document.getElementById("runBtn").onclick = testscript;
    
} // End init
window.onload = init;                                       // Call init function when page is loaded



function testscript() {   // Function for testing purposes
    
    //  Local variables
    var speed ;                                             // Speed in km/h
    var speedMS;                                            // Speed in m/s
    var time;                                               // Time in minutes
    var distance;                                           // Distance in km
    var reactionTime;                                       // Reaction time in seconds
    var car = ["Volvo", "BMW", "Ferrari"];                  // Car types
    var accTime = [10.5, 7, 4.3];                           // Acceleration time 0-100
    var acc;                                                // Acceleration in m/s in square
    
    // Read input
    speed = Number(input1Elem.value);                       // Read speed
    time = Number(input2Elem.value);                        // Read time
    
    // Distance for given time
    distance = speed * time / 60;                           // Calculate distance
    resultElem.innerHTML = "Sträckan blir " + distance + " km. <br><br>";
    
    // Time, if speed is 20 km/h slower
    time = distance / (speed - 20) * 60;                    // Recalculate time, for 20 km/h slower speed
    resultElem.innerHTML += "Tiden för samma sträcka, om hastigheten är 20 km/h lägre blir " + time + " minuter. <br><br>";
    
    // Reaction distance
    reactionTime = 3;                                       // Set reactionTime to a static value
    speedMS = speed * 1000 / 3600;                          // Calculate speedMS
    distance = speedMS * reactionTime;                      // Recalculate distance
    resultElem.innerHTML += "Om rekationstiden är " + reactionTime + " sekunder blir reaktionssträckan " + distance + " m. <br><br>";
    
    // Acceleration distance 0-100 km/h for different car types, 100 km/h is converted to m/s
    speedMS = 100 * 1000 / 3600;                            // Set speedMS to a static value
    distance = speedMS * accTime[0] / 2;                    // Recalculate distance for car 1
    resultElem.innerHTML += car[0] + " 0-100 på " + accTime[0] + " sek. på " + distance + " meter. <br>";
    distance = speedMS * accTime[1] / 2;                    // Recalculate distance for car 2
    resultElem.innerHTML += car[1] + " 0-100 på " + accTime[1] + " sek. på " + distance + " meter. <br>";
    distance = speedMS * accTime[2] / 2;                    // Recalculate distance for car 3
    resultElem.innerHTML += car[2] + " 0-100 på " + accTime[2] + " sek. på " + distance + " meter. <br><br>";
    
    // Distance after 20 sec if speed is 40 km/h faster
    speedMS = (speed + 40) * 1000 / 3600                    // Recalculate speedMS based on speed again
    distance = speedMS * 20                                 // Recalculate distance
    resultElem.innerHTML += "Sträckan, om hastigheten är 40 km/h högre, blir " + distance + " m. på 20 sekunder <br><br>";
    
    // Accelaration for a BMW
    speedMS = 100 * 1000 / 3600;                            // Set speedMS to a static value
    acc = speedMS / accTime[1];                             // Calculate accelaration
    resultElem.innerHTML += "Accelerationen för en " + car[1] + " är " + acc + " m/s\xB2.<br><br>";
    
} // End testscript