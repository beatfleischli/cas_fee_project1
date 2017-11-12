"use strict"

let asyncRequest = function  (method, url, data, callback) {
    var request = new XMLHttpRequest();

    request.onload = function () {
        callback(request.responseText);
    };

    request.open(method,url);
    request.send(data);
}