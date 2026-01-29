const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  case: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Case',
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paid: {
    type: Boolean,
    default: false
  },
  description: String,
  dueDate: Date
}, { timestamps: true });

module.exports = mongoose.model('Billing', billingSchema);
