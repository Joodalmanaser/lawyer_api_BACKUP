const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ['open', 'closed', 'pending'],
    default: 'open'
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client', 
    required: true
  },
  // 💡 غيرنا 'user' إلى 'assignedLawyer' ليطابق الـ Controller والتطبيق
  assignedLawyer: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Case', caseSchema);