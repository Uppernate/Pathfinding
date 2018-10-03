var moveData = {};

function moveUpdate() {
    action.current.x = mousePos.x;
    action.current.y = mousePos.y;
    for (var i = 0; i < action.affected.length; i++) {
        var p = action.affected[i];
        p.x += action.current.x - action.origin.x;
        p.y += action.current.y - action.origin.y;
    }
    action.origin.x = mousePos.x;
    action.origin.y = mousePos.y;
}

myCanvas.addEventListener("click", function (event) {
    if (action.name == "Move") {
        action = {
            name: "None"
        }
    }
})

keys[71] = newBind(
    function () {
        if (action.name == "None") {
            action = {
                name: "Move",
                origin: { x: mousePos.x, y: mousePos.y },
                current: { x: mousePos.x, y: mousePos.y },
                affected: [],
                update: moveUpdate
            }
            for (i = 0; i < points.length; i++) {
                if (points[i].selected) {
                    findPoint(action.affected, points[i]);
                }
            }
            for (i = 0; i < lines.length; i++) {
                if (lines[i].selected) {
                    findPoint(action.affected, lines[i].start);
                    findPoint(action.affected, lines[i].end);
                }
            }
            for (i = 0; i < nodes.length; i++) {
                if (nodes[i].selected) {
                    console.log(nodes[i]);
                    for (b = 0; b < nodes[i].points.length; b++) {
                        findPoint(action.affected, nodes[i].points[b]);
                    }
                }
            }
        }
        else if (action.name == "Move") {
            action = {
                name: "None"
            }
        }
    },
    function () {

    }
)