const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Note = require('../models/noteSchema');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

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

// GET: All notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notes', error: err });
  }
});

// GET: Single note by ID
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching note', error: err });
  }
});

// PUT: Update note
router.put('/:id', upload.single('file'), async (req, res) => {
  try {
    const { title, content } = req.body;
    const file = req.file ? req.file.filename : undefined;

    const updateData = { title, content };
    if (file) updateData.file = file;

    const updatedNote = await Note.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ message: 'Error updating note', error: err });
  }
});

// DELETE: Remove note
router.delete('/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting note', error: err });
  }
});

module.exports = router;
