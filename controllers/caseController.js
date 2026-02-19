const Case = require('../models/Case');
const User = require('../models/User'); // تأكد من استيراد موديل المستخدم

// 1. إنشاء قضية جديدة
exports.createCase = async (req, res) => {
  try {
    // نستخدم assignedLawyer لربط القضية بالمحامي الذي أنشأها (المستخدم الحالي)
    const newCase = await Case.create({
      ...req.body,
      assignedLawyer: req.user.id 
    });

    // إضافة معرف القضية إلى مصفوفة قضايا المحامي
    await User.findByIdAndUpdate(req.user.id, {
      $push: { cases: newCase._id }
    });

    res.status(201).json(newCase);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 2. عرض القضايا الخاصة بالمحامي المسجل فقط
exports.getCases = async (req, res) => { 
  try {
    // البحث يتم باستخدام assignedLawyer ليطابق بيانات الـ Token
    // استخدام populate('client') يرسل بيانات الموكل كاملة للتطبيق
    const cases = await Case.find({ assignedLawyer: req.user.id }).populate('client');
    res.json(cases);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 3. عرض قضية واحدة (التأكد من تبعيتها للمحامي)
exports.getCaseById = async (req, res) => {
  try {
    const singleCase = await Case.findOne({ 
      _id: req.params.id, 
      assignedLawyer: req.user.id 
    }).populate('client');

    if (!singleCase) {
      return res.status(404).json({ message: 'القضية غير موجودة أو لا تملك صلاحية الوصول إليها' });
    }
    res.json(singleCase);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 4. تعديل قضية
exports.updateCase = async (req, res) => {
  try {
    const updatedCase = await Case.findOneAndUpdate(
      { _id: req.params.id, assignedLawyer: req.user.id },
      req.body, 
      { new: true, runValidators: true }
    ).populate('client');

    if (!updatedCase) {
      return res.status(404).json({ message: 'فشل التحديث: القضية غير موجودة أو لا تملك الصلاحية' });
    }
    res.json(updatedCase);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 5. حذف قضية
exports.deleteCase = async (req, res) => {
  try {
    const deletedCase = await Case.findOneAndDelete({ 
      _id: req.params.id, 
      assignedLawyer: req.user.id 
    });

    if (!deletedCase) {
      return res.status(404).json({ message: 'فشل الحذف: القضية غير موجودة أو لا تملك الصلاحية' });
    }
    res.json({ message: 'تم حذف القضية بنجاح' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};