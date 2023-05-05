
const User = require("../../models/User");

class UserAdminController {
    // [GET] /api/admin/user
    async show(req, res, next) {
        res.send("api/admin/user");
    }

    // [POST] /api/admin/user/uploadimg
    async uploadImg(req, res, nex) {

        try {

            res.status(200).json({success: true, link: req.files});

        } catch (error) {
            
            res.status(500).json({success: false});
        }
    }

    // [POST] /api/admin/user/create
    async create(req, res, next) {
        res.send("api/admin/user/create");
    }

    // [PUT] /api/admin/user/:id
    async update(req, res, next) {
        res.render("api/admin/user/:id");
    }

    // [DELETE] /api/admin/user/:id
    async delete(req, res, next) {
        res.render("api/admin/user/:id");
    }
}

module.exports = new UserAdminController();
