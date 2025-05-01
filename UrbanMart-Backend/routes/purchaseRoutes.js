const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');

// GET all purchases (with supplier/product details)
router.get('/', async (req, res) => {
  try {
    const purchases = await Purchase.find()
      .populate('supplier_id')
      .populate('product_id');
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new purchase (and update inventory)
router.post('/', async (req, res) => {
  const purchase = new Purchase({
    supplier_id: req.body.supplier_id,
    product_id: req.body.product_id,
    quantity: req.body.quantity,
    purchase_price: req.body.purchase_price
  });

  try {
    const newPurchase = await purchase.save();
    // TODO: Add inventory log here
    res.status(201).json(newPurchase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;