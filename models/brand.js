const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shopSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
  },
  {
    toJSON: { virtuals: true },
    collection: "brands",
  }
);

shopSchema.virtual("model", {
  ref: "Model",
  localField: "_id",
  foreignField: "brand",
});

const brand = mongoose.model("Brand", shopSchema);

module.exports = brand;
