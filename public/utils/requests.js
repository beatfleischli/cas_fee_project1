"use strict"

let asyncRequest = function  (method, url, data, callback) {
    var request = new XMLHttpRequest();

    request.onload = function () {
        callback(request.responseText);
    };

    request.open(method,url);
    request.setRequestHeader("Content-type", "application/json");
//    request.setRequestHeader('Accept', 'application/json');
    request.send(data);
}