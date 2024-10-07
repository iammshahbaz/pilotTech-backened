const mongoose = require("mongoose");

const stockSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  return: { type: Number, required: true },
  symbol: { type: String, required: true, unique: true } // Added symbol field with unique constraint
});

const StockModel = mongoose.model("stock", stockSchema);

module.exports = {
  StockModel
};
