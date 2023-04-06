const express = require("express");
const {
  updatePasswordController,
  getCustomerInfoController,
  updateProfileCustomerController,
} = require("../controllers/customerCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/update-password", authMiddleware, updatePasswordController);

//POST SINGLE Staff INFO
router.post("/getCustomerInfo", authMiddleware, getCustomerInfoController);

//POST UPDATE PROFILE
router.post(
  "/updateProfileCustomer",
  authMiddleware,
  updateProfileCustomerController
);

module.exports = router;
