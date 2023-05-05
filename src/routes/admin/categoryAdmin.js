const express = require("express");
const router = express.Router();
const verifyToken = require('../../middlewares/auth');

const categoryAdminController = require("../../app/controllers/admin/CategoryAdminController");

router.get("/", verifyToken, categoryAdminController.show);
router.post("/create", verifyToken, categoryAdminController.create);
router.put("/:id", verifyToken, categoryAdminController.update);
router.delete("/:id", verifyToken, categoryAdminController.delete);

module.exports = router;