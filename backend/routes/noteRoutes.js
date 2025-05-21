const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Note = require('../models/noteSchema');


// POST: Create note
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { title, content } = req.body;
    const file = req.file ? req.file.filename : null;

    const newNote = new Note({ title, content, file });
    await newNote.save();

    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ message: 'Error creating note', error: err });
  }
});

module.exports = router;
