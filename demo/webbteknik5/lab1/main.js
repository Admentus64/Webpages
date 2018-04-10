var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var a = getRandomNumber();
var b = getRandomNumber();

console.log(a + " + " + b + " = " + (a + b));

function getRandomNumber() {
    
    var i = Math.floor(Math.random() * numbers.length);
    return numbers.splice(i, 1)[0];
    
}