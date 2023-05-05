const express = require("express");
const router = express.Router();
const verifyToken = require('../../middlewares/auth');

const userController = require("../../app/controllers/user/UserController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/", verifyToken, userController.checkUser);

module.exports = router;
