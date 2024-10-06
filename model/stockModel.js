const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true },
  company: { type: String, required: true },
  price: { type: Number },
  historicalData: [{ date: Date, price: Number }],
});

module.exports = mongoose.model('Stock', StockSchema);
