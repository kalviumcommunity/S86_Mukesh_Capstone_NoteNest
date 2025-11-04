const mongoose = require('mongoose');

const explanationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  explanation: { type: String, required: true },
  language: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Explanation', explanationSchema);
