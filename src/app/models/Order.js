const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const OrderSchema = new Schema({
    products: [{
        idProduct: {type: Schema.Types.ObjectId, ref: 'products'},
        quantity: {type: Number},
        idSize: {type: Schema.Types.ObjectId, ref: 'sizes'},
    }],
    status: {
        type: String,
        default: 'Waiting',
        enum: ['Waiting', 'Proccessing', 'Successed', "Cancelled"],
    },
    totalPriceProduct: {type: Number},
    totalPayment: {type: Number},
    orderBy: {type: Schema.Types.ObjectId, ref: 'users'},
    orderDate: {type: Date},
    successDate: {type: Date},
    idCoupon: {type: Schema.Types.ObjectId, ref: 'coupons'},
});


module.exports = mongoose.model('orders', OrderSchema);