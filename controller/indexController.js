let path = require('path');
let store = require("../services/notesStore.js");


module.exports.showIndex = function(req, res)
{
    console.log('showIndex');
    res.sendFile("index.html",  {root: path.join(__dirname , '../public/')})
};

module.exports.sendRefs = function(req, res)
{
    console.log(req.url);
    res.sendFile(req.url,  {root: path.join(__dirname , '../')})
};

module.exports.getAllNotes = function(req, res)
{
    store.all(util.current(req), function (err, notes) {
        res.json(notes || {});
    })
};

module.exports.getNote = function(req, res)
{
    res.sendFile("index.html",  {root: __dirname + '/public/'})
};

module.exports.createNote = function(req, res)
{
    store.add(req.body.note, function(err, order) {
        res.json(order);
    });
};

module.exports.updateNote = function(req, res)
{
    store.all(util.current(req), function (err, notes) {
        res.json(notes || {});
    })
};

module.exports.deleteNote = function(req, res)
{
    res.sendFile("index.html",  {root: __dirname + '/public/'})
};