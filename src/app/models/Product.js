const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    name: { type: String, required: true },
    price: {type: String, required: true},
    size: {type: String, required: true},
    idCategory: {type: Schema.Types.ObjectId, ref: 'categorys'},
    idTrademark: {type: Schema.Types.ObjectId, ref: 'trademarks'},
    idColor: {type: Schema.Types.ObjectId, ref: 'colors'},
    image: {type: Array},
    quantity: {type: Number},
    isNew: {type: Boolean},
    discount: {type: String},
    description: {type: String},
    createBy: {type: Schema.Types.ObjectId, ref: 'users'},
    updateBy: {type: Schema.Types.ObjectId, ref: 'users'},
    createAt: {type: Date},
    updateAt: {type: Date},
});


module.exports = mongoose.model('products', ProductSchema);