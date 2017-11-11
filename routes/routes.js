const express = require ('express');
const router =  express.Router();
const notes = require('../controller/notesController');





function myDummyLogger( options ){
    options = options ? options : {};

    return function myInnerDummyLogger(req, res, next)
    {
        console.log(req.method +":"+ req.url);
//        console.log(req);
        next();
    }
}

router.all("/*", myDummyLogger());

router.get("/", notes.showIndex);
router.get("/notes", notes.getAllNotes);
router.post("/notes", notes.createNote);
router.get("/notes/:id/", notes.getNote);
router.delete("/notes/:id/", notes.deleteNote);

module.exports = router;