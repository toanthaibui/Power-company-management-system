const staffModel = require("../models/staffModels");
const userModel = require("../models/userModels");
const customerModel = require("../models/customerModel");
const priceModel = require("../models/priceModel");
const scheduleModel = require("../models/scheduleModel");

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "users data list",
      data: users,
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

const getAllPricesController = async (req, res) => {
  try {
    const prices = await priceModel.find({});
    res.status(200).send({
      success: true,
      message: "users data list",
      data: prices,
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

const getAllStaffsController = async (req, res) => {
  try {
    const staffs = await staffModel.find({});
    res.status(200).send({
      success: true,
      message: "Staffs data list",
      data: staffs,
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
const getAllSchedulesController = async (req, res) => {
  try {
    const schedules = await scheduleModel.find({});
    res.status(200).send({
      success: true,
      message: "Staffs data list",
      data: schedules,
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
const getSchedulesStaffController = async (req, res) => {
  try {
    const staff = await staffModel.findOne({ userId: req.body.userId });
    const schedules = await scheduleModel.find({ staffId: staff._id });
    res.status(200).send({
      success: true,
      message: "Staffs data list",
      data: schedules,
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

const getCustomerElectricNoteController = async (req, res) => {
  try {
    const date = new Date();
    const day = date.toISOString();
    const staff = await staffModel.findOne({ userId: req.body.userId });
    const schedules = await scheduleModel.findOne({
      staffId: staff._id,
      begin: { $lte: new Date(day) },
      end: { $gte: new Date(day) },
    });
    const customer = await customerModel.find({ district: schedules.district });
    res.status(200).send({
      success: true,
      message: "Staffs data list",
      data: customer,
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

const getAllCustomersController = async (req, res) => {
  try {
    const customers = await customerModel.find({});
    res.status(200).send({
      success: true,
      message: "Dữ liệu danh sách khách hàng",
      data: customers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Xảy ra lỗi khi nạp dữ liệu khách hàng",
      error,
    });
  }
};

//account status
const changeAccountStatusController = async (req, res) => {
  try {
    const { staffId, status } = req.body;
    const staff = await staffModel.findByIdAndUpdate(staffId, { status });
    const user = await userModel.findOne({ _id: staff.userId });
    const notification = user.notification;
    const comment = "Thông tin nhân viên của bạn đã bị xóa bởi người quản lý";
    notification.push({
      type: "Cập nhật dữ liệu nhân viên",
      message: `${comment}`,
      onClickPath: "/notification",
    });
    await user.save();
    await staffModel.deleteOne({ _id: staffId });
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: staff,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Acount Status",
      error,
    });
  }
};

const changeAccountStatusCustomerController = async (req, res) => {
  try {
    const { customerId, status } = req.body;
    const customer = await customerModel.findByIdAndUpdate(customerId, {
      status,
    });
    const user = await userModel.findOne({ _id: customer.userId });
    const notification = user.notification;
    const comment =
      status === "1"
        ? "Yêu cầu đăng ký của bạn đã được chấp nhận nhân viên của chúng tôi sẽ liên lạc với bạn để tiến hành lắp đặt."
        : "Yêu cầu đăng ký của bạn đã bị từ chối vui lòng kiểm tra lại thông tin đăng ký";
    notification.push({
      type: "Cập nhật dữ liệu khách hàng",
      message: `${comment}`,
      onClickPath: "/notification",
    });
    await user.save();
    if (status === "2") {
      await customerModel.deleteOne({ _id: customerId });
    }
    res.status(201).send({
      success: true,
      message: "Trạng thái đăng ký của khách hàng đã được cập nhật",
      data: customer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Xảy ra lỗi khi cập nhật trạng thái",
      error,
    });
  }
};

const postPurposeController = async (req, res) => {
  try {
    const exisitingPrice = await priceModel.findOne({
      name: req.body.name,
    });
    if (exisitingPrice) {
      return res.status(200).send({ message: "Dịch vụ đã có", success: false });
    }
    const newPrice = await priceModel({ ...req.body });
    await newPrice.save();
    res.status(201).send({
      success: true,
      message: "Dịch đã được thêm vào danh sách",
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

const updatePriceController = async (req, res) => {
  try {
    const price = await priceModel.findOneAndUpdate(
      { name: req.body.name },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Cập nhật giá dịch vụ thành công",
      data: price,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Đã có lỗi khi cập nhật giá dịch vụ",
      error,
    });
  }
};

const changePriceStatusController = async (req, res) => {
  try {
    await priceModel.deleteOne({ _id: req.body.priceId });
    res.status(201).send({
      success: true,
      message: "Đã xóa dịch vụ thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Acount Status",
      error,
    });
  }
};

const changeAcountStatusUserController = async (req, res) => {
  try {
    await userModel.deleteOne({ email: req.body.email });
    res.status(201).send({
      success: true,
      message: "Đã xóa dịch vụ thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Acount Status",
      error,
    });
  }
};
const deteleScheduleController = async (req, res) => {
  try {
    await scheduleModel.deleteOne({ _id: req.body._id });
    res.status(201).send({
      success: true,
      message: "Đã xóa dịch vụ thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Acount Status",
      error,
    });
  }
};

const setScheduleController = async (req, res) => {
  try {
    const newSchedule = await scheduleModel({ ...req.body });
    await newSchedule.save();
    res.status(201).send({
      success: true,
      message: "Đã thêm lịch làm việc",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Xảy ra lỗi trong khi thêm lịch làm việc",
    });
  }
};

const updateScheduleController = async (req, res) => {
  try {
    const schedule = await scheduleModel.findOneAndUpdate(
      { _id: req.body._id },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Staff Profile Updated",
      data: schedule,
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

module.exports = {
  getAllUsersController,
  getAllStaffsController,
  changeAccountStatusController,
  getAllCustomersController,
  changeAccountStatusCustomerController,
  postPurposeController,
  getAllPricesController,
  updatePriceController,
  changePriceStatusController,
  changeAcountStatusUserController,
  setScheduleController,
  getAllSchedulesController,
  updateScheduleController,
  deteleScheduleController,
  getSchedulesStaffController,
  getCustomerElectricNoteController,
};
