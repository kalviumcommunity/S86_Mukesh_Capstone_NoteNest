const fs = require("fs");
const path = require("path");
const Note = require("../models/noteSchema");

// Create Note
const createNote = async (req, res) => {
  try {
    const { title, content, folder } = req.body;
    const file = req.file ? req.file.filename : null;

    const note = new Note({
      title,
      content,
      folder,
      user: req.user.id,
      file,
    });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ error: "Failed to create note" });
  }
};

// Get Notes by Folder
const getNotesByFolder = async (req, res) => {
  try {
    const notes = await Note.find({
      folder: req.params.folderId,
      user: req.user.id,
    });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

// Delete Note
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.noteId,
      user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Delete attached file if it exists
    if (note.file) {
      const filePath = path.join(__dirname, "../uploads", note.file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
};

// Update Note with optional file add/remove
const updateNote = async (req, res) => {
  try {
    const { title, content, removeFile } = req.body;
    const noteId = req.params.noteId;

    const note = await Note.findOne({ _id: noteId, user: req.user.id });
    if (!note) return res.status(404).json({ message: "Note not found" });

    // Remove old file if requested
    if (removeFile === "true" && note.file) {
      const filePath = path.join(__dirname, "../uploads", note.file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      note.file = null;
    }

    // If a new file is uploaded
    if (req.file) {
      // Delete previous file
      if (note.file) {
        const oldPath = path.join(__dirname, "../uploads", note.file);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      note.file = req.file.filename;
    }

    note.title = title || note.title;
    note.content = content || note.content;

    const updatedNote = await note.save();
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: "Failed to update note" });
  }
};

module.exports = {
  createNote,
  getNotesByFolder,
  deleteNote,
  updateNote,
};
