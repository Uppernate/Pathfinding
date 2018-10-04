// Node functions

function drawNode(node) {
    context.beginPath();
    if (node.selected) { context.fillStyle = "#A0A2BF4A"; }
    else { context.fillStyle = "#41447E4A"; }
    for (p = 0; p < node.points.length; p++) {
        context.lineTo(node.points[p].x, node.points[p].y);
    }
    context.closePath();
    context.fill();
}

// Creation

function recursiveNodeResolvePoint(node, current, c) {
    if (!c[0]) return;
    if (typeof c[0].x != "undefined") {
        node.points.push(c[0]);
        node.lines.push(findLine(current, c[0]));
        var next = c[0];
        c.splice(0, 1);
        recursiveNodeResolvePoint(node, next, c);
    }
    else if (c[0].start) {
        node.points.push(c[0].start);
        node.points.push(c[0].end);
        node.lines.push(findLine(current, c[0].start))
        node.lines.push(c[0]);
        var next = c[0];
        c.splice(0, 1);
        recursiveNodeResolveLine(node, next, c);
    }
}

function recursiveNodeResolveLine(node, current, c) {
    if (!c[0]) return;
    if (typeof c[0].x != "undefined") {
        node.points.push(c[0]);
        node.lines.push(findLine(current.end, c[0]));
        var next = c[0];
        c.splice(0, 1);
        recursiveNodeResolvePoint(node, next, c);
    }
    else if (c[0].start) {
        node.points.push(c[0].start);
        node.points.push(c[0].end);
        node.lines.push(c[0]);
        node.lines.push(findLine(current.end, c[0].start))
        var next = c[0];
        c.splice(0, 1);
        recursiveNodeResolveLine(node, next, c);
    }
}

function newNode(c1, c2, c3, c4) {
    var node = {
        points: [],
        lines: [],
        draw: drawNode,
        selected: false
    }

    if (typeof c1.x != "undefined") {
        node.points.push(c1);
        recursiveNodeResolvePoint(node, c1, [c2, c3, c4]);
    }
    else if (c1.start) {
        node.points.push(c1.start);
        node.points.push(c1.end);
        node.lines.push(c1);
        recursiveNodeResolveLine(node, c1, [c2, c3, c4]);
    }

    node.lines.push(findLine(node.lines[node.lines.length - 1].end, node.lines[0].start));
    nodes.push(node);
    return node;
}

// Returning nodes with element inside

function findNodeWithPoint(p) {
    var foundNodes = [];
    foreach(nodes, function (node) {
        var f = foreach(node.points, function (point) {
            if (point === p) {
                return true;
            }
        });
        if (f != null) {
            foundNodes.push(node);
        }
    });
    return foundNodes;
}

function findNodeWithLine(p) {
    var foundNodes = [];
    foreach(nodes, function (node) {
        var f = foreach(node.lines, function (line) {
            if (line === p) {
                return true;
            }
        });
        if (f != null) {
            foundNodes.push(node);
        }
    });
    return foundNodes;
}

// Selection

function insidePolygon(polygon, N, p) {
    var counter = 0;
    var i;
    var xinters;
    var p1 = { x: 0, y: 0 };
    var p2 = { x: 0, y: 0 };

    p1 = polygon.points[0];
    for (i = 1; i <= N; i++) {
        p2 = polygon.points[i % N];
        if (p.y > Math.min(p1.y, p2.y)) {
            if (p.y <= Math.max(p1.y, p2.y)) {
                if (p.x <= Math.max(p1.x, p2.x)) {
                    if (p1.y != p2.y) {
                        xinters = (p.y - p1.y) * (p2.x - p1.x) / (p2.y - p1.y) + p1.x;
                        if (p1.x == p2.x || p.x <= xinters)
                            counter++;
                    }
                }
            }
        }
        p1 = p2;
    }
    return !((counter % 2) == 0)
}

function selectNodes(x, y) {
    for (n = 0; n < nodes.length; n++) {
        var node = nodes[n];
        var mouse = { x: x, y: y };
        if (insidePolygon(node, node.points.length, mouse)) {
            node.selected = !node.selected;
            return true;
        }
    }
    return false;
}