const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    fullName: {
      type: String,
      require: [true, "full name is required"],
    },
    phone: {
      type: String,
      require: [true, "phone is required"],
    },
    cccd: {
      type: String,
      require: [true, "cccd is required"],
    },
    email: {
      type: String,
      require: [true, "email is required"],
    },
    address: {
      type: String,
      require: [true, "address is required"],
    },
    specialization: {
      type: String,
      require: [true, "specialization is required"],
    },
    level: {
      type: String,
      require: [true, "level is required"],
    },
    experience: {
      type: String,
      require: [true, "experience is required"],
    },
    status: {
      type: String,
      default: "approved",
    },
  },
  { timestamps: true }
);

const staffModel = mongoose.model("staffs", staffSchema);
module.exports = staffModel;
