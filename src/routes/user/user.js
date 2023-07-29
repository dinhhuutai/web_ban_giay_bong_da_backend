const express = require("express");
const router = express.Router();
const verifyToken = require('../../middlewares/auth');

const userController = require("../../app/controllers/user/UserController");
const uploadCloud = require('../../middlewares/uploader');

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/", verifyToken, userController.checkUser);
router.put("/cart", verifyToken, userController.updateCart);
router.put("/deleteCart", verifyToken, userController.deleteCart);
router.put("/removeCart", verifyToken, userController.removeProductInCart);
router.post("/uploadimgOne", uploadCloud.single('image'), userController.uploadImgOne);
router.put("/update", verifyToken, userController.update);
router.put("/updateAddress", verifyToken, userController.updateAddress);

module.exports = router;
