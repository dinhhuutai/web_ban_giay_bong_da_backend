const express = require("express");
const router = express.Router();
const verifyToken = require('../../middlewares/auth');

const couponController = require("../../app/controllers/user/CouponController");

router.post("/checkCoupon", verifyToken, couponController.checkCoupon);

module.exports = router;