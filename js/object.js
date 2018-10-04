function findObjectInArray(list, p) {
    var f = foreach(list, function (item) {
        if (item == p) {
            return true
        }
    });
    if (f != null) { return f };
    list.push(p);
}

function removeObject(list, p) {
    var i = list.indexOf(p);
    console.log("Removing item ", p);
    list.splice(i, 1);
    list.sort();
}