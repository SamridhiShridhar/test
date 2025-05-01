const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products (with category details)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category_id');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new product
router.post('/', async (req, res) => {
  const product = new Product({
    product_name: req.body.product_name,
    category_id: req.body.category_id,
    brand: req.body.brand,
    price: req.body.price,
    stock_quantity: req.body.stock_quantity,
    unit: req.body.unit,
    expiry_date: req.body.expiry_date
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update stock quantity)
router.put('/:id/stock', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    product.stock_quantity = req.body.stock_quantity;
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

// Get bestsellers
// In productRoutes.js
router.get('/bestsellers', async (req, res) => {
  try {
    const bestSellers = await Product.aggregate([
      {
        $lookup: {
          from: 'sales_items', // Your sales items collection
          localField: '_id',
          foreignField: 'product_id',
          as: 'sales_data'
        }
      },
      {
        $addFields: {
          salesCount: { $size: '$sales_data' }
        }
      },
      { $sort: { salesCount: -1 } },
      { $limit: 4 }
    ]);
    res.json(bestSellers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});