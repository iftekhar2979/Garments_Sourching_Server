const express = require('express');
const router = express.Router();
const bankService = require('../services/bank.service.js');

// Create a new bank
router.post('/banks', async (req, res) => {
  try {
    const bank = await bankService.createBank(req.body);
    res.status(201).json(bank);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all banks
router.get('/banks', async (req, res) => {
  try {
    const banks = await bankService.getAllBanks();
    res.status(200).json(banks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single bank by ID
router.get('/banks/:id', async (req, res) => {
  try {
    const bank = await bankService.getBankById(req.params.id);
    res.status(200).json(bank);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a bank by ID
router.put('/banks/:id', async (req, res) => {
  try {
    const updatedBank = await bankService.updateBank(req.params.id, req.body);
    res.status(200).json(updatedBank);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a bank by ID
router.delete('/banks/:id', async (req, res) => {
  try {
    const response = await bankService.deleteBank(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
