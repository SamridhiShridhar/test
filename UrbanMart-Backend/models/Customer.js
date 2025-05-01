const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  registration_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', CustomerSchema);