const express = require('express');
const router = express.Router();
// ✅ تأكد من إضافة updateProfile هنا في سطر الـ require
const { register, login, getProfile, updateProfile } = require('../controllers/userController');
// تأكد إنك ضفت كلمة updateProfile هنا ⬆️
const auth = require('../middleware/auth'); 

// تسجيل مستخدم جديد
router.post('/register', register);

// تسجيل الدخول
router.post('/login', login);

// بروفايل المستخدم
router.get('/profile', auth, getProfile);

// ✅ التعديل الجديد: تحديث البروفايل
router.put('/update-profile', auth, updateProfile);

module.exports = router;