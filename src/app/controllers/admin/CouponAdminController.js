const Coupon = require("../../models/Coupon");

class CouponAdminController {
    // [GET] /api/admin/coupon
    async show(req, res, next) {

        res.render("api/admin/coupon");
        
    }

    // [POST] /api/admin/coupon/create
    async create(req, res, next) {
        
        res.render("api/admin/coupon/create");
    }

    // [PUT] /api/admin/coupon/:id
    async update(req, res, next) {
        res.render("api/admin/coupon/:id");
    }

    // [DELETE] /api/admin/coupon/:id
    async delete(req, res, next) {
        res.render("api/admin/coupon/:id");
    }
}

module.exports = new CouponAdminController();