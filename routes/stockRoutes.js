const express = require('express');
const User = require('../model/userModel');
const Stock = require('../model/stockModel');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Get All Stocks (for subscription)
router.get('/', async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Subscribe to Stock
router.post('/subscribe', protect, async (req, res) => {
  const { symbol } = req.body;

  try {
    const stock = await Stock.findOne({ symbol });
    if (!stock) return res.status(404).json({ message: 'Stock not found' });

    req.user.subscriptions.push(symbol);
    await req.user.save();

    res.json({ message: `Subscribed to ${symbol}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Unsubscribe from Stock
router.post('/unsubscribe', protect, async (req, res) => {
  const { symbol } = req.body;

  try {
    const user = req.user;
    user.subscriptions = user.subscriptions.filter(sub => sub !== symbol);
    await user.save();

    res.json({ message: `Unsubscribed from ${symbol}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// View Subscribed Stocks
router.get('/subscriptions', protect, async (req, res) => {
  try {
    const user = req.user;
    res.json(user.subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
