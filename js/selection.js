// Selection code

function clearSelection() {
    for (i = 0; i < points.length; i++) {
        points[i].selected = false;
    }
    for (i = 0; i < lines.length; i++) {
        lines[i].selected = false;
    }
    for (i = 0; i < nodes.length; i++) {
        nodes[i].selected = false;
    }
}

myCanvas.addEventListener("click", function (event) {
    var pageX = event.pageX - 8;
    var pageY = event.pageY - 8;
    if (!keys[16] && !keys[17]) {
        clearSelection();
        var success = selectPoints(pageX, pageY);
        if (!success) { success = selectLines(pageX, pageY); }
        if (!success) { success = selectNodes(pageX, pageY); }
    }
    else if (keys[16] && !keys[17]) {
        var success = selectPoints(pageX, pageY);
        if (!success) { success = selectLines(pageX, pageY); }
        if (!success) { success = selectNodes(pageX, pageY); }
    }
})