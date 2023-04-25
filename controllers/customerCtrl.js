const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const customerModel = require("../models/customerModel");
const moment = require("moment");
const electricModel = require("../models/electricModel");

const updatePasswordController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({
        message: "Mật khẩu không chính xác",
        success: false,
      });
    }
    if (req.body.newpassword != req.body.newpasswordcheck) {
      return res.status(200).send({
        message: "Mật khẩu mới không trùng khớp với nhau",
        success: false,
      });
    }
    const password = req.body.newpassword;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(201).send({ message: "Đổi mật khẩu thành công", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Xảy ra khi điền thông tin",
    });
  }
};

const getCustomerInfoController = async (req, res) => {
  try {
    const customer = await customerModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "staff data fetch success",
      data: customer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching Staff Details",
    });
  }
};

const getCustomerByIdController = async (req, res) => {
  try {
    const customer = await customerModel.findOne({ _id: req.body.customerId });
    res.status(200).send({
      success: true,
      message: "staff data fetch success",
      data: customer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching Staff Details",
    });
  }
};

const updateProfileCustomerController = async (req, res) => {
  try {
    const customer = await customerModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Customer Profile Updated",
      data: customer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Customer Profile Update issue",
      error,
    });
  }
};

const getElectricCustomerUserController = async (req, res) => {
  try {
    const customer = await customerModel.findOne({ userId: req.body.userId });
    const electric = await electricModel
      .find({
        customerId: customer._id,
      })
      .sort({ date: -1 });
    res.status(200).send({
      success: true,
      message: "Single staff info fetched",
      data: electric,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in single staff info",
    });
  }
};

const priceMonthController = async (req, res) => {
  try {
    const price_month = await electricModel.aggregate([
      { $match: { customerId: req.body.customerId } },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          totalAmount: { $sum: "$price" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $limit: 12,
      },
    ]);

    const sum = await electricModel.aggregate([
      { $match: { customerId: req.body.customerId } },
      {
        $group: {
          _id: {},
          totalAmount: { $sum: "$price" },
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).send({
      success: true,
      message: "users data list",
      price_month,
      sum,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "erorr while fetching users",
      error,
    });
  }
};

module.exports = {
  updatePasswordController,
  getCustomerInfoController,
  updateProfileCustomerController,
  getCustomerByIdController,
  getElectricCustomerUserController,
  priceMonthController,
};
