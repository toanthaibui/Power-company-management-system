const staffModel = require("../models/staffModels");
const userModel = require("../models/userModels");
const customerModel = require("../models/customerModel");
const priceModel = require("../models/priceModel");
const scheduleModel = require("../models/scheduleModel");
const electricModel = require("../models/electricModel");

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({}).sort({ createdAt: -1 });
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
    const staffs = await staffModel.find({}).sort({ createdAt: -1 });
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
    const schedules = await scheduleModel
      .find({ staffId: staff._id })
      .sort({ createdAt: -1 });
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

const getScheduleAdminController = async (req, res) => {
  try {
    const schedules = await scheduleModel.find({ staffId: req.body.staffId });
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
    const schedules = await scheduleModel.find({
      staffId: staff._id,
      begin: { $lte: new Date().toISOString() },
      end: { $gte: new Date().toISOString() },
    });
    const customer = await customerModel.find({
      district: schedules.map(function (e) {
        return e.district;
      }),
    });
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
    const customers = await customerModel.find({}).sort({ createdAt: -1 });
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

const getAllBillsController = async (req, res) => {
  try {
    const bills = await electricModel.find({}).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "users data list",
      data: bills,
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

const getBillByDetailController = async (req, res) => {
  try {
    const bill = await electricModel.findOne({
      _id: req.body.billId,
    });
    const staff = await staffModel.findOne({ _id: bill.staffId });
    const customer = await customerModel.findOne({ _id: bill.customerId });
    res.status(200).send({
      success: true,
      message: "Single staff info fetched",
      bill: bill,
      customer: customer,
      staff: staff,
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

const deteleBillController = async (req, res) => {
  try {
    await electricModel.deleteOne({ _id: req.body.billId });
    res.status(201).send({
      success: true,
      message: "Đã xóa hóa đơn thành công",
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

const billStatusController = async (req, res) => {
  try {
    await electricModel.findOneAndUpdate(
      { _id: req.body.billId },
      { status: "1" }
    );
    res.status(201).send({
      success: true,
      message: "Đã xóa hóa đơn thành công",
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

const SearchStaffController = async (req, res) => {
  try {
    const staff =
      req.body.field === "fullName"
        ? await staffModel.find({ fullName: req.body.keyword })
        : req.body.field === "phone"
        ? await staffModel.find({ phone: req.body.keyword })
        : req.body.field === "email"
        ? await staffModel.find({ email: req.body.keyword })
        : req.body.field === "cccd"
        ? await staffModel.find({ cccd: req.body.keyword })
        : req.body.field === "address"
        ? await staffModel.find({ address: req.body.keyword })
        : req.body.field === "level"
        ? await staffModel.find({ level: req.body.keyword })
        : req.body.field === "specialization"
        ? await staffModel.find({ specialization: req.body.keyword })
        : await staffModel.find({});
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

const SearchUserController = async (req, res) => {
  try {
    const user =
      req.body.field === "name"
        ? await userModel.find({ name: req.body.keyword })
        : req.body.field === "email"
        ? await userModel.find({ email: req.body.keyword })
        : req.body.field === "isStaff"
        ? await userModel.find({ isStaff: req.body.keyword })
        : await userModel.find({});
    res.status(200).send({
      success: true,
      message: "Single staff info fetched",
      data: user,
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

const SearchCustomerController = async (req, res) => {
  try {
    const customer =
      req.body.field === "fullName"
        ? await customerModel.find({ fullName: req.body.keyword })
        : req.body.field === "email"
        ? await customerModel.find({ email: req.body.keyword })
        : req.body.field === "phone"
        ? await customerModel.find({ phone: req.body.keyword })
        : req.body.field === "cccd"
        ? await customerModel.find({ cccd: req.body.keyword })
        : req.body.field === "ward"
        ? await customerModel.find({ ward: req.body.keyword })
        : req.body.field === "district"
        ? await customerModel.find({ district: req.body.keyword })
        : req.body.field === "purpose"
        ? await customerModel.find({ purpose: req.body.keyword })
        : req.body.field === "status"
        ? await customerModel.find({ status: req.body.keyword })
        : await customerModel.find({});
    res.status(200).send({
      success: true,
      message: "Single staff info fetched",
      data: customer,
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

const SearchBillController = async (req, res) => {
  try {
    const electric =
      req.body.field === "district"
        ? await electricModel.find({ district: req.body.keyword })
        : req.body.field === "price"
        ? await electricModel.find({ price: req.body.keyword })
        : req.body.field === "score"
        ? await electricModel.find({ score: req.body.keyword })
        : req.body.field === "date"
        ? await electricModel.find({ date: req.body.keyword })
        : req.body.field === "status"
        ? await electricModel.find({ status: req.body.keyword })
        : await electricModel.find({});
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

const totalController = async (req, res) => {
  try {
    const customer = await customerModel.find({}).count();
    const user = await userModel.find({}).count();
    const staff = await staffModel.find({}).count();
    const bill = await electricModel.find({}).count();

    const price = await electricModel.aggregate([
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
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
    const price_area = await electricModel.aggregate([
      {
        $group: {
          _id: { district: "$district" },
          totalAmount: { $sum: "$price" },
          count: { $sum: 1 },
        },
      },
    ]);

    const sum = await electricModel.aggregate([
      {
        $group: {
          _id: {},
          totalAmount: { $sum: "$price" },
          count: { $sum: 1 },
        },
      },
    ]);

    const monthnew = await electricModel.aggregate([
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
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
        $limit: 1,
      },
    ]);

    const customer_donut = await customerModel.aggregate([
      {
        $group: {
          _id: { district: "$district" },
          count: { $sum: 1 },
        },
      },
    ]);
    const customer_donut_purpose = await customerModel.aggregate([
      {
        $group: {
          _id: { purpose: "$purpose" },
          count: { $sum: 1 },
        },
      },
    ]);
    const customer_donut_status = await customerModel.aggregate([
      {
        $group: {
          _id: { status: "$status" },
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).send({
      success: true,
      message: "users data list",
      customer: customer,
      user,
      staff,
      bill,
      price,
      sum,
      monthnew,
      customer_donut,
      customer_donut_purpose,
      customer_donut_status,
      price_area,
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
  getScheduleAdminController,
  getAllBillsController,
  getBillByDetailController,
  deteleBillController,
  SearchStaffController,
  SearchUserController,
  SearchCustomerController,
  SearchBillController,
  totalController,
  billStatusController,
};
