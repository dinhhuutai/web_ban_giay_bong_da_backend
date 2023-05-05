const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TrademarkSchema = new Schema({
    name: {type: String, required: true},
    code: {type: String, required: true, unique: true},
    img: {type: String},
    createBy: {type: String},
    updateBy: {type: String},
    createAt: {type: Date},
    updateAt: {type: Date},
});


module.exports = mongoose.model('trademarks', TrademarkSchema);