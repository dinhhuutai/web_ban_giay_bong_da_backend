const express = require("express");
const router = express.Router();
const verifyToken = require('../../middlewares/auth');

const colorAdminController = require("../../app/controllers/admin/ColorAdminController");

router.get("/", verifyToken, colorAdminController.show);
router.post("/create", verifyToken, colorAdminController.create);
router.put("/:id", verifyToken, colorAdminController.update);
router.delete("/:id", verifyToken, colorAdminController.delete);

module.exports = router;