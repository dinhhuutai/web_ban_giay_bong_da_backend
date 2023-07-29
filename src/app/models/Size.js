const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SizeSchema = new Schema({
    size: { type: mongoose.Decimal128, required: true },
    createBy: { type: Schema.Types.ObjectId, ref: "users" },
    updateBy: { type: Schema.Types.ObjectId, ref: "users" },
    createAt: { type: Date },
    updateAt: { type: Date },
});

module.exports = mongoose.model("sizes", SizeSchema);
