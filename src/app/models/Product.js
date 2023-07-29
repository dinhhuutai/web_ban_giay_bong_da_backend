const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    name: { type: String, required: true },
    price: {type: Number, required: true},
    idCategory: {type: Schema.Types.ObjectId, ref: 'categorys'},
    idTrademark: {type: Schema.Types.ObjectId, ref: 'trademarks'},
    idColor: {type: Schema.Types.ObjectId, ref: 'colors'},
    totalQuantity: {type: Number},
    image: {type: Array},
    isNew: {type: Boolean},
    discount: {type: String},
    description: {type: String},
    quantitySold: {type: Number},
    view: {type: Number, default: 0},
    createBy: {type: Schema.Types.ObjectId, ref: 'users'},
    updateBy: {type: Schema.Types.ObjectId, ref: 'users'},
    createAt: {type: Date},
    updateAt: {type: Date},
});


module.exports = mongoose.model('products', ProductSchema);