const express = require("express");
const router = express.Router();
const verifyToken = require('../../middlewares/auth');

const statisticalAdminController = require("../../app/controllers/admin/StatisticalAdminController");

router.get("/top10User", verifyToken, statisticalAdminController.top10User);
router.get("/top10Product", verifyToken, statisticalAdminController.top10Product);
router.get("/totalUser", verifyToken, statisticalAdminController.totalUser);
router.get("/totalProduct", verifyToken, statisticalAdminController.totalProduct);
router.get("/totalRevenue", verifyToken, statisticalAdminController.totalRevenue);
router.get("/totalOrder", verifyToken, statisticalAdminController.totalOrder);
router.get("/analytics", verifyToken, statisticalAdminController.analytics);

module.exports = router;