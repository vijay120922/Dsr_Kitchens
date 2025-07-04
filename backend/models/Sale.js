const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  items: [
    {
      itemName: String,
      price: Number,
      quantity: Number,
      total: Number
    }
  ],
  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Sale", saleSchema);
