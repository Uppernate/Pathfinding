// Initialisation code

var p1 = newPoint(100, 100);
var p2 = newPoint(200, 100);
var p3 = newPoint(200, 200);
var p4 = newPoint(100, 200);
var node1 = newNode(p1, p2, p3, p4);

var node2 = newNode(
    newPoint(300, 300),
    newPoint(400, 300),
    newPoint(400, 400),
    newPoint(300, 400)
);

var node3 = newNode(
    findLine(points[7], points[4]),
    p3,
    p4
);

var node4 = newNode(
    findLine(points[4], points[5]),
    p2,
    p3
);

newNode(newPoint(100, 400), findLine(points[7], p4));
newNode(newPoint(400, 100), findLine(points[5], p2));

