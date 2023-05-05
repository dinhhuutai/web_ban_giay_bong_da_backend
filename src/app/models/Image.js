const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ImageSchema = new Schema({
    idProduct: {type: Schema.Types.ObjectId, ref: 'products'},
    link: {type: String, required: true},
    isMain: {type: Boolean},
    createBy: {type: String},
    updateBy: {type: String},
    createAt: {type: Date},
    updateAt: {type: Date},
});


module.exports = mongoose.model('images', ImageSchema);