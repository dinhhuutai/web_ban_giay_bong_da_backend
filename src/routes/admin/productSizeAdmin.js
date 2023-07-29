const express = require("express");
const router = express.Router();
const verifyToken = require('../../middlewares/auth');

const ProductSizeAdminController = require("../../app/controllers/admin/ProductSizeAdminController");

router.get("/", verifyToken, ProductSizeAdminController.show);
router.get("/findProductBySize", verifyToken, ProductSizeAdminController.findProductBySize);
router.post("/create", verifyToken, ProductSizeAdminController.create);
router.put("/:id", verifyToken, ProductSizeAdminController.update);
router.delete("/:id", verifyToken, ProductSizeAdminController.delete);

router.put("/decrease/:id", verifyToken, ProductSizeAdminController.decrease);
router.put("/increase/:id", verifyToken, ProductSizeAdminController.increase);


module.exports = router;