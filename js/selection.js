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
    if (action.name == "None") {
        if (!keyHold(16) && !keyHold(17)) {
            clearSelection();
            var success = selectPoints(mousePos.x, mousePos.y);
            if (!success) { success = selectLines(mousePos.x, mousePos.y); }
            if (!success) { success = selectNodes(mousePos.x, mousePos.y); }
        }
        else if (keyHold(16) && !keyHold(17)) {
            var success = selectPoints(mousePos.x, mousePos.y);
            if (!success) { success = selectLines(mousePos.x, mousePos.y); }
            if (!success) { success = selectNodes(mousePos.x, mousePos.y); }
        }
    }
})