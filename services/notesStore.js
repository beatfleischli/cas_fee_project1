const Datastore = require('nedb');
const db = new Datastore({ filename: './data/notes.db', autoload: true });


function Order(pizzaName, orderedBy)
{
    this.orderedBy = orderedBy;
    this.pizzaName = pizzaName;
    this.orderDate = new Date();
    this.state = "OK";
}


function publicAddNote(note, callback)
{
//    let order = new Order(pizzaName, orderedBy);
    db.insert(note, function(err, newDoc){
        console.log(newDoc);
        callback(err, newDoc);
    });
}

function publicRemove(id,  callback) {
    db.update({_id: id }, {$set: {"state": "DELETED"}}, {returnUpdatedDocs:true}, function (err, count, doc) {
        callback(err, doc);
    });
}

function publicGet(id, currentUser, callback)
{
    db.findOne({ _id: id, state : true }, function (err, doc) {
        callback( err, doc);
    });
}

function publicUpdate(id, note, callback)
{
    db.findOne({ _id: id }, note , function (err, doc) {
        callback( err, doc);
    });
}

function publicAll(currentUser, callback)
{
    db.find({state : true}).sort({ orderDate: -1 }).exec(function (err, docs) {
        callback( err, docs);
    });
}

module.exports = {add : publicAddNote, delete : publicRemove, get : publicGet, all : publicAll};