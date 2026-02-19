const Billing = require('../models/Billing');
const Case = require('../models/Case');

// 1. إنشاء فاتورة جديدة
exports.createInvoice = async (req, res) => {
  try {
    // تأكد أن القضية تابعة للمستخدم الحالي
    const parentCase = await Case.findOne({
      _id: req.body.case,
      user: req.user.id // التأكد من ملكية القضية
    });

    if (!parentCase) {
      return res.status(403).json({
        message: 'لا يمكنك إصدار فاتورة لقضية لا تملكها'
      });
    }

    const invoice = await Billing.create({
      ...req.body,
      user: req.user.id // ربط الفاتورة بالمحامي الحالي
    });

    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 2. عرض كل فواتير المستخدم الحالي
exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Billing
      .find({ user: req.user.id })
      .populate('client')
      .populate('case');
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 3. عرض فاتورة واحدة (بشرط الملكية)
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Billing.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    }).populate('client case');

    if (!invoice) {
      return res.status(404).json({
        message: 'الفاتورة غير موجودة أو لا تملك صلاحية الوصول إليها'
      });
    }
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 4. تحديث حالة الفاتورة (مدفوعة)
exports.markAsPaid = async (req, res) => {
  try {
    const invoice = await Billing.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { paid: true },
      { new: true }
    );

    if (!invoice) {
      return res.status(404).json({ message: 'الفاتورة غير موجودة أو لا تملك الصلاحية' });
    }
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 5. حذف الفاتورة
exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Billing.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!invoice) {
      return res.status(404).json({ message: 'الفاتورة غير موجودة أو لا تملك الصلاحية' });
    }
    res.json({ message: 'تم حذف الفاتورة بنجاح' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
