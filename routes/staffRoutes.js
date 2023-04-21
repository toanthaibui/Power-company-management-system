const express = require("express");
const {
  getStaffInfoController,
  updateProfileController,
  getStaffByIdController,
  setElectricNoteController,
  getElectricCustomerController,
  getElectricInfoController,
} = require("../controllers/staffCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//POST SINGLE Staff INFO
router.post("/getStaffInfo", authMiddleware, getStaffInfoController);

//POST UPDATE PROFILE
router.post("/updateProfile", authMiddleware, updateProfileController);

//POST GET SINGLE DOC INFO
router.post("/getStaffById", authMiddleware, getStaffByIdController);

router.post("/setElectricNote", authMiddleware, setElectricNoteController);

router.post(
  "/getElectricCustomer",
  authMiddleware,
  getElectricCustomerController
);

router.post("/getElectricInfo", authMiddleware, getElectricInfoController);

module.exports = router;
