const express = require("express");

const {
  loginController,
  registerController,
  authController,
  registerStaffController,
  applyStaffController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllStaffsController,
  applyCustomerController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//REGISTER_STAFF ||POST
router.post("/registerstaff", registerStaffController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController);

//Apply Staff || POST
router.post("/apply-staff", authMiddleware, applyStaffController);

//Apply Staff || POST
router.post("/apply-customer", authMiddleware, applyCustomerController);

//notification Apply Staff || POST
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);

//notification Apply Staff || POST
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

//GET ALL STAFF
router.get("/getAllStaffs", authMiddleware, getAllStaffsController);

module.exports = router;
