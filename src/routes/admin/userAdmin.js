const express = require("express");
const router = express.Router();

const userAdminController = require("../../app/controllers/admin/UserAdminController");

const uploadCloud = require('../../middlewares/uploader');

router.get("/", userAdminController.show);
router.post("/create", userAdminController.create);
router.post("/uploadimg", 
    uploadCloud.fields([{ name: 'image', maxCount: 1 }, 
                        { name: 'thumbnail1', maxCount: 1 },
                        { name: 'thumbnail2', maxCount: 1 },
                        { name: 'thumbnail3', maxCount: 1 },
                    ]), 
    userAdminController.uploadImg);
router.put("/:id", userAdminController.update);
router.delete("/:id", userAdminController.delete);

module.exports = router;