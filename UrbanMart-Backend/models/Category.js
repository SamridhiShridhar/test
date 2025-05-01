const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  category_name: { type: String, required: true },
  description: { type: String },
  imageName: { type: String }
});

module.exports = mongoose.model('Category', CategorySchema);
