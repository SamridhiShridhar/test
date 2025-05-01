const mongoose = require('mongoose');

const DeliveryPersonnelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('DeliveryPersonnel', DeliveryPersonnelSchema);