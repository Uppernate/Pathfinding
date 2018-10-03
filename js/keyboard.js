// Key Presses

var keys = [];

function defaultKeyFunction() {
    return 
}

function newBind(d, u) {
    return {
        state: false,
        pastState: false,
        down: d,
        up: u
    }
}

function keyHold(num) {
    if (typeof keys[num] == "undefined") { keys[num] = newBind(defaultKeyFunction, defaultKeyFunction); }
    return keys[num].state;
}

document.addEventListener("keydown", function (e) {
    if (typeof keys[e.keyCode] == "undefined") { keys[e.keyCode] = newBind(defaultKeyFunction, defaultKeyFunction); }
    keys[e.keyCode].state = true;
    if (keys[e.keyCode].state && !keys[e.keyCode].pastState) {
        keys[e.keyCode].pastState = true;
        keys[e.keyCode].down();
    }
})

document.addEventListener("keyup", function (e) {
    if (typeof keys[e.keyCode] == "undefined") { keys[e.keyCode] = newBind(defaultKeyFunction, defaultKeyFunction); }
    keys[e.keyCode].state = false;
    if (!keys[e.keyCode].state && keys[e.keyCode].pastState) {
        keys[e.keyCode].pastState = false;
        keys[e.keyCode].up();
    }
})