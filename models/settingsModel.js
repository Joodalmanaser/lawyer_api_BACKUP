const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema({
  user: { // توحيد المسمى ليكون 'user' بدلاً من 'userId'
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true // لضمان وجود سجل إعدادات واحد فقط لكل محامي
  },
  notifications: { type: Boolean, default: true },
  darkMode: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Settings", SettingsSchema);
