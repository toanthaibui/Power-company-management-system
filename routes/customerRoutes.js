const express = require("express");
const {
  updatePasswordController,
  getCustomerInfoController,
  updateProfileCustomerController,
  getCustomerByIdController,
  getElectricCustomerUserController,
  priceMonthController,
} = require("../controllers/customerCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/update-password", authMiddleware, updatePasswordController);

//POST SINGLE Staff INFO
router.post("/getCustomerInfo", authMiddleware, getCustomerInfoController);

router.post("/getCustomerById", authMiddleware, getCustomerByIdController);

//POST UPDATE PROFILE
router.post(
  "/updateProfileCustomer",
  authMiddleware,
  updateProfileCustomerController
);

router.post(
  "/getElectricCustomerUser",
  authMiddleware,
  getElectricCustomerUserController
);

router.post("/price_month", authMiddleware, priceMonthController);

module.exports = router;
