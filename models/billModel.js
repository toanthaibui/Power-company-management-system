const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
  {
    electricId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const billModel = mongoose.model("bill", billSchema);
module.exports = billModel;
