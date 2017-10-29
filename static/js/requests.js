"use strict"

let loadTemplate = function (path,callback) {
    var request = new XMLHttpRequest();

    request.onload = function () {
        callback(request.responseText);
    };

    request.open("GET",path);
    request.send(null);
}