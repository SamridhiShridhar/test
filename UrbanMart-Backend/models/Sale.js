const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  sale_date: { type: Date, default: Date.now },
  total_amount: { type: Number, required: true },
  payment_method: { type: String, enum: ['CASH', 'CARD', 'UPI'], required: true }
});

module.exports = mongoose.model('Sale', SaleSchema);