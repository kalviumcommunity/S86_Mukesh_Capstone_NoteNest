const express = require('express');
const router = express.Router();
const {
  createFolder,
  getAllFolders,
  updateFolder,
  deleteFolder
} = require('../controllers/folderController');

router.post('/', createFolder);
router.get('/', getAllFolders);
router.put('/:id', updateFolder);
router.delete('/:id', deleteFolder);

module.exports = router;
