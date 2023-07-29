const express = require("express");
const router = express.Router();
const verifyToken = require("../../middlewares/auth");

const couponAdminController = require("../../app/controllers/admin/CouponAdminController");

router.get("/", verifyToken, couponAdminController.show);
router.post("/create", verifyToken, couponAdminController.create);
router.put("/:id", verifyToken, couponAdminController.update);
router.delete("/:id", verifyToken, couponAdminController.delete);

module.exports = router;
