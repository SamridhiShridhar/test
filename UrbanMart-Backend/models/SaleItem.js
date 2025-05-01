const mongoose = require('mongoose');

const SaleItemSchema = new mongoose.Schema({
  sale_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Sale', required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  unit_price: { type: Number, required: true }
});

module.exports = mongoose.model('SaleItem', SaleItemSchema);