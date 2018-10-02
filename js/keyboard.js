// Key Presses

var keys = [];

function defaultKeyDownFunction() {
    return 
}

document.addEventListener("keydown", function (e) {
    if (typeof keys[e.keyCode] != "undefined") {
        keys[e.keyCode] = {
            state: false,
            pastState: false,
            execute: defaultKeyDownFunction
        }
    }
    keys[e.keyCode] = true;
    if (keys[e.keyCode].state && !keys[e.keyCode].pastState) {
    keys[e.keyCode].pastState = true;
        keys[e.keyCode].execute();
    }
})

document.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
})