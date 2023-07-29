const Coupon = require("../../models/Coupon");

class CouponController {

    // [POST] /api/coupon/checkCoupon
    async checkCoupon(req, res, next) {
        const {
            code
        } = req.body;


        try {
            const response = await Coupon.findOne({code});
            
            response ? 
                res.status(200).json({success: true, coupon: response}) :
                res.status(200).json({success: false});
            
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

}

module.exports = new CouponController();
