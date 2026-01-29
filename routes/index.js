const express = require('express');
const router = express.Router();

router.use('/users', require('./userRoutes'));
router.use('/clients', require('./clientRoutes'));
router.use('/cases', require('./caseRoutes'));
router.use('/hearings', require('./hearingRoutes'));
router.use('/billing', require('./billingRoutes'));
router.use('/settings', require('./settingsRoutes'));

module.exports = router;
