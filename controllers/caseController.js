const Case = require('../models/Case');

exports.createCase = async (req, res) => {
  try {
    const newCase = await Case.create(req.body);
    res.status(201).json(newCase);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getCases = async (req, res) => { 
  try {
    const cases = await Case.find().populate('client');
    res.json(cases);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getCaseById = async (req, res) => {
  try {
    const singleCase = await Case.findById(req.params.id).populate('client');
    if (!singleCase) return res.status(404).json({ message: 'Case not found' });
    res.json(singleCase);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateCase = async (req, res) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCase) return res.status(404).json({ message: 'Case not found' });
    res.json(updatedCase);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteCase = async (req, res) => {
  try {
    const deletedCase = await Case.findByIdAndDelete(req.params.id);
    if (!deletedCase) return res.status(404).json({ message: 'Case not found' });
    res.json({ message: 'Case deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
