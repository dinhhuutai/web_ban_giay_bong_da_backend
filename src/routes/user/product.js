const express = require("express");
const router = express.Router();

const productController = require("../../app/controllers/user/ProductController");

router.post("/", productController.show);
router.get("/:id", productController.get);
router.get("/relate/:id", productController.getRelate);
router.get("/updateView/:id", productController.updateView);

module.exports = router;
