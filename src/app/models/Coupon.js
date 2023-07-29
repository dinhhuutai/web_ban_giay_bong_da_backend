const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CouponSchema = new Schema({
    code: {type: String, unique: true},
    percentDiscount: {type: Number, default: 0},
    priceDiscount: {type: Number, default: 0},
    createBy: { type: Schema.Types.ObjectId, ref: "users" },
    updateBy: { type: Schema.Types.ObjectId, ref: "users" },
    createAt: { type: Date },
    updateAt: { type: Date },
});


module.exports = mongoose.model('coupons', CouponSchema);