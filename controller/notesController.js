let path = require('path');


module.exports.showIndex = function(req, res)
{
    console.log('showIndex');
    res.sendFile("index.html",  {root: path.join(__dirname , '../public/')})
};

module.exports.getAllNotes = function(req, res)
{
    res.type('text/html');
    res.write("<html>");
    res.write("<p>Erfolgreich!</p>");
    res.write("<p>Ihre order: empty</p>");
    res.write("<p>Ihre Nummer: 1 !</p>");
    res.end("</html>");
//    res.sendFile("index.html",  {root: __dirname + '/public/'})
};

module.exports.getNote = function(req, res)
{
    res.sendFile("index.html",  {root: __dirname + '/public/'})
};

module.exports.createNote = function(req, res)
{
    res.sendFile("index.html",  {root: __dirname + '/public/'})
};

module.exports.deleteNote = function(req, res)
{
    res.sendFile("index.html",  {root: __dirname + '/public/'})
};