const express = require("express");
const router = express.Router();

const productController = require("../../app/controllers/user/ProductController");

router.get("/", productController.show);

module.exports = router;
