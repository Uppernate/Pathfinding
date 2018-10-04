function foreach(list, f) {
    for (var i = 0; i < list.length; i++) {
        var r = f(list[i]);
        if (r != null) {
            return r;
        }
    }
}