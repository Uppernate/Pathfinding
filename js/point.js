// Point functions

function drawPoint(point) {
    if (point.selected) { context.fillStyle = "#FFD5A1"; }
    else { context.fillStyle = "#ffab43"; }
    context.beginPath();
    context.arc(point.x, point.y, 10, 0, radians.full)
    context.fill();
    context.closePath();
}

function newPoint(x, y) {
    var point = {
        x: x,
        y: y,
        draw: drawPoint,
        selected: false
    }
    points.push(point);
    return point;
}

// Selection

function selectPoints(x, y) {
    for (i = 0; i < points.length; i++) {
        var point = points[i]
        var distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2));
        if (distance < 10) {
            point.selected = !point.selected;
            return true;
        }
    }
    return false;
}