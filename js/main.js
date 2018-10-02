console.log("Hello World!");

// Setting up Canvas

var myCanvas = document.createElement("canvas");
document.body.insertBefore(myCanvas, document.body.childNodes[0]);

myCanvas.width = 600;
myCanvas.height = 600;

var context = myCanvas.getContext("2d");

// Object Arrays

var points = [];
var lines = [];
var nodes = [];
var selected = [];

// Main Drawing function

function render(list) {
    for (i = 0; i < list.length; i++) {
        var obj = list[i];
        obj.draw(obj);
    }
}

// Main Update function

function update() {
    context.clearRect(0, 0, myCanvas.width, myCanvas.height);
    render(nodes);
    render(lines);
    render(points);

    requestAnimationFrame(update);
}

requestAnimationFrame(update);