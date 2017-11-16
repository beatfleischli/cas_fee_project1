const express = require ('express');
const router =  express.Router();
const notes = require('../controller/indexController');

router.get("/", notes.showIndex);
router.get("/public/*", notes.sendRefs);
router.get("/notes", notes.getAllNotes);
router.post("/notes", notes.createNote);
router.post("/notes/:id/", notes.updateNote);
router.get("/notes/:id/", notes.getNote);
router.delete("/notes/:id/", notes.deleteNote);

module.exports = router;