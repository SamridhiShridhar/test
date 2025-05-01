const express = require('express');
const router = express.Router();
const DeliveryPersonnel = require('../models/DeliveryPersonnel');

// GET all delivery personnel
router.get('/', async (req, res) => {
  try {
    const personnel = await DeliveryPersonnel.find();
    res.json(personnel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new delivery person
router.post('/', async (req, res) => {
  const personnel = new DeliveryPersonnel({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email
  });

  try {
    const newPersonnel = await personnel.save();
    res.status(201).json(newPersonnel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;