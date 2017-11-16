let path = require('path');
let store = require("../services/notesStore.js");


module.exports.showIndex = function(req, res)
{
    res.sendFile("index.html",  {root: path.join(__dirname , '../public/')})
};

module.exports.sendRefs = function(req, res)
{
    res.sendFile(req.url,  {root: path.join(__dirname , '../')})
};

module.exports.getAllNotes = function(req, res)
{
    store.all(req, function (err, notes) {
        res.json(notes || {});
    })
};

module.exports.getNote = function(req, res)
{
    store.get(req.params.id, function (err, note) {
        res.json(note);
    })
};

module.exports.createNote = function(req, res)
{
    store.add(req.body, function(err, note) {
        res.json(note);
    });
};

module.exports.updateNote = function(req, res)
{
    store.update(req.params.id, req.body, function (err, note) {
        res.json(note);
    })
};

module.exports.deleteNote = function(req, res)
{
    store.delete(req.params.id, function (err, note) {
        res.json(note);
    })
};