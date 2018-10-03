mousePos = {
    x: 0,
    y: 0
}

document.addEventListener("mousemove", function (e) {
    mousePos.x = e.pageX - 8;
    mousePos.y = e.pageY - 8;
})