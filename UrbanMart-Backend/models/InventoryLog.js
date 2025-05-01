const mongoose = require('mongoose');

const InventoryLogSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  change_type: { type: String, enum: ['IN', 'OUT'], required: true },
  quantity_changed: { type: Number, required: true },
  change_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('InventoryLog', InventoryLogSchema);