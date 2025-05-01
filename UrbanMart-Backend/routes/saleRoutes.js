const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');

// GET all sales (with customer details)
router.get('/', async (req, res) => {
  try {
    const sales = await Sale.find().populate('customer_id');
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new sale
router.post('/', async (req, res) => {
  const sale = new Sale({
    customer_id: req.body.customer_id,
    total_amount: req.body.total_amount,
    payment_method: req.body.payment_method
  });

  try {
    const newSale = await sale.save();
    res.status(201).json(newSale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;