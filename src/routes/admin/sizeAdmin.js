const express = require("express");
const router = express.Router();
const verifyToken = require('../../middlewares/auth');

const SizeAdminController = require("../../app/controllers/admin/SizeAdminController");

router.get("/", verifyToken, SizeAdminController.show);
router.post("/create", verifyToken, SizeAdminController.create);
router.put("/:id", verifyToken, SizeAdminController.update);
router.delete("/:id", verifyToken, SizeAdminController.delete);

module.exports = router;