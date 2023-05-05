const express = require("express");
const router = express.Router();
const verifyToken = require('../../middlewares/auth');

const trademarkAdminController = require("../../app/controllers/admin/TrademarkAdminController");

router.get("/", verifyToken, trademarkAdminController.show);
router.post("/create", verifyToken, trademarkAdminController.create);
router.put("/:id", verifyToken, trademarkAdminController.update);
router.delete("/:id", verifyToken, trademarkAdminController.delete);

module.exports = router;