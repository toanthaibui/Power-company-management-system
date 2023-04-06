const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    fullName: {
      type: String,
      require: [true, "first name is required"],
    },
    phone: {
      type: String,
      require: [true, "phone is required"],
    },
    email: {
      type: String,
      require: [true, "email is required"],
    },
    cccd: {
      type: String,
      require: [true, "email is required"],
    },
    district: {
      type: String,
      require: [true, "address is required"],
    },
    ward: {
      type: String,
      require: [true, "specialization is required"],
    },
    road: {
      type: String,
      require: [true, "experience is required"],
    },
    numberHouse: {
      type: String,
    },
    purpose: {
      type: String,
      require: [true, "experience is required"],
    },
    status: {
      type: String,
      default: "0",
    },
  },
  { timestamps: true }
);

const customerModel = mongoose.model("customers", customerSchema);
module.exports = customerModel;
