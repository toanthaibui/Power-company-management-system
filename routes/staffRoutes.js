const express = require("express");
const {
  getStaffInfoController,
  updateProfileController,
  getStaffByIdController,
  staffAppointmentsController,
  updateStatusController,
  setElectricNoteController,
  getElectricCustomerController,
  setBillController,
} = require("../controllers/staffCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//POST SINGLE Staff INFO
router.post("/getStaffInfo", authMiddleware, getStaffInfoController);

//POST UPDATE PROFILE
router.post("/updateProfile", authMiddleware, updateProfileController);

//POST GET SINGLE DOC INFO
router.post("/getStaffById", authMiddleware, getStaffByIdController);

//Get appointments
router.get("/staff-appointments", authMiddleware, staffAppointmentsController);

//Post update status
router.post("/update-status", authMiddleware, updateStatusController);

router.post("/setElectricNote", authMiddleware, setElectricNoteController);

router.post(
  "/getElectricCustomer",
  authMiddleware,
  getElectricCustomerController
);

router.post("/setBill", authMiddleware, setBillController);

module.exports = router;
