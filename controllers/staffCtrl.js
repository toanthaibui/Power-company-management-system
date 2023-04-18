const staffModel = require("../models/staffModels");
const userModel = require("../models/userModels");
const electricModel = require("../models/electricModel");
const billModel = require("../models/billModel");
const customerModel = require("../models/customerModel");
const priceModel = require("../models/priceModel");

const getStaffInfoController = async (req, res) => {
  try {
    const staff = await staffModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "staff data fetch success",
      data: staff,
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

//update staff profile
const updateProfileController = async (req, res) => {
  try {
    const staff = await staffModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Staff Profile Updated",
      data: staff,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Staff Profile Update issue",
      error,
    });
  }
};

//get single staff
const getStaffByIdController = async (req, res) => {
  try {
    const staff = await staffModel.findOne({ _id: req.body.staffId });
    res.status(200).send({
      success: true,
      message: "Single staff info fetched",
      data: staff,
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

const setElectricNoteController = async (req, res) => {
  try {
    const newElectric = await electricModel({ ...req.body, status: "0" });
    await newElectric.save();
    res.status(201).send({
      success: true,
      message: "Chỉ số điện tháng này đã được thêm",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Xảy ra lỗi trong thêm chỉ số điện",
    });
  }
};

const getElectricCustomerController = async (req, res) => {
  try {
    const electric = await electricModel.find({
      customerId: req.body.customerId,
    });
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

const getElectricInfoController = async (req, res) => {
  try {
    const electric = await electricModel.findById({
      _id: req.body.electricId,
    });
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

const getBillByElectricController = async (req, res) => {
  try {
    const bill = await billModel.findOne({
      electricId: req.body.electricId,
    });
    res.status(200).send({
      success: true,
      message: "Single staff info fetched",
      data: bill,
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

const setBillController = async (req, res) => {
  try {
    const electric = await electricModel.findOne({ _id: req.body.electricId });
    const customer = await customerModel.findOne({ _id: electric.customerId });
    const price = await priceModel.findOne({ name: customer.purpose });
    const total = electric.score * price.price;
    const newBill = await billModel({ electricId: electric._id, price: total });
    await newBill.save();
    const electricstatus = await electricModel.findByIdAndUpdate(electric._id, {
      status: "1",
    });
    res.status(201).send({
      success: true,
      message: "Hóa đơn đã được tạo",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Xảy ra lỗi tron khi tạo hóa đơn",
    });
  }
};

module.exports = {
  getStaffInfoController,
  updateProfileController,
  getStaffByIdController,
  setElectricNoteController,
  getElectricCustomerController,
  setBillController,
  getElectricInfoController,
  getBillByElectricController,
};
