const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSizeSchema = new Schema({
    idProduct: { type: Schema.Types.ObjectId, ref: "products" },
    idSize: { type: Schema.Types.ObjectId, ref: "sizes" },
    quantity: { type: Number, required: true },
    createBy: { type: Schema.Types.ObjectId, ref: "users" },
    updateBy: { type: Schema.Types.ObjectId, ref: "users" },
    createAt: { type: Date },
    updateAt: { type: Date },
});

module.exports = mongoose.model("productSizes", ProductSizeSchema);
