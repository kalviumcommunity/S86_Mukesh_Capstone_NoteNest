const Folder = require('../models/folderSchema');
const Note = require('../models/noteSchema'); // ✅ Import Note model

// Create folder
const createFolder = async (req, res) => {
  const { name } = req.body;
  try {
    const folder = new Folder({ name });
    const savedFolder = await folder.save();
    res.status(201).json(savedFolder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all folders
const getAllFolders = async (req, res) => {
  try {
    const folders = await Folder.find();
    res.json(folders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update folder
const updateFolder = async (req, res) => {
  const folderId = req.params.id;
  const { name } = req.body;
  try {
    const updatedFolder = await Folder.findByIdAndUpdate(
      folderId,
      { name },
      { new: true }
    );
    if (!updatedFolder) {
      return res.status(404).json({ message: 'Folder not found' });
    }
    res.json(updatedFolder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete folder and its notes
const deleteFolder = async (req, res) => {
  const folderId = req.params.id;
  try {
    // ✅ Step 1: Delete all notes inside this folder
    await Note.deleteMany({ folder: folderId });

    // ✅ Step 2: Delete the folder itself
    const deletedFolder = await Folder.findByIdAndDelete(folderId);
    if (!deletedFolder) {
      return res.status(404).json({ message: 'Folder not found' });
    }
    res.json({ message: 'Folder and its notes deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createFolder,
  getAllFolders,
  updateFolder,
  deleteFolder
};
