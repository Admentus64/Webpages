var Mouse = {
    x : 0,
    y : 0,
    
    update : function(event) {
        Mouse.x = event.clientX;
        Mouse.y = event.clientY;
        console.log("x: " + Mouse.x + " y: " + Mouse.y);
    },
    
    init : function() {
        document.onmousemove = Mouse.update;
    }
};

window.onload = Mouse.init;