const mongoose = require("mongoose");

const electricSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
    },
    staffId: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const electricModel = mongoose.model("electric", electricSchema);
module.exports = electricModel;
