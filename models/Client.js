const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: String,
  phone: String,
  address: String,
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);
