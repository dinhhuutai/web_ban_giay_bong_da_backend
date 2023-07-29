const express = require("express");
const router = express.Router();
const verifyToken = require("../../middlewares/auth");

const orderAdminController = require("../../app/controllers/admin/OrderAdminController");

router.get("/all", verifyToken, orderAdminController.all);
router.get("/waiting", verifyToken, orderAdminController.waiting);
router.get("/proccessing", verifyToken, orderAdminController.proccessing);
router.get("/successed", verifyToken, orderAdminController.successed);
router.get("/cancelled", verifyToken, orderAdminController.cancelled);
router.put("/updateStatus/:idOrder", verifyToken, orderAdminController.updateStatus);

module.exports = router;