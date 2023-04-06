const staffModel = require("../models/staffModels");
const appointmentModel = require("../models/appointmentModel");
const userModel = require("../models/userModels");

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

const staffAppointmentsController = async (req, res) => {
  try {
    const staff = await staffModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      staffId: staff._id,
    });
    res.status(200).send({
      success: true,
      message: "Staff Appointments fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Staff Appointments",
    });
  }
};

const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointments.userId });
    const notification = user.notification;
    notification.push({
      type: "status-updated",
      message: `your appointment has been updated ${status}`,
      onCLickPath: "/staff-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
};

module.exports = {
  getStaffInfoController,
  updateProfileController,
  getStaffByIdController,
  staffAppointmentsController,
  updateStatusController,
};
