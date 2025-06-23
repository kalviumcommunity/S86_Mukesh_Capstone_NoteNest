const Folder = require('../models/folderSchema');
const Note = require('../models/noteSchema'); // Add this line


// Create folder
const createFolder = async (req, res) => {
  const { name } = req.body;
  try {
    const folder = new Folder({ name, user: req.user.id });
    const savedFolder = await folder.save();
    res.status(201).json(savedFolder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all folders of the logged-in user with item count
const getFolders = async (req, res) => {
  try {
    const folders = await Folder.find({ user: req.user.id }).sort({ createdAt: -1 });

    const foldersWithItemCount = await Promise.all(
      folders.map(async (folder) => {
        const count = await Note.countDocuments({ folder: folder._id });
        return {
          ...folder.toObject(),
          noteCount: count,
        };
      })
    );

    res.status(200).json(foldersWithItemCount);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ Update folder name
const updateFolder = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const folder = await Folder.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { name },
      { new: true }
    );

    if (!folder) {
      return res.status(404).json({ error: "Folder not found or unauthorized" });
    }

    res.status(200).json(folder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Delete folder
const deleteFolder = async (req, res) => {
  const { id } = req.params;

  try {
    const folder = await Folder.findOneAndDelete({ _id: id, user: req.user.id });

    if (!folder) {
      return res.status(404).json({ error: "Folder not found or unauthorized" });
    }

    res.status(200).json({ message: "Folder deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createFolder,
  getFolders,
  updateFolder,
  deleteFolder,
};
