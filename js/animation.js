// JavaScript source code

console.log("Hello World!");

var myCanvas = document.createElement("canvas");
document.body.insertBefore(myCanvas, document.body.childNodes[0]);

myCanvas.width = 600;
myCanvas.height = 600;

var context = myCanvas.getContext("2d");
var circles = [];

var radians = {
    half: Math.PI,
    quarter: 0.5 * Math.PI,
    full: 2 * Math.PI
}

function drawCircle(c) {
    context.fillStyle = "black";
    context.beginPath();
    context.arc(c.x, c.y, c.radius, 0, radians.full)
    context.fill();
    context.closePath();
}

function newCircle(x, y, size) {
    circles.push( {
        x: x,
        y: y,
        velocityX: 0,
        velocityY: 0,
        radius: size
    })
    return circles[circles.length - 1]
}

function update() {
    context.clearRect(0, 0, myCanvas.width, myCanvas.height);
    for (i = 0; i < circles.length; i++) {
        var c = circles[i];
        c.velocityY += 0.5;
        c.y += c.velocityY;
        if (c.y > myCanvas.height - c.radius / 2) {
            c.y = ( myCanvas.height - c.radius / 2 ) - (c.y - ( myCanvas.height - c.radius / 2 ) );
            c.velocityY *= -1;
        }
        drawCircle(circles[i]);
    }
    requestAnimationFrame(update);
}

myCanvas.addEventListener("click", function (event) {
    var circle = newCircle(event.pageX, event.pageY, Math.random() * 50);
})

requestAnimationFrame(update);