const Note = require('../models/noteSchema');

// Create note
const createNote = async (req, res) => {
  const { title, content, file, folderId } = req.body;
  try {
    const note = new Note({
      title,
      content,
      file,
      folder: folderId
    });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get notes by folder
const getNotesByFolder = async (req, res) => {
  try {
    const { folderId } = req.params;
    const notes = await Note.find({ folder: folderId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update note
const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const updateData = req.body;
    const updatedNote = await Note.findByIdAndUpdate(noteId, updateData, { new: true });
    if (!updatedNote) return res.status(404).json({ message: "Note not found" });
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete note
const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const deletedNote = await Note.findByIdAndDelete(noteId);
    if (!deletedNote) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createNote,
  getNotes,
  getNotesByFolder,
  updateNote,
  deleteNote
};
