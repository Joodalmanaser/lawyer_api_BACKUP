const express = require('express');
const router = express.Router();
const {
  createHearing,
  getHearingsByCase,
  updateHearing,
  deleteHearing
} = require('../controllers/hearingController');

const auth = require('../middleware/auth');

// جميع العمليات محمية
router.use(auth);

// إضافة جلسة
router.post('/', createHearing);

// عرض كل الجلسات لقضية معينة
router.get('/case/:caseId', getHearingsByCase);

// تعديل جلسة
router.put('/:id', updateHearing);

// حذف جلسة
router.delete('/:id', deleteHearing);

module.exports = router;
