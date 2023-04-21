const express = require("express");
const {
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
  totalController,
  billStatusController,
} = require("../controllers/adminCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//GET METHOD || USERS
router.get("/getAllUsers", authMiddleware, getAllUsersController);

//GET METHOD || STAFFS
router.get("/getAllStaffs", authMiddleware, getAllStaffsController);

//GET METHOD || CUSTOMERS
router.get("/getAllCustomers", authMiddleware, getAllCustomersController);

//POST ACCOUNT STATUS
router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);

router.post(
  "/changeAccountStatusCustomer",
  authMiddleware,
  changeAccountStatusCustomerController
);

router.post("/postPurpose", authMiddleware, postPurposeController);

router.get("/getAllPrices", authMiddleware, getAllPricesController);

router.post("/updatePrice", authMiddleware, updatePriceController);

router.post("/changePriceStatus", authMiddleware, changePriceStatusController);

router.post(
  "/changeAccountStatusUser",
  authMiddleware,
  changeAcountStatusUserController
);

router.post("/set-schedule", authMiddleware, setScheduleController);

router.get("/getAllSchedules", authMiddleware, getAllSchedulesController);
router.post("/updateSchedule", authMiddleware, updateScheduleController);
router.post("/deteleSchedule", authMiddleware, deteleScheduleController);
router.post("/getSchedulesStaff", authMiddleware, getSchedulesStaffController);
router.post("/getScheduleAdmin", authMiddleware, getScheduleAdminController);
router.post(
  "/getCustomerElectricNote",
  authMiddleware,
  getCustomerElectricNoteController
);

router.get("/getAllBills", authMiddleware, getAllBillsController); //

router.post("/getBillByDetail", authMiddleware, getBillByDetailController); //

router.post("/deleteBill", authMiddleware, deteleBillController); //

router.post("/billStatus", authMiddleware, billStatusController); //

router.post("/search-staff", authMiddleware, SearchStaffController);

router.post("/search-user", authMiddleware, SearchUserController);

router.post("/search-customer", authMiddleware, SearchCustomerController);

router.get("/total", authMiddleware, totalController);

module.exports = router;
