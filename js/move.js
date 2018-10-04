var moveData = {};

function moveUpdate() {
    action.current.x = mousePos.x;
    action.current.y = mousePos.y;
    foreach(action.affected, function (p) {
        p.x += action.current.x - action.origin.x;
        p.y += action.current.y - action.origin.y;
    });
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
            foreach(points, function (point) {
                if (point.selected) {
                    findObjectInArray(action.affected, point);
                }
            });

            foreach(lines, function (line) {
                if (line.selected) {
                    findObjectInArray(action.affected, line.start);
                    findObjectInArray(action.affected, line.end);
                }
            });

            foreach(nodes, function (node) {
                if (node.selected) {
                    foreach(node.points, function (point) {
                        findObjectInArray(action.affected, point);
                    });
                }
            });
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