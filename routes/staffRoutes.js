const express = require("express");
const {
  getStaffInfoController,
  updateProfileController,
  getStaffByIdController,
  staffAppointmentsController,
  updateStatusController,
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

module.exports = router;
