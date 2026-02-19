const Settings = require("../models/settingsModel");

// 1. جلب الإعدادات (أو إنشاؤها إذا لم توجد)
exports.getSettings = async (req, res) => {
  try {
    // استخدام req.user.id بدل userId للتوحيد مع باقي الكنترولرز
    let settings = await Settings.findOne({ userId: req.user.id });

    if (!settings) {
      settings = await Settings.create({
        userId: req.user.id,
        notifications: true,
        darkMode: false,
      });
    }

    res.status(200).json(settings);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 2. تحديث إعداد معين
exports.updateSetting = async (req, res) => {
  try {
    const { key, value } = req.body;

    if (!key) return res.status(400).json({ message: "Missing key" });

    const settings = await Settings.findOneAndUpdate(
      { userId: req.user.id }, // التحقق من ملكية المستخدم
      { [key]: value },
      { new: true, runValidators: true }
    );

    if (!settings) {
      return res.status(404).json({ message: "Settings not found for this user" });
    }

    res.status(200).json(settings);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
