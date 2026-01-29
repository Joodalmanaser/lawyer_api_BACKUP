const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 3000;

// استدعاء الراوتر قبل تشغيل السيرفر
const settingsRoutes = require('./routes/settingsRoutes');
app.use("/api/settings", settingsRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');

    // تشغيل السيرفر على كل الـ IP عشان يشتغل على Xcode / جهاز تاني
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('DB connection error:', err);
    process.exit(1);
  });
