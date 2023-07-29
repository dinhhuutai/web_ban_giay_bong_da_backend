const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, require: true},
    phone: {type: String, required: true},
    email: {type: String},
    address: {type: String, required: true},
    sex: {type: String},
    birth: {type: Date},
    avatar: {type: Array},
    cart: [{
        idProduct: {type: Schema.Types.ObjectId, ref: 'products'},
        quantity: {type: Number},
        idSize: {type: Schema.Types.ObjectId, ref: 'sizes'},
    }],
    createBy: {type: String},
    updateBy: {type: String},
    createAt: {type: Date},
    updateAt: {type: Date},
    spend: {type: Number, default: 0},
});


module.exports = mongoose.model('users', UserSchema);