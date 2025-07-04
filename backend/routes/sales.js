// backend/routes/sales.js
const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');

router.get('/', async (req, res) => {
  const sales = await Sale.find();
  res.json(sales);
});

router.post('/', async (req, res) => {
  const sale = new Sale(req.body);
  await sale.save();
  res.status(201).json(sale);
});

module.exports = router;
