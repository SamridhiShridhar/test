const express = require('express');
const router = express.Router();
const InventoryLog = require('../models/InventoryLog');

// GET all inventory logs (for a product)
router.get('/product/:id', async (req, res) => {
  try {
    const logs = await InventoryLog.find({ product_id: req.params.id });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new log (e.g., stock increase/decrease)
router.post('/', async (req, res) => {
  const log = new InventoryLog({
    product_id: req.body.product_id,
    change_type: req.body.change_type, // 'IN' or 'OUT'
    quantity_changed: req.body.quantity_changed
  });

  try {
    const newLog = await log.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;