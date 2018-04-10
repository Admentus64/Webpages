var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var INTERVAL = 1000;

function init() {
    
    window.setInterval(addNumbers, INTERVAL);
    
}

function addNumbers() {
    
    if (numbers.length >= 2) {
        var a = getRandomNumber();
        var b = getRandomNumber();
        var ul = document.getElementById("sum-list");
        var li = document.createElement("li");
        li.innerHTML = a + " + " + b + " = " + (a + b);
        ul.appendChild(li);
    }
    else window.location.reload();
    
}

function getRandomNumber() {
    
    var i = Math.floor(Math.random() * numbers.length);
    return numbers.splice(i, 1)[0];
    
}

window.onload = init;