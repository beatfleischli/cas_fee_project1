const express = require ('express');
const router =  express.Router();
const notes = require('../controller/notesController');


router.get("/", notes.showIndex);
router.get("/notes", notes.getAllNotes);
router.post("/notes", notes.createNote);
router.get("/notes/:id/", notes.getNote);
router.delete("/notes/:id/", notes.deleteNote);

module.exports = router;