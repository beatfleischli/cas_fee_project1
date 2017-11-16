const Datastore = require('nedb');
const db = new Datastore({ filename: './data/notes.db', autoload: true });



function publicAdd(note, callback) {
    db.insert(note, function(err, newDoc){
        callback(err, newDoc);
    });
}

function publicRemove(id,  callback) {
    db.update({_id: id }, {$set: {state: "DELETED"}}, {returnUpdatedDocs:true}, function (err, count, doc) {
        callback(err, doc);
    });
}

function publicGet(id, callback) {
    db.findOne({ _id: id, state : "OK" }, function (err, doc) {
        callback( err, doc);
    });
}

function publicUpdate(id, note, callback) {
    db.update({ _id: id }, note , {returnUpdatedDocs:true}, function (err, count, doc) {
        callback( err, doc);
    });
}

function publicAll(req, callback) {

//    db.find({state :"OK"}).sort({ created: -1 }).exec(function (err, docs) {
    db.find({$not:{state : "DELETED"}}).sort({ created: -1 }).exec(function (err, docs) {
        callback( err, docs);
    });
}

module.exports = {add : publicAdd, delete : publicRemove, get : publicGet, all : publicAll, update : publicUpdate};