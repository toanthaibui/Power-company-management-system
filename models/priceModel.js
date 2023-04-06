const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "name is required"],
    },
    price: {
      type: Number,
      require: [true, "name is required"],
    },
  },
  { timestamps: true }
);

const priceModel = mongoose.model("price", priceSchema);
module.exports = priceModel;
