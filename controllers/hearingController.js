const Hearing = require('../models/Hearing');
const Case = require('../models/Case');

// 1. إضافة جلسة جديدة
exports.createHearing = async (req, res) => {
  try {
    // التأكد أن القضية تابعة للمستخدم الحالي
    const parentCase = await Case.findOne({
      _id: req.body.case,
      assignedLawyer: req.user.id
    });
    if (!parentCase) {
      return res.status(403).json({ message: 'لا يمكنك إضافة جلسة لقضية لا تملكها' });
    }

    const hearing = await Hearing.create({
      ...req.body,
      assignedLawyer: req.user.id
    });
    res.status(201).json(hearing);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 2. عرض كل الجلسات لقضية معينة (بشرط ملكية المستخدم)
exports.getHearingsByCase = async (req, res) => {
  try {
    const hearings = await Hearing.find({ 
      case: req.params.caseId, 
      assignedLawyer: req.user.id
    });
    res.json(hearings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 3. تعديل جلسة
exports.updateHearing = async (req, res) => {
  try {
    const hearing = await Hearing.findOneAndUpdate(
      { _id: req.params.id, assignedLawyer: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!hearing) {
      return res.status(404).json({ message: 'الجلسة غير موجودة أو لا تملك صلاحية تعديلها' });
    }
    res.json(hearing);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 4. حذف جلسة
exports.deleteHearing = async (req, res) => {
  try {
    const hearing = await Hearing.findOneAndDelete({ 
      _id: req.params.id, 
      assignedLawyer: req.user.id 
    });

    if (!hearing) {
      return res.status(404).json({ message: 'الجلسة غير موجودة أو لا تملك صلاحية حذفها' });
    }
    res.json({ message: 'تم حذف الجلسة بنجاح' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
