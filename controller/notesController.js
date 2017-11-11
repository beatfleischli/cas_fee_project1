


module.exports.showIndex = function(req, res)
{
    res.sendFile("index.html",  {root: __dirname + '/public/'})
};

module.exports.getAllNotes = function(req, res)
{
    res.sendFile("index.html",  {root: __dirname + '/public/'})
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