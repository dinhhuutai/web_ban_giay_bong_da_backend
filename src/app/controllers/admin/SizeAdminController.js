const Size = require("../../models/Size");

class SizeAdminController {
    // [GET] /api/admin/size
    async show(req, res, next) {
        try {
            const size = await Size.find();

            res.status(200).json({success: true, size});

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [POST] /api/admin/size/create
    async create(req, res, next) {
        res.render("api/admin/size/create");
    }

    // [PUT] /api/admin/size/:id
    async update(req, res, next) {
        res.render("api/admin/size/:id");
    }

    // [DELETE] /api/admin/size/:id
    async delete(req, res, next) {
        res.render("api/admin/size/:id");
    }
}

module.exports = new SizeAdminController();