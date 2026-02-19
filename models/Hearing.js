const mongoose = require('mongoose');

const hearingSchema = new mongoose.Schema({
  case: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Case',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  notes: String,
  result: String,

  assignedLawyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model('Hearing', hearingSchema);
