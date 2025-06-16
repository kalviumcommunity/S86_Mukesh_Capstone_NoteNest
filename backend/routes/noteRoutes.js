const express = require('express');
const router = express.Router();
const {
  createNote,
  getNotes,
  getNotesByFolder,
  updateNote,
  deleteNote
} = require('../controllers/noteController');

router.post('/', createNote);
router.get('/', getNotes);
router.get('/folder/:folderId', getNotesByFolder);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;
