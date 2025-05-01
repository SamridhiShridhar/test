const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  stock_quantity: { type: Number, default: 0 },
  unit: { type: String, required: true },
  expiry_date: { type: Date }
});

module.exports = mongoose.model('Product', ProductSchema);