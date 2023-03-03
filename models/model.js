const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name:  { type: String, required: true, trim: true },
    price: { type: Number },
    color: { type: String, required: true, trim: true },
    brand: { type: Schema.Types.ObjectId, ref: "Brand" },
  },
  {
    collection: "models",
  }
);

const model = mongoose.model("Model", schema);

module.exports = model;
