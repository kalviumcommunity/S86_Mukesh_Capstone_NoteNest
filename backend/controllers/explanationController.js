const Explanation = require('../models/explanationSchema');

// Get all explanations
exports.getExplanations = async (req, res) => {
  try {
    const explanations = await Explanation.find().sort({ createdAt: -1 });
    res.json(explanations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch explanations' });
  }
};

// Add a new explanation
exports.addExplanation = async (req, res) => {
  try {
    const { name, code, explanation, language } = req.body;
    if (!name || !code || !explanation || !language) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newExplanation = new Explanation({ name, code, explanation, language });
    await newExplanation.save();
    res.status(201).json(newExplanation);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add explanation' });
  }
};

// Delete an explanation
exports.deleteExplanation = async (req, res) => {
  try {
    const { id } = req.params;
    await Explanation.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete explanation' });
  }
};

// Update an explanation
exports.updateExplanation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, explanation, language } = req.body;
    const updated = await Explanation.findByIdAndUpdate(
      id,
      { name, code, explanation, language, updatedAt: Date.now() },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update explanation' });
  }
};
