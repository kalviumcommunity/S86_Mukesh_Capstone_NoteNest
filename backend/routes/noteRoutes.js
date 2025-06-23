// backend/routes/noteRoutes.js

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  createNote,
  getNotesByFolder,
  deleteNote,
  updateNote,
} = require("../controllers/noteController");

router.post("/", auth, upload.single("file"), createNote);
router.get("/folder/:folderId", auth, getNotesByFolder);
router.delete("/:noteId", auth, deleteNote);
router.put("/:noteId", auth, upload.single("file"), updateNote);

module.exports = router;
