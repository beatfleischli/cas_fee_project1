

class Requests {
    asyncRequest (method, url, data, callback) {
        var request = new XMLHttpRequest();

        request.onload = function () {
            callback(request.responseText);
        };


        request.open(method,url);
        request.setRequestHeader("Content-type", "application/json");
        request.send(data);
    }
}

export default new Requests();