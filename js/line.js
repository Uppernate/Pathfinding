// Line functions

function drawLine(line) {
    context.beginPath();
    context.moveTo(line.start.x, line.start.y);
    context.lineTo(line.end.x, line.end.y);
    if (line.selected) { context.strokeStyle = "#B4B7F8"; }
    else { context.strokeStyle = "#686ef1"; }
    context.lineWidth = 10;
    context.stroke();
    context.closePath();
}

function newLine(point1, point2) {
    var line = {
        start: point1,
        end: point2,
        draw: drawLine,
        selected: false
    }
    lines.push(line);
    return line;
}

function findLine(p1, p2) {
    if (typeof p1 == "undefined") {
        Error("findLine() was given no point1");
        return;
    }
    if (typeof p2 == "undefined") {
        Error("findLine() was given no point2");
        return;
    }
    for (i = 0; i < lines.length; i++) {
        if (lines[i].start === p1 && lines[i].end === p2) {
            return lines[i];
        }
        if (lines[i].end === p1 && lines[i].start === p2) {
            return lines[i];
        }
    }
    return newLine(p1, p2);
}

function findLineWithPoint(p) {
    var foundLines = [];
    foreach(lines, function (line) {
        if (line.start === p1) {
            foundLines.push(line);
        }
        if (line.end === p1) {
            foundLines.push(line);
        }
    });
    return foundLines;
}

// Selection

function selectLines(x, y) {
    for (i = 0; i < lines.length; i++) {
        var line = lines[i]
        var angle = Math.atan2(line.start.y - line.end.y, line.end.x - line.start.x);
        var c1 = [
            Math.cos(angle) * line.start.x - Math.sin(angle) * line.start.y,
            Math.sin(angle) * line.start.x + Math.cos(angle) * line.start.y,
        ];
        var c2 = [
            Math.cos(angle) * line.end.x - Math.sin(angle) * line.end.y,
            Math.sin(angle) * line.end.x + Math.cos(angle) * line.end.y,
        ];
        var left = Math.min(c1[0], c2[0]) - 10;
        var right = Math.max(c1[0], c2[0]) + 10;
        var top = Math.min(c1[1], c2[1]) - 5;
        var bottom = Math.max(c1[1], c2[1]) + 5;
        var mouse = {
            x: Math.cos(angle) * x - Math.sin(angle) * y,
            y: Math.sin(angle) * x + Math.cos(angle) * y,
        };
        if (mouse.x > left && mouse.x < right && mouse.y > top && mouse.y < bottom) {
            line.selected = !line.selected;
            return true;
        }
    }
    return false;
}