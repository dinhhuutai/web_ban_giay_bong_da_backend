const express = require("express");
const router = express.Router();
const verifyToken = require('../../middlewares/auth');

const orderController = require("../../app/controllers/user/OrderController");

router.get("/", verifyToken, orderController.show);
router.post("/create", verifyToken, orderController.create);
router.put("/:id", verifyToken, orderController.update);
router.delete("/:id", verifyToken, orderController.delete);

router.get('/getById/:id', verifyToken, orderController.getById);

router.get("/all", verifyToken, orderController.all);
router.get("/waiting", verifyToken, orderController.waiting);
router.get("/proccessing", verifyToken, orderController.proccessing);
router.get("/successed", verifyToken, orderController.successed);
router.get("/cancelled", verifyToken, orderController.cancelled);

router.put("/updateStatus/:idOrder", verifyToken, orderController.updateStatus);

module.exports = router;