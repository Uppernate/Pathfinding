keys[46] = newBind(
    function () {
        if (action.name == "None") {
            action = {
                name: "Delete",
                points: [],
                lines: [],
                nodes: []
            }

            // Targetting all selected things for deletion
            foreach(points, function (point) {
                if (point.selected) {
                    findObjectInArray(action.points, point);
                    foreach(findLineWithPoint(point), function (line) {
                        findObjectInArray(action.lines, line);
                    });
                    foreach(findNodeWithPoint(point), function (node) {
                        findObjectInArray(action.nodes, node);
                    });
                }
            });

            foreach(lines, function (line) {
                if (line.selected) {
                    findObjectInArray(action.lines, line);
                    foreach(findNodeWithLine(line), function (node) {
                        findObjectInArray(action.nodes, node);
                    });
                }
            });

            foreach(nodes, function (node) {
                if (node.selected) {
                    findObjectInArray(action.nodes, node);
                }
            });

            // Deletion 
            foreach(action.points, function (point) {
                removeObject(points, point);
            });

            foreach(action.lines, function (line) {
                removeObject(lines, line);
            });

            foreach(action.nodes, function (node) {
                removeObject(nodes, node);
            });

            action = { name: "None" };
        }
    },
    function () {

    }
)