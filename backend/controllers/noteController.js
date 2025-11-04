const fs = require("fs");
const path = require("path");
const Note = require("../models/noteSchema");

// Create Note
const createNote = async (req, res) => {
  try {
    const { title, content, folder } = req.body;
    let files = [];
    if (req.files && req.files.length > 0) {
      files = req.files.map(f => f.filename);
    }

    const note = new Note({
      title,
      content,
      folder,
      user: req.user.id,
      files,
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

// Update Note with optional file add/remove (supports multiple files)
const updateNote = async (req, res) => {
  try {
    const { title, content, removeFiles } = req.body;
    const noteId = req.params.noteId;

    const note = await Note.findOne({ _id: noteId, user: req.user.id });
    if (!note) return res.status(404).json({ message: "Note not found" });

    // Remove files if requested (expects array of filenames)
    let filesToRemove = [];
    try {
      if (removeFiles) {
        const parsed = JSON.parse(removeFiles);
        if (Array.isArray(parsed)) filesToRemove = parsed;
      }
    } catch (e) {}
    if (filesToRemove.length > 0) {
      note.files = note.files.filter(f => {
        if (filesToRemove.includes(f)) {
          const filePath = path.join(__dirname, "../uploads", f);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
          return false;
        }
        return true;
      });
    }

    // If new files are uploaded (req.files)
    if (req.files && req.files.length > 0) {
      const newFiles = req.files.map(f => f.filename);
      note.files = [...note.files, ...newFiles];
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
