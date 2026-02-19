const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 3000;

// 1️⃣ Middleware للمراقبة (أضفه قبل الـ Routes)
app.use((req, res, next) => {
  console.log(`📡 [${new Date().toLocaleTimeString()}] وصل طلب: ${req.method} ${req.url}`);
  next();
});

// 2️⃣ استدعاء الراوترات
const settingsRoutes = require('./routes/settingsRoutes');
// ملاحظة: تأكد إن راوتر الموكلين موجود هنا أيضاً إذا لم يكن في ملف app.js
// const clientRoutes = require('./routes/clientRoutes');
// app.use("/api/clients", clientRoutes);

app.use("/api/settings", settingsRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🔗 Local access: http://localhost:${PORT}`);
      // استبدل الـ IP التالي بـ IP جهازك الفعلي
      console.log(`🌐 Network access: http://YOUR_IP_HERE:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ DB connection error:', err);
    process.exit(1);
  });
