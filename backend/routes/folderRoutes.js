const express = require('express');
const router = express.Router();
const {
  createFolder,
  getFolders,
  updateFolder,
  deleteFolder,
} = require('../controllers/folderController');
const authenticateUser = require('../middleware/auth');

// Create a new folder
router.post('/', authenticateUser, createFolder);

// Get all folders of the logged-in user
router.get('/all', authenticateUser, getFolders);

// Update folder name
router.put('/:id', authenticateUser, updateFolder);

// Delete a folder
router.delete('/:id', authenticateUser, deleteFolder);

module.exports = router;
