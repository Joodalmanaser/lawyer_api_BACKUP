// controllers/settingsController.js
const Settings = require("../models/settingsModel");

exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne({ userId: req.user.userId });

    if (!settings) {
      // create default settings if user has none
      settings = await Settings.create({
        userId: req.user.userId,
        notifications: true,
        darkMode: false,
      });
    }

    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateSetting = async (req, res) => {
  try {
    const { key, value } = req.body;

    if (!key) return res.status(400).json({ message: "Missing key" });

    const settings = await Settings.findOneAndUpdate(
      { userId: req.user.userId },
      { [key]: value },
      { new: true }
    );

    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
