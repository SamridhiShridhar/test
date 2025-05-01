const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  supplier_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  purchase_price: { type: Number, required: true },
  purchase_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Purchase', PurchaseSchema);