const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    folder: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
    files: [String], // store multiple filenames
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
