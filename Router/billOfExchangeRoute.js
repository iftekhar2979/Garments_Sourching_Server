const express = require('express');
const router = express.Router();
const billOfExchangeService = require('../services/billOfExchange.service');

// Create a new Bill of Exchange
router.post('/bills', async (req, res) => {
  try {
    const bill = await billOfExchangeService.createBillOfExchange(req.body);
    res.status(201).json(bill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all Bills of Exchange
router.get('/bills', async (req, res) => {
  try {
    const bills = await billOfExchangeService.getAllBills();
    res.status(200).json(bills);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single Bill of Exchange by ID
router.get('/bills/:id', async (req, res) => {
  try {
    const bill = await billOfExchangeService.getBillById(req.params.id);
    res.status(200).json(bill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a Bill of Exchange by ID
router.put('/bills/:id', async (req, res) => {
  try {
    const updatedBill = await billOfExchangeService.updateBillOfExchange(req.params.id, req.body);
    res.status(200).json(updatedBill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a Bill of Exchange by ID
router.delete('/bills/:id', async (req, res) => {
  try {
    const response = await billOfExchangeService.deleteBillOfExchange(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
