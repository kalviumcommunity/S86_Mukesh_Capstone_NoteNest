const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  file: {
    type: String,
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
