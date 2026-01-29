// routes/settingsRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getSettings, updateSetting } = require("../controllers/settingsController");

// GET /api/settings
router.get("/", auth, getSettings);

// PUT /api/settings
router.put("/", auth, updateSetting);

module.exports = router;
