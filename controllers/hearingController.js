const Hearing = require('../models/Hearing');

// إضافة جلسة جديدة
exports.createHearing = async (req, res) => {
  try {
    const hearing = await Hearing.create(req.body);
    res.status(201).json(hearing);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// عرض كل الجلسات لقضية معينة
exports.getHearingsByCase = async (req, res) => {
  try {
    const hearings = await Hearing.find({ case: req.params.caseId });
    res.json(hearings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// تعديل جلسة
exports.updateHearing = async (req, res) => {
  try {
    const hearing = await Hearing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hearing) return res.status(404).json({ message: 'Hearing not found' });
    res.json(hearing);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// حذف جلسة
exports.deleteHearing = async (req, res) => {
  try {
    const hearing = await Hearing.findByIdAndDelete(req.params.id);
    if (!hearing) return res.status(404).json({ message: 'Hearing not found' });
    res.json({ message: 'Hearing deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
