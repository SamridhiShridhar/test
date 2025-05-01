const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');

// GET all suppliers
router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new supplier
router.post('/', async (req, res) => {
  const supplier = new Supplier({
    supplier_name: req.body.supplier_name,
    contact_person: req.body.contact_person,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address
  });

  try {
    const newSupplier = await supplier.save();
    res.status(201).json(newSupplier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;