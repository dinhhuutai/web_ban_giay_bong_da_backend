const express = require("express");
const router = express.Router();
const productAdminController = require("../../app/controllers/admin/ProductAdminController");
const verifyToken = require('../../middlewares/auth');
const uploadCloud = require('../../middlewares/uploader');

router.get("/", verifyToken, productAdminController.show);
router.post("/create", verifyToken, productAdminController.create);
router.put("/:id", verifyToken, productAdminController.update);
router.post("/delete", verifyToken, productAdminController.delete);

module.exports = router;