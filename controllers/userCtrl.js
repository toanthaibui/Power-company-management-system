const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const staffModel = require("../models/staffModels");
const appointmentModel = require("../models/appointmentModel");
const moment = require("moment");
const customerModel = require("../models/customerModel");

//register call back
const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "Email đã tồn tại", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Register Controller ${error.message}`,
      success: false,
    });
  }
};

//Register staff
const registerStaffController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "Email đã tồn tại", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    req.body.isStaff = true;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Register Controller ${error.message}`,
      success: false,
    });
  }
};

//login call back
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "Không tìm thấy Email", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({
        message: "Mật khẩu không chính xác",
        success: false,
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

//auth controler
const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

//apply Staff ctrl
const applyStaffController = async (req, res) => {
  try {
    const exisitingStaff = await staffModel.findOne({
      userId: req.body.userId,
    });
    if (exisitingStaff) {
      return res
        .status(200)
        .send({ message: "Bạn đã đăng ký thông tin", success: false });
    }
    const newStaff = await staffModel({ ...req.body, status: "approved" });
    await newStaff.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-staff-request",
      message: `${newStaff.fullName} đã nhập thông tin nhân viên`,
      data: {
        staffId: newStaff._id,
        name: newStaff.firstName + " " + newStaff.lastName,
        onClickPath: "/admin/staffs",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Thông tin nhân viên đã được cập nhật",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Xảy ra lỗi khi điền thông tin",
    });
  }
};

//apply Staff ctrl
const applyCustomerController = async (req, res) => {
  try {
    const exisitingCustomer = await customerModel.findOne({
      userId: req.body.userId,
    });
    if (exisitingCustomer) {
      return res
        .status(200)
        .send({ message: "Khách hàng đã dăng ký", success: false });
    }
    const newCustomer = await customerModel({ ...req.body, status: "0" });
    await newCustomer.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-customer-request",
      message: `${newCustomer.fullName} đã đăng ký lắp đặt điện`,
      data: {
        customerId: newCustomer._id,
        name: newCustomer.fullName,
        onClickPath: "/admin/customers",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Đăng ký lắp đặt điện thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Xảy ra lỗi khi điền thông tin đăng ký",
    });
  }
};

//notification apply staff ctr
const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push(...notification);
    user.notification = [];
    user.seennotification = notification;
    const updateUser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notification marker as read",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in notification",
      success: false,
      error,
    });
  }
};

//delete notification
const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seennotification = [];
    const updateUser = await user.save();
    updateUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notification Deleted Successfully",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to delete all notification",
      error,
    });
  }
};

//GET ALL DOC
const getAllStaffsController = async (req, res) => {
  try {
    const staffs = await staffModel.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "Staff lists fetched successfully",
      data: staffs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error white fetching staff",
    });
  }
};

//BOOK APPOINTMENT
const bookeAppointmentController = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    const user = await userModel.findOne({ _id: req.body.staffInfo.userId });
    user.notification.push({
      type: "New-appointment-request",
      message: `A new appointment Request from ${req.body.userInfo.name}`,
      onClickPath: "/user/appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Book successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while booking appointment",
    });
  }
};

// booking bookingAvailabilityController
const bookingAvailabilityController = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const staffId = req.body.staffId;
    const appointments = await appointmentModel.find({
      staffId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not Availibale at this time",
        success: true,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointments available",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Booking",
    });
  }
};

const userAppointmentsController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "Users Appointments Fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in user appointment",
    });
  }
};

module.exports = {
  loginController,
  registerController,
  authController,
  registerStaffController,
  applyStaffController,
  applyCustomerController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllStaffsController,
  bookeAppointmentController,
  bookingAvailabilityController,
  userAppointmentsController,
};
