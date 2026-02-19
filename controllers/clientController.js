const Client = require('../models/Client');

// 1. إنشاء عميل جديد (ربطه بالمستخدم الحالي)
exports.createClient = async (req, res) => {
  try {
    // نستخدم المعرف الذي استخرجه الـ Middleware من التوكن
    const client = await Client.create({
      ...req.body,
      user: req.user.id 
    });

    console.log("✅ تم إضافة الموكل وربطه بالمستخدم:", req.user.id);
    res.status(201).json(client);
  } catch (error) {
    console.error("❌ فشل إضافة الموكل:", error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 2. عرض جميع عملاء المستخدم الحالي فقط
exports.getClients = async (req, res) => {
  try {
    console.log("--- فحص شامل ---");
    console.log("1. ID المستخدم من التوكن:", req.user.id);

    // جلب كل الموكلين في القاعدة بدون أي فلترة
    const allInDB = await Client.find({});
    console.log("2. كل الموكلين الموجودين في القاعدة حالياً:", allInDB);

    // جلب الموكلين المفلترين
    const filtered = await Client.find({ user: req.user.id });
    console.log("3. الموكلين بعد الفلترة بالـ ID:", filtered);
    
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 3. عرض عميل واحد (بشرط الملكية)
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!client) {
        return res.status(404).json({ message: 'العميل غير موجود أو لا تملك صلاحية الوصول إليه' });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 4. تعديل بيانات العميل (بشرط الملكية)
exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, 
      req.body, 
      { new: true, runValidators: true }
    );

    if (!client) {
        return res.status(404).json({ message: 'فشل التحديث: العميل غير موجود' });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 5. حذف العميل (بشرط الملكية)
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!client) {
        return res.status(404).json({ message: 'فشل الحذف: العميل غير موجود' });
    }
    res.json({ message: 'تم حذف العميل بنجاح' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
