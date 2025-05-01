const express = require('express');
const router = express.Router();
const SaleItem = require('../models/SaleItem');

// GET all items for a sale
router.get('/sale/:id', async (req, res) => {
  try {
    const items = await SaleItem.find({ sale_id: req.params.id }).populate('product_id');
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new sale item
router.post('/', async (req, res) => {
  const saleItem = new SaleItem({
    sale_id: req.body.sale_id,
    product_id: req.body.product_id,
    quantity: req.body.quantity,
    unit_price: req.body.unit_price
  });

  try {
    const newSaleItem = await saleItem.save();
    res.status(201).json(newSaleItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;