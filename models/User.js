const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'lawyer', 'staff'],
    default: 'lawyer'
  },
  // هاي أضفناها لتخزين جميع القضايا الخاصة بالمستخدم
  cases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Case' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
